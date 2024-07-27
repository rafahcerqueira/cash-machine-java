package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cashmachine.api.model.NoteSlot;

@Repository
public interface NoteSlotRepository extends JpaRepository<NoteSlot, Integer> { }
