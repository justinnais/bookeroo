// transaction microservice store

import { api } from "../api";
import { CreateTransactionRequest } from "../models/Listing";

// ! this fails
export function listTrans() {
    return api.get("/trans");
}

// TODO implement
export function getTrans(id: number) {
    return api.get(`/trans/${id}`);
}

// TODO implement
export function createTrans(trans: CreateTransactionRequest) {
    return api.post("/trans/trans/create", trans);
}
