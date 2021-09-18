import React, { useContext } from "react";
import "./styles/App.scss";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
// import { Provider } from "react-redux";
// import store from "./store";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Footer from "./components/Layout/Footer";
import { Routes } from "./routes/Routes";
import RestrictedRoute from "./routes/RestrictedRoute";
import { useQuery } from "react-query";
import Search from "./pages/Search";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Admin from "./pages/Admin";
import Books from "./pages/Books";
import Alert from "./components/Alert";
import Book from "./pages/Book";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            [theme.breakpoints.up("xs")]: { paddingBottom: "65px" }, // reduce footer size on small screens
            [theme.breakpoints.down("xs")]: { paddingBottom: "56px" },
        },
    })
);

function App() {
    const classes = useStyles();
    // const {} = useQuery('user', () =>)
    return (
        // <Provider store={store}>
        <div className="page-container">
            <Router>
                <Header />
                <div className={classes.content}>
                    {/* prettier-ignore */}
                    <Switch>

                        <Route exact path={Routes.Home} component={Landing} />
                        <Route
                            exact
                            path={Routes.Contact}
                            component={Contact}
                        />
                        <RestrictedRoute
                            exact
                            path={Routes.Register}
                            component={Register}
                        />
                         <Route exact path={Routes.Profile}>
                            <Profile
                                name="John Smith"
                                rating="4.65"
                                books={[]}
                            />
                        </Route>
                        <RestrictedRoute
                            exact
                            path={Routes.Login}
                            component={Login}
                        />
                        <Route exact path={Routes.Contact} component={Contact} />
                        <Route exact path={Routes.Book} component={Book} />
                        <Route exact path={Routes.Books} component={Books} />
                        <Route path={Routes.Search} component={Search} />
                        {/* Private Routes */}
                        <PrivateRoute path={Routes.Profile} component={Profile} />
                        {/* Admin Routes */}
                        <AdminRoute exact path={Routes.Admin} component={Admin} />

                    </Switch>
                </div>
                <Alert />
                <Footer />
            </Router>
        </div>
        // </Provider>
    );
}
export default App;
