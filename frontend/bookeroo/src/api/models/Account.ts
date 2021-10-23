import { AccountStatus, AccountType } from "../../util/enums";

interface IAccountBase {
    id: number; // ? maybe string with uuid
    username: string;
    dateCreated: number;
    lastUpdated: number;
    accountType: AccountType;
    accountStatus: AccountStatus;
}

export interface IAccount extends IAccountBase {
    displayName: string;
    firstName: string;
    lastName: string;
}

export interface IBusinessAccount extends IAccountBase {
    abn: string;
    companyName: string;
}

interface CreateAccountRequest {
    username: string;
    password: string;
    accountType: AccountType;
    displayName: string;
}

export interface CreatePersonalAccountRequest extends CreateAccountRequest {
    firstName: string;
    lastName: string;
}

export interface CreateBusinessAccountRequest extends CreateAccountRequest {
    abn: string;
    companyName: string;
}

export interface CreateAccountResponse {
    id: string;
}

export interface LoginAccountRequest {
    username: string;
    password: string;
}

export interface LoginAccountResponse {
    user: IAccount;
    token: string;
}
