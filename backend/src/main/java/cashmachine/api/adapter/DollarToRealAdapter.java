package cashmachine.api.adapter;

public class DollarToRealAdapter implements IMoneyConverter {
    private static final double EXCHANGE_RATE = 5.0;

    @Override
    public double convert(double amount) {
        return amount * EXCHANGE_RATE;
    }
}
