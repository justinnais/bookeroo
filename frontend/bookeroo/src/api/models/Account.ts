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
