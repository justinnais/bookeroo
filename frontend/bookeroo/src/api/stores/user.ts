// book microservice store

import { AccountStatus } from "../../util/enums";
import storage from "../../util/storage";
import { apiLogin } from "../api";
import {
    CreateBusinessAccountRequest,
    CreatePersonalAccountRequest,
    IAccount,
    LoginAccountRequest,
} from "../models/Account";
// https://www.bezkoder.com/react-hooks-jwt-auth/

export function listUsers() {
    return apiLogin.get("");
}

export function getUser(id: string) {
    return apiLogin.get(`/${id}`);
}

export function getProfile(displayName: string) {
    return apiLogin.get(`/profile/${displayName}`);
}

export function registerUser(
    user: CreatePersonalAccountRequest | CreateBusinessAccountRequest
) {
    return apiLogin.post(`/register`, user);
}

export function loginUser(auth: LoginAccountRequest) {
    return apiLogin.post(`/login`, auth);
}

export function editUser(id: number, user: Partial<IAccount>) {
    return apiLogin.patch(`/${id}`, user);
}
