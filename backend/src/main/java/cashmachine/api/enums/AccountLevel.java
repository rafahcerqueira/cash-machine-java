package cashmachine.api.enums;

// Enum to represent different account levels.
public enum AccountLevel {
    PRATA("Prata"),
    BRONZE("Bronze"),
    OURO("Ouro");

    private final String levelName;

    AccountLevel(String levelName) {
        this.levelName = levelName;
    }

    public String getLevelName() {
        return levelName;
    }

    public static AccountLevel fromLevelName(String levelName) {
        for (AccountLevel level : AccountLevel.values()) {
            if (level.levelName.equalsIgnoreCase(levelName)) {
                return level;
            }
        }
        return null;
    }
}
