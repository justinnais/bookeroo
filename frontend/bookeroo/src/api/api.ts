import axios from "axios";
import storage from "../util/storage";

const token = storage.getToken();
if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}
/**
 * base Axios api request to bookeroo api - gets JWT headers added to it
 */
export const api = axios.create({
    baseURL: "https://bookeroo-api.danieljmills.com/api",
});