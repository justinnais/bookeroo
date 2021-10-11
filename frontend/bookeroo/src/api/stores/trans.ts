// transaction microservice store

import { api } from "../api";
import { CreateTransactionRequest } from "../models/Listing";

export function listTrans() {
    return api.get("/trans");
}

export function getTrans(id: number) {
    return api.get(`/trans/${id}`);
}

export function getUsersTrans(buyerId: number) {
    return api.get(`/trans/user/${buyerId}`);
}

export function createTrans(trans: CreateTransactionRequest) {
    return api.post("/trans/create", trans);
}

export function deleteTrans(id: number) {
    return api.delete(`/trans/delete${id}`);
}