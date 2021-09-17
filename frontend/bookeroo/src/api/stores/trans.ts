// transaction microservice store

import { apiTrans } from "../api";
import { CreateTransactionRequest } from "../microservices/trans";

export function listTrans() {
    return apiTrans.get("");
}

// TODO implement
export function getTrans(id: number) {
    return apiTrans.get(`/${id}`);
}

// TODO implement
export function createTrans(trans: CreateTransactionRequest) {
    return apiTrans.post("/trans/create", trans);
}
