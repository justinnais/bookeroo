package com.rmit.sept.bk_loginservices.validator;

/**
 * Takes a {@link String} abn and validates it, based on the formula
 *  <a href="https://abr.business.gov.au/Help/AbnFormat">here</a>
 */
public class AbnValidator
{
    private static final int ABN_LENGTH = 11;
    private static final int DIVISOR = 89;
    private static final int[] weights = {10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19};

    /**
     * Validates a given {@link String} abn
     * @param abn - Abn to validate
     * @return true if valid
     */
    public static boolean validate(String abn)
    {
        if (abn.length() != ABN_LENGTH)
            return false;

        int[] digits = new int[ABN_LENGTH];

        for (int i = 0; i < ABN_LENGTH; i++)
        {
            try
            {
                digits[i] = Integer.parseInt(String.valueOf(abn.charAt(i)));
            } catch (NumberFormatException e)
            {
                return false;
            }
        }
        digits[0] = digits[0] - 1;

        int sum = 0;
        for (int i = 0; i < ABN_LENGTH; i++)
            sum = sum + (digits[i] * weights[i]);

        return (sum % DIVISOR) == 0;
    }
}
