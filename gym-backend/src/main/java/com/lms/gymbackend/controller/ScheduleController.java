package com.lms.gymbackend.controller;

import com.lms.gymbackend.entity.WorkoutSchedule;
import com.lms.gymbackend.model.Level;
import com.lms.gymbackend.repository.WorkoutScheduleRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final WorkoutScheduleRepository repository;

    public ScheduleController(WorkoutScheduleRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<WorkoutSchedule> all(@RequestParam(required = false) Level level) {
        if (level == null) return repository.findAll();
        return repository.findByLevel(level);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WorkoutSchedule> create(@Valid @RequestBody WorkoutSchedule schedule) {
        WorkoutSchedule saved = repository.save(schedule);
        return ResponseEntity.created(URI.create("/api/schedules/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WorkoutSchedule> update(@PathVariable Long id, @Valid @RequestBody WorkoutSchedule schedule) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setLevel(schedule.getLevel());
                    existing.setTitle(schedule.getTitle());
                    existing.setDescription(schedule.getDescription());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElseGet(() -> {
                    schedule.setId(id);
                    WorkoutSchedule saved = repository.save(schedule);
                    return ResponseEntity.created(URI.create("/api/schedules/" + saved.getId())).body(saved);
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
