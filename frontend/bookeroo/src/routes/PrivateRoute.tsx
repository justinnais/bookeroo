import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Routes } from "./Routes";

/**
 * Private Route component that redirects unauthorised users back to the login page
 * @param props RouteProps
 * @returns private router
 */
export default function PrivateRoute(props: RouteProps) {
    // https://navid2zp.medium.com/private-routes-with-react-router-while-using-the-render-method-77534c11fa25
    const { component: Component, ...rest } = props;
    // todo implement auth
    const isAuthenticated = true;

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && Component ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={Routes.Login} />
                )
            }
        />
    );
}
