import axios from "axios";
import { CreateAccountRequest } from "./account";

const REST_URL = "http://localhost:8080/api/";

type RequestTypes = "register" | "login";
type RequestInterfaces = CreateAccountRequest;
type Identifier = string | number | undefined;

export namespace API {
    export async function post(
        requestType: RequestTypes,
        item: RequestInterfaces
    ) {
        try {
            const response = await axios.post(
                `${REST_URL}/${requestType}`,
                item
            );
            switch (response.status) {
                case 200:
                    console.log(response);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    export async function get(
        requestType: RequestTypes,
        identifier: Identifier
    ) {
        try {
            const response = await axios.get(
                `${REST_URL}/${requestType}/${identifier}`
            );
            switch (response.status) {
                case 200:
                    console.log(response);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
