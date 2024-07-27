package com.cashmachine.api.observer;

import java.util.ArrayList;
import java.util.List;

public class AccountObservable {
    private List<AccountObserver> observers = new ArrayList<>();

    public void addObserver(AccountObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(AccountObserver observer) {
        observers.remove(observer);
    }

    protected void notifyObservers(String message) {
        for (AccountObserver observer : observers) {
            observer.update(message);
        }
    }
}
