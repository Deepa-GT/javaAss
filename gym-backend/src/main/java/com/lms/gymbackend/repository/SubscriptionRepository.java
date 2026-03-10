package com.lms.gymbackend.repository;

import com.lms.gymbackend.entity.Subscription;
import com.lms.gymbackend.entity.User;
import com.lms.gymbackend.model.MembershipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser(User user);
    Optional<Subscription> findTopByUserOrderByEndDateDesc(User user);
    long countByStatus(MembershipStatus status);
}
