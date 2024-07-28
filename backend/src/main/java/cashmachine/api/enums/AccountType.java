package cashmachine.api.enums;

// Enum to represent different account types.
public enum AccountType {
    POUPANCA("Poupança"),
    CORRENTE("Corrente");

    private final String typeName;

    AccountType(String typeName) {
        this.typeName = typeName;
    }

    public String getTypeName() {
        return typeName;
    }

    public static AccountType fromTypeName(String typeName) {
        for (AccountType type : AccountType.values()) {
            if (type.typeName.equalsIgnoreCase(typeName)) {
                return type;
            }
        }
        return null;
    }
}