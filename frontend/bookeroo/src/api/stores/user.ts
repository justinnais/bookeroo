// book microservice store

import { AccountType } from "../../util/enums";
import { api, apiLogin } from "../api";
import {
    CreateAccountRequest,
    LoginAccountRequest,
} from "../microservices/user";
import { IAccount, IBusinessAccount } from "../models/Account";

export function listUsers() {
    return apiLogin.get("");
}

export function getUser(id: string) {
    return apiLogin.get(`/${id}`);
}

export function registerUser(user: CreateAccountRequest) {
    return apiLogin.post(`/register`, user);
}

export function loginUser(auth: LoginAccountRequest) {
    return apiLogin.post(`/login`, auth);
}
