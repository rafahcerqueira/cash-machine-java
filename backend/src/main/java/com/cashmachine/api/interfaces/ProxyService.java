package com.cashmachine.api.interfaces;

import com.cashmachine.api.models.MAccount;
import com.cashmachine.api.models.MCashMachine;
import com.cashmachine.api.models.MSession;

// Abstract Proxy Services
public interface ProxyService {
    
    /**
     * New Session 
     * @param session - Model of Session
     * @return Value of Method
     */
    public boolean newSession (MSession session);

    /**
     * Authenticate Session
     * @param token - token to authorize the session
     * @return Value of Method
     */
    public boolean authSession (String token);

    /**
     * Finalize Session
     * @param token - token to end a session 
     * @return Value of Method
     */
    public boolean endSession(String token);

    /**
     * Get Account by Token
     * @param token - token
     * @return MAccount object
     */
    public MAccount getAccountByToken(String token); 

    /**
     * Get Cash Machine by Token
     * @param token - token
     * @return MCashMAchine object
     */
    public MCashMachine getCashMachineByToken(String token);
}