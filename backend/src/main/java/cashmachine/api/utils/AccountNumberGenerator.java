package cashmachine.api.utils;

import java.util.Random;

public class AccountNumberGenerator {
    
    // Método para gerar o número da conta com dígito verificador
    public static String generateAccountNumber() {
        // Gerar o número base da conta com 7 dígitos
        String accountNumberBase = generateRandomNumber(7);

        // Calcular o dígito verificador usando módulo 11
        int checkDigit = calculateCheckDigit(accountNumberBase);

        // Concatenar o número base com o dígito verificador
        return accountNumberBase + "-" + checkDigit;
    }

    // Método para gerar um número aleatório com n dígitos
    private static String generateRandomNumber(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        // Evitar que o primeiro dígito seja zero
        sb.append(random.nextInt(9) + 1);

        // Gerar os demais dígitos aleatórios
        for (int i = 1; i < length; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    // Método para calcular o dígito verificador usando módulo 11
    private static int calculateCheckDigit(String accountNumberBase) {
        int sum = 0;
        int weight = 2;

        // Iterar sobre os dígitos do número base da direita para a esquerda
        for (int i = accountNumberBase.length() - 1; i >= 0; i--) {
            // Converter o caractere em um número inteiro
            int digit = Character.getNumericValue(accountNumberBase.charAt(i));

            // Multiplicar o dígito pelo peso atual e adicionar à soma
            sum += digit * weight;

            // Aumentar o peso e retornar ao valor inicial quando atingir 9
            weight = (weight == 9) ? 2 : weight + 1;
        }

        // Calcular o módulo 11 da soma
        int mod11 = sum % 11;

        // Calcular o dígito verificador
        int checkDigit = (mod11 < 2) ? 0 : 11 - mod11;

        return checkDigit;
    }
}