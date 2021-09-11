package com.rmit.sept.bk_transservices.transmicroservices;

import com.paypal.http.HttpResponse;
import com.paypal.http.exceptions.HttpException;
import com.paypal.orders.*;
import com.rmit.sept.bk_transservices.transmicroservices.model.Credentials;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class TransMicroservices
{
    public static void main(String[] args)
    {
        Order order;

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");
        List<PurchaseUnitRequest> purchaseUnits = new ArrayList<>();
        purchaseUnits.add(new PurchaseUnitRequest().amountWithBreakdown(
                new AmountWithBreakdown().currencyCode("AUD").value("100.00")));
        orderRequest.purchaseUnits(purchaseUnits);
        OrdersCreateRequest request = new OrdersCreateRequest().requestBody(orderRequest);

        try
        {
            HttpResponse<Order> response = Credentials.client.execute(request);

            order = response.result();
            System.out.println("Order ID: " + order.id());
            order.links().forEach(link ->
                    System.out.println(link.rel() + " => " + link.method() + ":" + link.href()));
        } catch (IOException e)
        {
            if (e instanceof HttpException)
            {
                HttpException he = (HttpException) e;
                System.out.println(he.getMessage());
                he.headers().forEach(x -> System.out.println(x + " :" + he.headers().header(x)));
            } else
            {
                e.printStackTrace();
            }
        }

//        SpringApplication.run(TransMicroservices.class, args);
    }
}
