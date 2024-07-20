package com.cashmachine.api.routers;

import java.util.List;

import com.cashmachine.api.cache.CSession;
import com.cashmachine.api.crud.AccountCrud;
import com.cashmachine.api.crud.AgencyCrud;
import com.cashmachine.api.crud.ClientCrud;
import com.cashmachine.api.forms.FAccountInfo;
import com.cashmachine.api.http.HttpMessage;
import com.cashmachine.api.http.HttpResponse;
import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MAgency;
import com.cashmachine.api.models.MClient;
import com.cashmachine.api.models.MSession;
import com.cashmachine.api.utils.ProxySessionUtil;
import com.cashmachine.api.validators.StringValidator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RAccount {
    
    @GetMapping("/account/info")
    @CrossOrigin
    public ResponseEntity<HttpMessage> accountInfo(@RequestHeader String token) {
        HttpMessage message = HttpMessage.build();
        int code = HttpResponse.UNAUTHORIZED;
        String validator = "";
        
        validator = StringValidator.isValidSting(token, "Token", 80, 1);

        if (!validator.isEmpty()) {
            message.setCode(code).setMessage(validator).setError("");
            return ResponseEntity.status(code).body(message);
        }

        

        if (!ProxySessionUtil.getInstance().authSession(token)) {
            message.setCode(code).setMessage("Usuário Não Está Autenticado.").setError("");
            return ResponseEntity.status(code).body(message);
        }

        MSession session = CSession.getInstance().getSessionByToken(token);

        MAccount account = AccountCrud.getInstance().getDataByCode(session.getSSI_ACC_CODE());
        List<MClient> clients = ClientCrud.getInstance().getDataByID(account.getACC_CLI_ID());
        List<MAgency> agencies = AgencyCrud.getInstance().getDataByID(account.getACC_AGE_ID());

        FAccountInfo accountInfo = FAccountInfo.build()
                                                .setClient(clients.get(0))
                                                .setAccount(account)
                                                .setAgency(agencies.get(0));
        code = HttpResponse.OK;
        message.setCode(code).setMessage("Informações Coletadas com Sucess.").setResult(accountInfo);

        return ResponseEntity.status(code).body(message);
    }
}