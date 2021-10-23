package com.rmit.sept.bk_transservices.transmicroservices.model;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.payments.CapturesRefundRequest;
import com.paypal.payments.Money;
import com.paypal.payments.Refund;
import com.paypal.payments.RefundRequest;

import java.io.IOException;

/**
 * Class to contain the logic to connect to PayPal and request a refund
 */
public class RefundOrder
{
    private static final PayPalEnvironment environment = new PayPalEnvironment.Sandbox(
            "ASd1Q8hr1Uia5jwQHYCmqjQj5_bTn9_sPAx9V5DxKYMoqfo1S87oZc_DAx5VygbkjMiXC1Y7ILt6zYlj",
            "EMEhrzu4lYMeQA6x1FGX7xs3Ab5AGZQPYyPtRoZXs3aw-FeRqEeq5F8tau0rGzKdF1fPUx-w5k0kkQ2_");
    private static final PayPalHttpClient client = new PayPalHttpClient(environment);

    /**
     * Method to refund an order made through PayPal
     *
     * @param captureId PayPal created Capture Identification Number
     * @param price     Price of the transaction
     * @return Response from the PayPal API
     */
    public static HttpResponse<Refund> refundOrder(String captureId, Long price) throws IOException
    {
        RefundRequest refundRequest = new RefundRequest();
        Money money = new Money();
        money.currencyCode("AUD");
        money.value(price.toString());
        refundRequest.amount(money);

        CapturesRefundRequest request = new CapturesRefundRequest(captureId);
        request.prefer("return=representation");
        request.requestBody(refundRequest);

        return client.execute(request);
    }
}
