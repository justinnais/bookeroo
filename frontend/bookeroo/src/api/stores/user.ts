// book microservice store

import { AccountStatus } from "../../util/enums";
import storage from "../../util/storage";
import { api } from "../api";
import {
    CreateBusinessAccountRequest,
    CreatePersonalAccountRequest,
    IAccount,
    LoginAccountRequest,
} from "../models/Account";
// https://www.bezkoder.com/react-hooks-jwt-auth/

export function listUsers() {
    return api.get("/user");
}

export function getUser(id: string) {
    return api.get(`/user/${id}`);
}

export function getProfile(displayName: string) {
    return api.get(`/user/profile/${displayName}`);
}

export function registerUser(
    user: CreatePersonalAccountRequest | CreateBusinessAccountRequest
) {
    return api.post(`/user/register`, user);
}

export function loginUser(auth: LoginAccountRequest) {
    return api.post(`/user/login`, auth);
}

export function editUser(id: number, user: Partial<IAccount>) {
    return api.patch(`/user/${id}`, user);
}
