package com.lms.gymbackend.repository;

import com.lms.gymbackend.entity.WorkoutSchedule;
import com.lms.gymbackend.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutScheduleRepository extends JpaRepository<WorkoutSchedule, Long> {
    List<WorkoutSchedule> findByLevel(Level level);
}
