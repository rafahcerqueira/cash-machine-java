package com.cashmachine.api.routers;

import java.util.List;

import com.cashmachine.api.crud.AccountCrud;
import com.cashmachine.api.crud.CashMachineCrud;
import com.cashmachine.api.database.DBResult;
import com.cashmachine.api.forms.FLogin;
import com.cashmachine.api.http.HttpMessage;
import com.cashmachine.api.http.HttpResponse;
import com.cashmachine.api.interfaces.RouterCrud;
import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MCashMachine;
import com.cashmachine.api.models.MSession;
import com.cashmachine.api.utils.ProxySessionUtil;
import com.cashmachine.api.utils.SystemUtil;
import com.cashmachine.api.validators.FloatValidator;
import com.cashmachine.api.validators.StringValidator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;

/**
 * Create a login route that login data
 */
@RestController
public class RLogin implements RouterCrud<MAccount> {
    
    /**
     * Account Crud
     */
    private AccountCrud accountCrud = AccountCrud.getInstance();  

    /**
     * Cash Machine Crud
     */
    private CashMachineCrud cashMachineCrud = CashMachineCrud.getInstance();

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<HttpMessage> login(@RequestBody FLogin data)  {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";

        validator = StringValidator.isValidSting(data.getACC_CODE(), "Codigo Conta", 15, 1);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        validator = StringValidator.isValidSting(data.getACC_PASSWORD(), "Senha", 32, 6);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);    
        }

        validator = FloatValidator.isSmaller(data.getCSM_ID(), 0, "Caixa Eletronico");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);    
        }

        validator = StringValidator.isEmpty(data.getTOKEN(), "Token");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try {

            List<MCashMachine> lMachine = cashMachineCrud.getDataByID(data.getCSM_ID());

            if (lMachine.size() != 1) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Caixa não encontrado.").setError("");
                return ResponseEntity.status(code).body(message);
            }
            
            if (lMachine.get(0).getCSM_STATUS().contains("EU") || lMachine.get(0).getCSM_STATUS().contains("IN")) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Caixa em Uso ou Inativo, Tente Outro.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            MAccount account = accountCrud.getDataByCode(data.getACC_CODE());
        
            if (account == null) {
                code = HttpResponse.NOT_FOUND;
                message.setCode(code).setMessage("Conta não encontrada.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            if (!account.getACC_STATUS()) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Conta Inativa.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            char[] charLoginPassword = data.getACC_PASSWORD().toCharArray();
            String charAccountPassword = account.getACC_PASSWORD(); 
            
            if (BCrypt.verifyer().verify(charLoginPassword, charAccountPassword).verified == false) {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Senha não conferem.").setError("");
                return ResponseEntity.status(code).body(message); //Senhas não conferem
            } 

            MSession session = MSession.Build()
                .setSSI_ACC_CODE(data.getACC_CODE())
                .setSSI_CSM_ID(data.getCSM_ID())
                .setSSI_TOKEN(data.getTOKEN());

            if (ProxySessionUtil.getInstance().newSession(session)) {
                code = HttpResponse.OK;
                message.setCode(code).setMessage("Login efetuado com sucesso.").setError("");
                return ResponseEntity.status(code).body(message);
            } else {
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Falha ao efetuar login.").setError("");
                return ResponseEntity.status(code).body(message);
            }

        } catch (Exception e) {
            try {
                code = HttpResponse.BAD_REQUEST;
                message.setCode(code).setMessage("Falha ao efetuar login.").setError(e.getMessage());
                            
                SystemUtil.log(e.getMessage()+e.getStackTrace());
                return ResponseEntity.status(code).body(message);
            } catch (Exception err) {
                code = HttpResponse.INTERNAL_SERVER_ERROR;
                message.setCode(code).setMessage("Erro Interno do Servidor.").setError(err.getMessage());
                return ResponseEntity.status(code).body(message);
            }
        }
    }

    @CrossOrigin
    @GetMapping("/logout")
    public ResponseEntity<HttpMessage> logout (@RequestHeader String token)  {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";

        validator = StringValidator.isEmpty(token, "Token de Sessão");

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        try {
            

            if (!ProxySessionUtil.getInstance().authSession(token)){
                code = HttpResponse.UNAUTHORIZED;
                message.setCode(code).setMessage("Sessão inexistente ou invalida.").setError("");
                return ResponseEntity.status(code).body(message);
            }

            if (ProxySessionUtil.getInstance().endSession(token)) {
                code = HttpResponse.OK;
                message.setCode(code).setMessage("Sessão finalizada com sucesso.").setError("");
                return ResponseEntity.status(code).body(message); 
            }

            code = HttpResponse.INTERNAL_SERVER_ERROR;
            message.setCode(code).setMessage("Sessão não pode ser finalizada devido a algum erro.").setError("");
            return ResponseEntity.status(code).body(message);
              
        } catch (Exception e) {
            code = HttpResponse.INTERNAL_SERVER_ERROR;
            message.setCode(code)
                .setMessage(SystemUtil.log("Erro ao tentar finalizar sessão."))
                .setError(e.getMessage());
            return ResponseEntity.status(code).body(message);    
        }
    }

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

}
