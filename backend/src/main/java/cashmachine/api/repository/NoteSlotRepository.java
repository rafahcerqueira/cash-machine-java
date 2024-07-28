package cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cashmachine.api.model.NoteSlot;


public interface NoteSlotRepository extends JpaRepository<NoteSlot,Long> { }
