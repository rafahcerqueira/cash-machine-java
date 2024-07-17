package com.cashmachine.api.cache;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import com.cashmachine.api.interfaces.ProxyService;
import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MCashMachine;
import com.cashmachine.api.models.MSession;
import com.cashmachine.api.utils.SystemUtil;

/**
 * Cache Session
 */
public class CSession implements ProxyService{

    /**
     * Session List
     */
    private List<MSession> memorySession = new ArrayList<MSession>();

    /**
     * Instance of Class
     */
    private static CSession instance = null;
    
    /**
     * Constructor
     */
    private CSession() { }

    /**
     * Get instance method
     */
    public static CSession getInstance() {
        if (instance == null) {
            instance = new CSession();
        } 
        return instance;
    }

    /**
     * Dentroy instance method
     */
    public void destroyInstance() {
        instance = null;
    }

    @Override
    public boolean newSession (MSession session) {
        // pegar conta e ver se tem alguma sessao
        MSession mSession = getSessionByCode(session.getSSI_ACC_CODE());

        //verificar se o token 
        if ((mSession != null) && (session.getSSI_TOKEN() != mSession.getSSI_TOKEN())) {

            mSession.setSSI_ACC_CODE(session.getSSI_ACC_CODE())
                .setSSI_CSM_ID(session.getSSI_CSM_ID())
                .setSSI_TOKEN(session.getSSI_TOKEN())
                .setSSI_DATE(LocalDateTime.now());    
            
            updateSession(mSession);

        } else {

            MSession sSession = MSession.Build()
                .setSSI_DATE(LocalDateTime.now())
                .setSSI_TOKEN(session.getSSI_TOKEN())
                .setSSI_CSM_ID(session.getSSI_CSM_ID())
                .setSSI_ACC_CODE(session.getSSI_ACC_CODE());

            insertSession(sSession);
        }

        return true;
    }
    

    @Override
    public boolean authSession (String token) {

        MSession cacheSession = this.getSessionByToken(token);

        if (cacheSession != null) {

            if (ChronoUnit.HOURS.between(cacheSession.getSSI_DATE(), LocalDateTime.now()) >= 2) {
                removeSessionByToken(cacheSession.getSSI_TOKEN());
                return false;
            }
            
            cacheSession.setSSI_DATE(LocalDateTime.now());
            updateSession(cacheSession);
            return true;
        }

        return false;
    }

    @Override
    public boolean endSession(String token) {
        return removeSessionByToken(token);
    } 

    @Override
    public MAccount getAccountByToken(String token) {
        try {
            MSession cacheSession = getSessionByToken(token);  
            return MAccount.Build().setACC_CODE(cacheSession.getSSI_ACC_CODE());
        } catch (Exception e) {
            SystemUtil.log("Error while trying to get Account by Token " + e.getMessage());
        }
        return null;
    }

    @Override
    public MCashMachine getCashMachineByToken(String token) {
        try {
            MSession cachSession = getSessionByToken(token);
            return MCashMachine.Build().setCSM_ID(cachSession.getSSI_CSM_ID());
        } catch (Exception e) {
            SystemUtil.log("Error while trying to get Cash Machine by Token " + e.getMessage());   
        } 
        return null;
    }

    /**
     * GET Session by Code
     * @param code - Value of SSI_ACC_CODE
     * @return Obeject MSession
     */
    public MSession getSessionByCode(String code) {
        for ( MSession gSession : memorySession ) {
            if (gSession.getSSI_ACC_CODE().contains(code)) {
                return gSession;
            }
        }
        return null;    
    }

    /**
     * GET Session by Token
     * @param token - Value of Validation token
     * @return Obeject MSession
     */
    public MSession getSessionByToken(String token) {
        for ( MSession gSession : memorySession ) {
            if (gSession.getSSI_TOKEN().contains(token)) {
                return gSession;
            }
        }
        return null;    
    }

    /**
     * Update Session
     * @param session - Value of MSession
     * @return boolean
     */
    public boolean updateSession(MSession session) {
        for ( MSession uSession : memorySession ) {
            if (uSession.getSSI_ACC_CODE().contains(session.getSSI_ACC_CODE())) {
                uSession.setSSI_CSM_ID(session.getSSI_CSM_ID())
                    .setSSI_TOKEN(session.getSSI_TOKEN())
                    .setSSI_DATE(session.getSSI_DATE());

                return true;
            }
        }    
        return false;
    }

    /**
     * Remove Session
     * @param code - Value of SSI_ACC_CODE
     * @return boolean
     */
    public boolean removeSessionByToken(String token) {
        for (MSession rSession : memorySession ){   
            if (rSession.getSSI_TOKEN().contains(token)){
                memorySession.remove(rSession);
                return true;
            }
        }
        return false;
    } 

    /**
     * Insert Session
     * @param session - Value of MSession
     * @return boolean
     */
    public boolean insertSession(MSession session) {
        session.setSSI_DATE(LocalDateTime.now());
        memorySession.add(session);
        return true;
    }

}
