package cashmachine.api.observer;

import java.util.ArrayList;
import java.util.List;

public class Subject {
    private List<IObserver> observers = new ArrayList<>();

    public void addObserver(IObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(IObserver observer) {
        observers.remove(observer);
    }

    protected void notifyObservers(Object event) {
        for (IObserver observer : observers) {
            observer.update(event);
        }
    }
}
