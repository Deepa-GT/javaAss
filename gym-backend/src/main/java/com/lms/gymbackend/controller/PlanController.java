package com.lms.gymbackend.controller;

import com.lms.gymbackend.entity.MembershipPlan;
import com.lms.gymbackend.repository.MembershipPlanRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
public class PlanController {
    private final MembershipPlanRepository repository;

    public PlanController(MembershipPlanRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MembershipPlan> all() {
        return repository.findAll();
    }

    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Test endpoint works!");
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembershipPlan> create(@RequestBody MembershipPlan plan) {
        MembershipPlan saved = repository.save(plan);
        return ResponseEntity.created(URI.create("/api/plans/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembershipPlan> update(@PathVariable Long id, @RequestBody MembershipPlan plan) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(plan.getName());
                    existing.setDuration(plan.getDuration());
                    existing.setPrice(plan.getPrice());
                    existing.setFeatures(plan.getFeatures());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElseGet(() -> {
                    plan.setId(id);
                    MembershipPlan saved = repository.save(plan);
                    return ResponseEntity.created(URI.create("/api/plans/" + saved.getId())).body(saved);
                });
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
