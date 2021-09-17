import { AccountType } from "../../util/enums";
import { IAccount, IBusinessAccount } from "../models/Account";
// import { BookerooRequest, BookerooResponse } from "../apiInterfaces";

// request types exported to the apiInterface.ts
// export type UserRequests = "user/register" | "user/login" | "user";

/*
    POST - requests and responses exported to api.ts
*/
// export type UserPostRequest = CreateAccountRequest | LoginAccountRequest;
// export type UserPostResponse = CreateAccountResponse | LoginAccountResponse;

export interface CreateAccountRequest {
    username: string;
    password: string;
    accountType: AccountType;
    // ? not sure about these optional, maybe split into seperate requests
    displayName?: string;
    firstName?: string;
    lastName?: string;
    abn?: string;
    companyName?: string;
}

// interface CreateAccountResponse extends BookerooResponse {
//     id: number;
// }
export interface LoginAccountRequest {
    username: string;
    password: string;
}

// interface LoginAccountResponse extends BookerooResponse {
//     id: number;
// }

// TODO update requests, delete request (sets AccountStatus to inactive)

/*
    GET - requests and responses exported to api.ts
*/
// export type UserGetRequest = GetAccountRequest | ListAccountRequest;
// export type UserGetResponse = GetAccountResponse | ListAccountResponse;

// interface GetAccountRequest extends BookerooRequest {
//     id: number;
// }

// interface GetAccountResponse extends BookerooResponse {
//     account: IAccount | IBusinessAccount;
// }

// interface ListAccountRequest extends BookerooRequest {}

// interface ListAccountResponse extends BookerooResponse {
//     accounts: (IAccount | IBusinessAccount)[];
// }
