package com.cashmachine.api.routers;

import java.sql.Connection;
import java.util.List;

import com.cashmachine.api.crud.AccountCrud;
import com.cashmachine.api.crud.AgencyCrud;
import com.cashmachine.api.crud.ClientAddressCrud;
import com.cashmachine.api.crud.ClientCrud;
import com.cashmachine.api.crud.ClientTelephoneCrud;
import com.cashmachine.api.database.DBResult;
import com.cashmachine.api.database.DBService;
import com.cashmachine.api.forms.FFullAccount;
import com.cashmachine.api.forms.FAccount;
import com.cashmachine.api.http.HttpMessage;
import com.cashmachine.api.http.HttpResponse;
import com.cashmachine.api.interfaces.RouterCrud;
import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MClient;
import com.cashmachine.api.validators.FloatValidator;
import com.cashmachine.api.validators.StringValidator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;

import org.springframework.web.bind.annotation.RequestBody;

/**
 * Create a full account route that cotains all data
 */
@RestController
public class RCreateFullAccount implements RouterCrud<MAccount> {

    /**
     * Crud Client
     */
    private ClientCrud clientCrud = ClientCrud.getInstance();

    /**
     * Crud Client Telephone
     */
    private ClientTelephoneCrud telephoneCrud = ClientTelephoneCrud.getInstance();

    /**
     * Crud Client Addrres
     */
    private ClientAddressCrud addressCrud = ClientAddressCrud.getInstance();

    /**
     * Crud Account
     */
    private AccountCrud accountCrud = AccountCrud.getInstance();

    /**
     * Crud Agency
     */
    private AgencyCrud agencyCrud = AgencyCrud.getInstance();

    /**
     * Connection Database
     */
    private Connection connection = DBService.getInstance().getConnection();

    @Override
    public ResponseEntity<HttpMessage> register(MAccount data) {
        return null;
    }

    @Override
    public ResponseEntity<HttpMessage> edit(MAccount data) {
        return null;
    }

    @Override
    public ResponseEntity<HttpMessage> delete(int id) {
        return null;
    }

    @Override
    public ResponseEntity<List<MAccount>> getAll(String search) {
        return null;
    }

    @Override
    public ResponseEntity<DBResult<MAccount>> getFilteredData(int limit, String search) {
        return null;
    }

    @CrossOrigin
    @PostMapping("/register/fullaccount")
    public ResponseEntity<HttpMessage> registerFullAccount(@RequestBody FFullAccount data) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";

        validator = StringValidator.isValidSting(data.getClient().getCLI_FULL_NAME(), "Nome Completo", 80, 3);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClient().getCLI_RG(), "RG", 15, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClient().getCLI_CPF(), "CPF", 15, 11);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);

        }

        validator = StringValidator.isValidSting(data.getClient().getCLI_BIRTHDAY(), "Data de Aniversário", 10, 8);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientTelephone().getCLT_TELEPHONE(), "Telefone", 20, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientAddress().getCLA_ZIP_CODE(), "CEP", 45, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientAddress().getCLA_ADDRESS(), "Endereço", 150, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isEmpty(String.valueOf(data.getClientAddress().getCLA_NUMBER()), "Numero");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientAddress().getCLA_DISTRICTY(), "Bairro", 80, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientAddress().getCLA_CITY(), "Cidade", 80, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClientAddress().getCLA_UF(), "UF", 2, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getAccount().getACC_PASSWORD(), "Senha", 32, 6);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getAccount().getACC_TYPE(), "Tipo Conta", 2, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        if (!data.getAccount().getACC_TYPE().contains("P") && !data.getAccount().getACC_TYPE().contains("C")) {
            message.setCode(code).setMessage("Tipo Conta está fora do padrão esperado.").setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = FloatValidator.isBigger(data.getAccount().getACC_BALANCE(), 0, "Saldo");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isEmpty(String.valueOf(data.getAccount().getACC_AGE_ID()), "Agencia");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try {
            connection.setAutoCommit(false);

            if (clientCrud.getAll(data.getClient().getCLI_RG()).size() != 0) {
                message.setCode(code).setMessage("Cliente Já Cadastrado com RG " + data.getClient().getCLI_RG()).setError("");
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            }

            if (clientCrud.getAll(data.getClient().getCLI_CPF()).size() != 0) {
                message.setCode(code).setMessage("Cliente Já Cadastrado com CPF " + data.getClient().getCLI_CPF()).setError("");
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            }

            int clientID = clientCrud.insert(data.getClient());

            if (clientID == 0) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Cliente Não Encontrado.").setError("");
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            }

            data.getClientTelephone().setCLT_CLI_ID(clientID);
            telephoneCrud.insert(data.getClientTelephone());

            data.getClientAddress().setCLA_CLI_ID(clientID);
            addressCrud.insert(data.getClientAddress());

            if (agencyCrud.getDataByID(data.getAccount().getACC_AGE_ID()).size() <= 0) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Agencia Não Encontrado.").setError("");
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            }

            String hashPassword = BCrypt.withDefaults().hashToString(12,
                    data.getAccount().getACC_PASSWORD().toCharArray());
            data.getAccount().setACC_PASSWORD(hashPassword);

            data.getAccount().setACC_CLI_ID(clientID);
            accountCrud.insert(data.getAccount());

            connection.commit();
            connection.setAutoCommit(true);

            code = HttpResponse.OK;
            message
                .setCode(code)
                .setMessage("Conta Cadastrada com Sucesso.")
                .setResult(data.getAccount().getACC_CODE());

            return ResponseEntity.status(code).body(message);
        } catch (Exception e) {
            try {
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao Cadastrar Conta.").setError(e.getMessage());
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }

    @CrossOrigin
    @PostMapping("/register/account")
    public ResponseEntity<HttpMessage> registerAccount(@RequestBody FAccount data) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";

        validator = StringValidator.isValidSting(data.getClient().getCLI_RG(), "RG", 15, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getClient().getCLI_CPF(), "CPF", 14, 11);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getAccount().getACC_PASSWORD(), "Senha", 32, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getAccount().getACC_TYPE(), "Tipo Conta", 2, 0);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        if (!data.getAccount().getACC_TYPE().contains("P") && !data.getAccount().getACC_TYPE().contains("C")) {
            message.setCode(code).setMessage("Tipo Conta está fora do padrão esperado.").setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = FloatValidator.isBigger(data.getAccount().getACC_BALANCE(), 0, "Saldo");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isEmpty(String.valueOf(data.getAccount().getACC_AGE_ID()), "Agencia");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try {
            connection.setAutoCommit(false);

            List<MClient> lclient = clientCrud.getAll(data.getClient().getCLI_CPF());

            if (lclient.size() >= 2) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Mais de um cliente foi encontrado com o mesmo documento.")
                        .setError("");
                return ResponseEntity.status(code).body(message);
            } else if (lclient.size() <= 0) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Nenhum Cliente encontrado com este documento.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            if (agencyCrud.getDataByID(data.getAccount().getACC_AGE_ID()).size() <= 0) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Nenhuma agência encontrada.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            String hashPassword = BCrypt.withDefaults().hashToString(12,
                    data.getAccount().getACC_PASSWORD().toCharArray());
            data.getAccount().setACC_PASSWORD(hashPassword);

            data.getAccount().setACC_CLI_ID(lclient.get(0).getCLI_ID());

            accountCrud.insert(data.getAccount());

            connection.commit();
            connection.setAutoCommit(true);

            code = HttpResponse.CREATED;
            message.setCode(code).setMessage("Conta criada com sucesso").setResult(data.getAccount().getACC_CODE());
            return ResponseEntity.status(code).body(message);

        } catch (Exception e) {
            try {
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao efetuar cadastro da conta.").setError(e.getMessage());
                connection.rollback();
                connection.setAutoCommit(true);
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }
}
