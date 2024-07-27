package com.cashmachine.api.repository;

import com.cashmachine.api.model.NoteSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteSlotRepository extends JpaRepository<NoteSlot, Integer> { }
