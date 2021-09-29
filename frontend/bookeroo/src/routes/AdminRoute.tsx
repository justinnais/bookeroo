import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { Routes } from "./Routes";

/**
 * Admin Route component that redirects non admin users back to the home page
 * @param props RouteProps
 * @returns admin router
 */
export default function AdminRoute(props: RouteProps) {
    // https://navid2zp.medium.com/private-routes-with-react-router-while-using-the-render-method-77534c11fa25
    const { component: Component, ...rest } = props;
    const isAdmin = useAuthStore((state) => state.isAdmin);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAdmin && Component ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={Routes.Login} />
                )
            }
        />
    );
}
