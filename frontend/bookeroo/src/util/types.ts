import { accountStatus, AccountType } from "./enums";

interface IAccountBase {
    id: number; // ? maybe string with uuid
    email: string;
    password: string;
    confirmPassword: string;
    dateCreated: number;
    lastUpdated: number;
    accountType: AccountType;
    accountStatus: accountStatus;
}

export interface IAccount extends IAccountBase {
    firstName: string;
    lastName: string;
}

export interface IBusinessAccount extends IAccountBase {
    abn: string;
    companyName: string;
}
