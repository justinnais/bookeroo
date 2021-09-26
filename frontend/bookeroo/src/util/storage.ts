// https://github.dev/alan2207/bulletproof-react/tree/master/src/routes
const storagePrefix = "bookeroo_";

// session storage is not the most secure way to handle JWT but it is fine for this use case
const storage = {
    getToken: () => {
        return JSON.parse(
            window.sessionStorage.getItem(`${storagePrefix}token`) as string
        );
    },
    setToken: (token: string) => {
        window.sessionStorage.setItem(
            `${storagePrefix}token`,
            JSON.stringify(token)
        );
    },
    clearToken: () => {
        window.sessionStorage.removeItem(`${storagePrefix}token`);
    },
};

export default storage;
