package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cashmachine.api.model.NoteSlot;

public interface NoteSlotRepository extends JpaRepository<NoteSlot, Integer> { }
