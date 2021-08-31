import { AccountStatus, AccountType } from "../../util/enums";

interface IAccountBase {
    id: number; // ? maybe string with uuid
    email: string;
    dateCreated: number;
    lastUpdated: number;
    accountType: AccountType;
    accountStatus: AccountStatus;
}

export interface IAccount extends IAccountBase {
    firstName: string;
    lastName: string;
}

export interface IBusinessAccount extends IAccountBase {
    abn: string;
    companyName: string;
}
