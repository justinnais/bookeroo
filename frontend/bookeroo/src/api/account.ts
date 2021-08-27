import { AccountType } from "../util/enums";
import { IAccount } from "../util/types";
import { BookerooRequest, BookerooResponse } from "./apiInterfaces";

export interface CreateAccountRequest extends BookerooRequest {
    email: string;
    password: string;
    accountType: AccountType;
    // ? not sure about these optional, maybe split into seperate requests
    firstName?: string;
    lastName?: string;
    abn?: string;
    companyName?: string;
}

export interface CreateAccountResponse extends BookerooResponse {
    id: number;
}
