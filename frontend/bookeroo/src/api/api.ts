import axios from "axios";
import storage from "../util/storage";

const token = storage.getToken();
if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const api = axios.create({
    baseURL: "https://bookeroo-api.danieljmills.com/api",
});