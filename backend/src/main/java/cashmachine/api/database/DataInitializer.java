package cashmachine.api.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import cashmachine.api.model.NoteSlot;
import cashmachine.api.repository.NoteSlotRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private NoteSlotRepository noteSlotRepository;

    @Override
    public void run(String... args) throws Exception {
        
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

