package com.lms.gymbackend.controller;

import com.lms.gymbackend.entity.Trainer;
import com.lms.gymbackend.repository.TrainerRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {
    private final TrainerRepository repository;

    public TrainerController(TrainerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Trainer> all() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Trainer> create(@Valid @RequestBody Trainer trainer) {
        Trainer saved = repository.save(trainer);
        return ResponseEntity.created(URI.create("/api/trainers/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Trainer> update(@PathVariable Long id, @Valid @RequestBody Trainer trainer) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(trainer.getName());
                    existing.setExpertise(trainer.getExpertise());
                    existing.setPhone(trainer.getPhone());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElseGet(() -> {
                    trainer.setId(id);
                    Trainer saved = repository.save(trainer);
                    return ResponseEntity.created(URI.create("/api/trainers/" + saved.getId())).body(saved);
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
