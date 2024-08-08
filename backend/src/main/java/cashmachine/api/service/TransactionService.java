package cashmachine.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import cashmachine.api.model.Account;
import cashmachine.api.model.Transaction;
import cashmachine.api.model.User;
import cashmachine.api.observer.Subject;
import cashmachine.api.observer.WithdrawEvent;
import cashmachine.api.observer.DepositEvent;
import cashmachine.api.observer.TransferEvent;
import cashmachine.api.model.NoteSlot;
import cashmachine.api.repository.AccountRepository;
import cashmachine.api.repository.TransactionRepository;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.repository.NoteSlotRepository;
import cashmachine.api.adapter.DollarToRealAdapter;
import cashmachine.api.adapter.IMoneyConverter;
import cashmachine.api.exception.MyRuntimeException;

@Service
@AllArgsConstructor
public class TransactionService extends Subject {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final NoteSlotRepository noteSlotRepository;
    private final IMoneyConverter moneyConverter = new DollarToRealAdapter();

    @Transactional
    public void deposit(Long userId, BigDecimal amount, Map<Integer, Integer> requestedNotes, boolean isDollar) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new MyRuntimeException("User not found"));

        Account account = user.getAccount();

        if (isDollar) {
            amount = BigDecimal.valueOf(moneyConverter.convert(amount.doubleValue()));
        }

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        // Registrar a transação de depósito
        Transaction transaction = new Transaction(userId, "DEPOSIT", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        // Atualizar os slots de notas
        updateNoteSlotsForDeposit(requestedNotes);

        // Notificar observadores
        notifyObservers(new DepositEvent(userId, amount, requestedNotes));
    }

    @Transactional
    public void withdraw(Long userId, BigDecimal amount, Map<Integer, Integer> requestedNotes) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new MyRuntimeException("User not found"));

        Account account = user.getAccount();


        if (account.getBalance().compareTo(amount) < 0) {
            throw new MyRuntimeException("Saldo insuficiente!");
        }

        // Verificar disponibilidade de notas
        try {
            canDispenseAmount(amount, requestedNotes);
        } catch (MyRuntimeException e) {
            List<NoteSlot> availableNotes = noteSlotRepository.findAll();
            StringBuilder availableNotesMessage = new StringBuilder("\nNotas disponíveis:\n");
            
            for (int i = 0; i < availableNotes.size(); i++) {
                NoteSlot noteSlot = availableNotes.get(i);
                availableNotesMessage.append("R$").append(noteSlot.getValue())
                                     .append(" (").append(noteSlot.getQuantity())
                                     .append(")");
        
                // Adiciona um separador após todos os itens, exceto o último
                if (i < availableNotes.size() - 1) {
                    availableNotesMessage.append(" - ");
                }
            }

            throw new MyRuntimeException(e.getMessage() + availableNotesMessage.toString());
        }
        

        // Realizar o saque
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        // Atualizar os slots de notas
        updateNoteSlotsForWithdraw(requestedNotes);

        // Registrar transação
        Transaction transaction = new Transaction(userId, "WITHDRAW", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        // Notificar observadores
        notifyObservers(new WithdrawEvent(userId, amount, requestedNotes));
    }

    @Transactional
    public void transfer(Long sourceUserId, Long targetUserId, BigDecimal amount) {
        User sourceUser = userRepository.findById(sourceUserId)
                .orElseThrow(() -> new MyRuntimeException("Source user not found"));

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new MyRuntimeException("Target user not found"));

        Account sourceAccount = sourceUser.getAccount();
        Account targetAccount = targetUser.getAccount();

        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            throw new MyRuntimeException("Saldo insuficiente");
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        targetAccount.setBalance(targetAccount.getBalance().add(amount));

        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);

        // Registrar transações
        Transaction transaction = new Transaction(sourceUserId, "TRANSFER", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        Transaction transactionForRecipient = new Transaction(targetUserId, "RECEIVE_TRANSFER", amount, LocalDateTime.now());
        transactionRepository.save(transactionForRecipient);

        // Notificar observadores
        notifyObservers(new TransferEvent(sourceUserId, targetUserId, amount));
    }

    @Transactional(readOnly = true)
    public List<Transaction> getTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    private void canDispenseAmount(BigDecimal amount, Map<Integer, Integer> requestedNotes) {
        List<NoteSlot> noteSlots = noteSlotRepository.findAll();
        BigDecimal remainingAmount = amount;

        // Criar um mapa para manter o estoque das notas
        Map<Integer, Integer> availableNotes = new HashMap<>();
        for (NoteSlot noteSlot : noteSlots) {
            availableNotes.put(noteSlot.getValue(), noteSlot.getQuantity());
        }

        for (Map.Entry<Integer, Integer> entry : requestedNotes.entrySet()) {
            int noteValue = entry.getKey();
            int requestedQuantity = entry.getValue();

            // Verificar se a nota está disponível
            if (availableNotes.containsKey(noteValue)) {
                int availableQuantity = availableNotes.get(noteValue);

                // Verificar se há notas suficientes
                if (requestedQuantity > availableQuantity) {
                    remainingAmount = remainingAmount.subtract(BigDecimal.valueOf(noteValue).multiply(BigDecimal.valueOf(availableQuantity)));
                } else {
                    remainingAmount = remainingAmount.subtract(BigDecimal.valueOf(noteValue).multiply(BigDecimal.valueOf(requestedQuantity)));
                }

                if (remainingAmount.compareTo(BigDecimal.ZERO) <= 0) {
                    break;
                }
            } else {
                throw new MyRuntimeException("Note of value " + noteValue + " is not available in the ATM.");
            }
        }

        if (remainingAmount.compareTo(BigDecimal.ZERO) > 0) {
            throw new MyRuntimeException("Saque inválido. ");
        }
    }

    private void updateNoteSlotsForDeposit(Map<Integer, Integer> requestedNotes) {
        List<NoteSlot> noteSlots = noteSlotRepository.findAll();

        for (NoteSlot noteSlot : noteSlots) {
            int noteValue = noteSlot.getValue();
            int noteQuantity = noteSlot.getQuantity();

            if (requestedNotes.containsKey(noteValue)) {
                int requestedQuantity = requestedNotes.get(noteValue);

                // Atualizar a quantidade de notas no estoque para depósito
                noteSlot.setQuantity(noteQuantity + requestedQuantity);
                noteSlotRepository.save(noteSlot);
            }
        }
    }

    private void updateNoteSlotsForWithdraw(Map<Integer, Integer> requestedNotes) {
        List<NoteSlot> noteSlots = noteSlotRepository.findAll();

        for (NoteSlot noteSlot : noteSlots) {
            int noteValue = noteSlot.getValue();
            int noteQuantity = noteSlot.getQuantity();

            if (requestedNotes.containsKey(noteValue)) {
                int requestedQuantity = requestedNotes.get(noteValue);

                // Atualizar a quantidade de notas no estoque para saque
                if (noteQuantity >= requestedQuantity) {
                    noteSlot.setQuantity(noteQuantity - requestedQuantity);
                } else {
                    throw new MyRuntimeException("Not enough notes of value " + noteValue);
                }
                noteSlotRepository.save(noteSlot);
            }
        }
    }
}
