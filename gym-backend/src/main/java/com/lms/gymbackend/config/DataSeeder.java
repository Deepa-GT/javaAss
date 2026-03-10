package com.lms.gymbackend.config;

import com.lms.gymbackend.entity.MembershipPlan;
import com.lms.gymbackend.entity.User;
import com.lms.gymbackend.entity.WorkoutSchedule;
import com.lms.gymbackend.model.Duration;
import com.lms.gymbackend.model.Level;
import com.lms.gymbackend.model.Role;
import com.lms.gymbackend.repository.MembershipPlanRepository;
import com.lms.gymbackend.repository.UserRepository;
import com.lms.gymbackend.repository.WorkoutScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(UserRepository users,
                           MembershipPlanRepository plans,
                           WorkoutScheduleRepository schedules,
                           PasswordEncoder encoder) {
        return args -> {
            if (users.count() == 0) {
                User admin = new User();
                admin.setUsername("admin_db");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setEmail("admin@example.com");
                admin.setFullName("Admin");
                users.save(admin);
            }
            if (plans.count() == 0) {
                MembershipPlan m1 = new MembershipPlan();
                m1.setName("Basic");
                m1.setDuration(Duration.MONTHLY);
                m1.setPrice(new BigDecimal("999.00"));
                m1.setFeatures("Workout access");
                plans.save(m1);

                MembershipPlan m2 = new MembershipPlan();
                m2.setName("Pro");
                m2.setDuration(Duration.QUARTERLY);
                m2.setPrice(new BigDecimal("2499.00"));
                m2.setFeatures("Workout, Diet");
                plans.save(m2);
            }
            if (schedules.count() == 0) {
                WorkoutSchedule s1 = new WorkoutSchedule();
                s1.setLevel(Level.BEGINNER);
                s1.setTitle("Full Body Starter");
                s1.setDescription("3 days per week");
                schedules.save(s1);
                WorkoutSchedule s2 = new WorkoutSchedule();
                s2.setLevel(Level.INTERMEDIATE);
                s2.setTitle("Push Pull Legs");
                s2.setDescription("6 days per week");
                schedules.save(s2);
            }
        };
    }
}
