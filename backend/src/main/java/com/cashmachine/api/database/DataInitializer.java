package com.cashmachine.api.database;

import com.cashmachine.api.model.AccountType;
import com.cashmachine.api.model.AccountLevel;
import com.cashmachine.api.model.NoteSlot;
import com.cashmachine.api.repository.AccountTypeRepository;
import com.cashmachine.api.repository.AccountLevelRepository;
import com.cashmachine.api.repository.NoteSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AccountTypeRepository accountTypeRepository;

    @Autowired
    private AccountLevelRepository accountLevelRepository;

    @Autowired
    private NoteSlotRepository noteSlotRepository;

    @Override
    public void run(String... args) throws Exception {
        // Inserir tipos de conta
        if (accountTypeRepository.count() == 0) {
            accountTypeRepository.save(new AccountType("Poupança"));
            accountTypeRepository.save(new AccountType("Corrente"));
        }

        // Inserir níveis de conta
        if (accountLevelRepository.count() == 0) {
            accountLevelRepository.save(new AccountLevel("Prata"));
            accountLevelRepository.save(new AccountLevel("Bronze"));
            accountLevelRepository.save(new AccountLevel("Ouro"));
        }

        // Inserir slots de notas
        if (noteSlotRepository.count() == 0) {
            noteSlotRepository.save(new NoteSlot(2, 10));
            noteSlotRepository.save(new NoteSlot(5, 10));
            noteSlotRepository.save(new NoteSlot(10, 10));
            noteSlotRepository.save(new NoteSlot(20, 10));
            noteSlotRepository.save(new NoteSlot(50, 10));
            noteSlotRepository.save(new NoteSlot(100, 10));
            noteSlotRepository.save(new NoteSlot(200, 10));
        }
    }
}
