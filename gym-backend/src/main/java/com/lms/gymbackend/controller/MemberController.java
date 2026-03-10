package com.lms.gymbackend.controller;

import com.lms.gymbackend.entity.MembershipPlan;
import com.lms.gymbackend.entity.Subscription;
import com.lms.gymbackend.entity.Trainer;
import com.lms.gymbackend.entity.User;
import com.lms.gymbackend.model.MembershipStatus;
import com.lms.gymbackend.repository.MembershipPlanRepository;
import com.lms.gymbackend.repository.SubscriptionRepository;
import com.lms.gymbackend.repository.TrainerRepository;
import com.lms.gymbackend.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MemberController {
    private final UserRepository userRepository;
    private final MembershipPlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final TrainerRepository trainerRepository;

    public MemberController(UserRepository userRepository,
                            MembershipPlanRepository planRepository,
                            SubscriptionRepository subscriptionRepository,
                            TrainerRepository trainerRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.trainerRepository = trainerRepository;
    }

    @GetMapping("/members")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> members() {
        return userRepository.findAll();
    }

    public static class AssignRequest {
        @NotNull
        public Long planId;
        public Long trainerId;
        public LocalDate startDate;
        public LocalDate endDate;
    }

    @PostMapping("/members/{userId}/subscriptions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assign(@PathVariable Long userId, @Valid @RequestBody AssignRequest req) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        MembershipPlan plan = planRepository.findById(req.planId).orElse(null);
        if (plan == null) return ResponseEntity.badRequest().body(Map.of("error", "plan_not_found"));
        Trainer trainer = null;
        if (req.trainerId != null) {
            trainer = trainerRepository.findById(req.trainerId).orElse(null);
        }
        Subscription s = new Subscription();
        s.setUser(user);
        s.setPlan(plan);
        s.setTrainer(trainer);
        s.setStartDate(req.startDate != null ? req.startDate : LocalDate.now());
        s.setEndDate(req.endDate);
        s.setStatus(MembershipStatus.ACTIVE);
        Subscription saved = subscriptionRepository.save(s);
        return ResponseEntity.created(URI.create("/api/subscriptions/" + saved.getId())).body(saved);
    }

    public static class StatusRequest {
        @NotNull
        public MembershipStatus status;
    }

    @PatchMapping("/subscriptions/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @Valid @RequestBody StatusRequest req) {
        return subscriptionRepository.findById(id)
                .map(s -> {
                    s.setStatus(req.status);
                    return ResponseEntity.ok(subscriptionRepository.save(s));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/members/{userId}/subscriptions")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Subscription> listByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return subscriptionRepository.findByUser(user);
    }

    @GetMapping("/me/subscription")
    public ResponseEntity<?> mySubscription(Authentication authentication) {
        if (authentication == null) return ResponseEntity.ok(Map.of("active", false));
        User user = userRepository.findByUsername(authentication.getName()).orElse(null);
        if (user == null) return ResponseEntity.ok(Map.of("active", false));
        return subscriptionRepository.findTopByUserOrderByEndDateDesc(user)
                .map(s -> ResponseEntity.ok(Map.of(
                        "plan", s.getPlan().getName(),
                        "status", s.getStatus(),
                        "startDate", s.getStartDate(),
                        "endDate", s.getEndDate()
                )))
                .orElse(ResponseEntity.ok(Map.of("active", false)));
    }
}
