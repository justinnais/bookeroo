import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Routes } from "./Routes";

/**
 * Restricted Route component that redirected logged in users.
 * @param props RouteProps
 * @returns Restricted Route
 */
export default function RestrictedRoute(props: RouteProps) {
    const { component: Component, ...rest } = props;
    // todo implement auth
    const isAuthenticated = false;

    return (
        <Route
            {...rest}
            render={(props) =>
                // if user is logged in and route is restricted, redirect back home
                isAuthenticated ? (
                    <Redirect to={Routes.Home} />
                ) : (
                    Component && <Component {...props} />
                )
            }
        />
    );
}
