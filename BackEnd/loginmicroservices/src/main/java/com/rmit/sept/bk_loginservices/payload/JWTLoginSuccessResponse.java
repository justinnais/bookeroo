package com.rmit.sept.bk_loginservices.payload;

/**
 * Response returned in the event a login call is successful. Stores a JWT token
 */
public class JWTLoginSuccessResponse
{
    private boolean success;
    private String token;

    public JWTLoginSuccessResponse(boolean success, String token)
    {
        this.success = success;
        this.token = token;
    }

    public boolean isSuccess()
    {
        return success;
    }

    public void setSuccess(boolean success)
    {
        this.success = success;
    }

    public String getToken()
    {
        return token;
    }

    public void setToken(String token)
    {
        this.token = token;
    }

    @Override
    public String toString()
    {
        return "JWTLoginSuccessResponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
