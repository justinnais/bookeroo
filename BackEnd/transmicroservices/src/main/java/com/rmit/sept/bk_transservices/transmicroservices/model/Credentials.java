package com.rmit.sept.bk_transservices.transmicroservices.model;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;

public class Credentials
{
    // Obviously bad practice having plaintext, but this is just a sandbox
    private static final PayPalEnvironment environment = new PayPalEnvironment.Sandbox(
            "Aa39P5Yioq7eQg1DRZkByeDCP4UQu5vYRFzqiHEQvufbqbC83VDp_V-VqdwI8HhvBrJ3ZMsUjUIbFLSd",
            "EO-RSIwrjgNDkfduOWypzdgAODaClIf3eQapsCOJTOx3lWvtoNpBX0Erg4-qdYs3e56djwCQhkjbbpMj"
    );

    public static final PayPalHttpClient client = new PayPalHttpClient(environment);
}
