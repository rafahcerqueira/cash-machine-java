package com.cashmachine.api.routers;

import java.sql.Connection;

import com.cashmachine.api.crud.AccountCrud;
import com.cashmachine.api.crud.CashMachineCrud;
import com.cashmachine.api.database.DBService;
import com.cashmachine.api.forms.FTransfer;
import com.cashmachine.api.http.HttpMessage;
import com.cashmachine.api.http.HttpResponse;
import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MCashMachine;
import com.cashmachine.api.utils.ProxySessionUtil;
import com.cashmachine.api.validators.FloatValidator;
import com.cashmachine.api.validators.StringValidator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * Create a Transactions route 
 */
@RestController
public class RTransactions  {
    
    /**
     * Cash Machine Crud
     */
     private CashMachineCrud cashMachineCrud = CashMachineCrud.getInstance();

    /**
     * Account Crud
     */
    private AccountCrud accountCrud = AccountCrud.getInstance();

    /**
     * Connection Database
     */
    private Connection connection = DBService.getInstance().getConnection();

    @CrossOrigin
    @PostMapping("/transfer/debit")
    public ResponseEntity<HttpMessage> debit(@RequestBody float value, @RequestHeader String token) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";

        validator = StringValidator.isEmpty(token, "Token Session");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = FloatValidator.isSmaller(value, 0, "Valor Debitado");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);  
        }
        
        try {
            connection.setAutoCommit(false);

            if (!ProxySessionUtil.getInstance().authSession(token)) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Sessão Inválida ou Expirada").setError("");
                return ResponseEntity.status(code).body(message);
            }

            MCashMachine cashMachine = ProxySessionUtil.getInstance().getCashMachineByToken(token);

            if (cashMachine.getCSM_AVAILABLE_VALUE() < value) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Caixa Eletrônico Está sem dinheiro suficiente").setError("");
                return ResponseEntity.status(code).body(message);
            } 

            MAccount account = ProxySessionUtil.getInstance().getAccountByToken(token);

            if (account.getACC_BALANCE() < value) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Conta não possui saldo suficiente para completar operação").setError("");
                return ResponseEntity.status(code).body(message);
            }
            
            account.setACC_BALANCE(account.getACC_BALANCE() - value);
            accountCrud.update(account);

            cashMachine.setCSM_AVAILABLE_VALUE(cashMachine.getCSM_AVAILABLE_VALUE() - value);
            cashMachineCrud.update(cashMachine);

            connection.commit();
            connection.setAutoCommit(true);

            if (account.getACC_BALANCE() <= 0) {
                account.setACC_STATUS(false);
                accountCrud.update(account);
                
                message.setCode(code)
                    .setMessage("Valor R$ " + value + " Debitado.")
                    .setError("Saldo zerado, devido a isso sua conta foi desativada.");
                return ResponseEntity.status(code).body(message);
            } 

            code = HttpResponse.OK;
            message.setCode(code).setMessage("Valor R$ " + value + " foi Debitado com sucesso");
            return ResponseEntity.status(code).body(message);
        }catch (Exception e) {
            try {
                connection.rollback();
                connection.setAutoCommit(true);
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao efetuar transação de Débito.").setError(e.getMessage());
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }

    @CrossOrigin
    @PostMapping("/transfer/credit")
    public ResponseEntity<HttpMessage> credit(@RequestBody float value, @RequestHeader String token) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";
        
        validator = StringValidator.isEmpty(token, "Token de Sessão");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = FloatValidator.isSmaller(value, 0, "Valor de Transferência");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try{
            connection.setAutoCommit(false);

            if (!ProxySessionUtil.getInstance().authSession(token)) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Sessão invalida ou expirada.").setError("");
                return ResponseEntity.status(code).body(message);
            }
            
            MAccount account = ProxySessionUtil.getInstance().getAccountByToken(token);

            if (!account.getACC_STATUS()) {
                float balance = account.getACC_BALANCE() + value;
                if (balance > 0) {
                    account.setACC_STATUS(true);
                }
            }

            account.setACC_BALANCE(account.getACC_BALANCE() + value);
            accountCrud.update(account);

            MCashMachine cashMachine = ProxySessionUtil.getInstance().getCashMachineByToken(token);

            cashMachine.setCSM_AVAILABLE_VALUE(cashMachine.getCSM_AVAILABLE_VALUE() + value);
            cashMachineCrud.update(cashMachine);

            connection.commit();
            connection.setAutoCommit(true);

            code = HttpResponse.OK;
            message.setCode(code).setMessage("Valor de R$ " + value + " creditado com sucesso.").setError("");
            return ResponseEntity.status(code).body(message);
        }catch (Exception e) {
            try {
                connection.rollback();
                connection.setAutoCommit(true);
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao efetuar transação de credito.").setError(e.getMessage());
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }

    @CrossOrigin
    @PostMapping("/transfer/transfer")
    public ResponseEntity<HttpMessage> transfer(@RequestBody FTransfer data, @RequestHeader String token) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";
        
        validator = StringValidator.isEmpty(token, "Token de Sessão");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isEmpty(data.getAccount_code(), "Codigo Conta Destino");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = FloatValidator.isSmaller(data.getValue(), 0, "Valor de Transferência");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try{
            connection.setAutoCommit(false);

            if (!ProxySessionUtil.getInstance().authSession(token)) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Sessão invalida ou expirada.").setError("");
                return ResponseEntity.status(code).body(message);
            }
            
            MAccount originAccount = ProxySessionUtil.getInstance().getAccountByToken(token);

            if (originAccount.getACC_BALANCE() < data.getValue()) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Conta não possui saldo suficiente para completar operação.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            MCashMachine cashMachine = ProxySessionUtil.getInstance().getCashMachineByToken(token);

            if (cashMachine.getCSM_AVAILABLE_VALUE() < data.getValue()) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Caixa Eletrônico Está sem dinheiro suficiente.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            MAccount destinyAccount = accountCrud.getDataByCode(data.getAccount_code());

            if (destinyAccount == null) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Conta de destino não encontrada.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            float balanceOrigimAccount = originAccount.getACC_BALANCE() - data.getValue();
            float balanceDestinyAccount = destinyAccount.getACC_BALANCE() + data.getValue();

            originAccount.setACC_BALANCE(balanceOrigimAccount);
            destinyAccount.setACC_BALANCE(balanceDestinyAccount);

            accountCrud.update(originAccount);
            accountCrud.update(destinyAccount);

            connection.commit();
            connection.setAutoCommit(true);

            if (originAccount.getACC_BALANCE() <= 0) {
                originAccount.setACC_STATUS(false);
                accountCrud.update(originAccount);
                
                message.setCode(code)
                    .setMessage("Valor R$ " + data.getValue() + " Transferido.")
                    .setError("Saldo zerado, devido a isso sua conta foi desativada.");
                return ResponseEntity.status(code).body(message);
            }

            code = HttpResponse.OK;
            message.setCode(code).setMessage("Valor R$ " + data.getValue() + " Transferido.").setError("");
            return ResponseEntity.status(code).body(message);
        }catch (Exception e) {
            try {
                connection.rollback();
                connection.setAutoCommit(true);
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao efetuar transação de transferencia.").setError(e.getMessage());
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }

}
