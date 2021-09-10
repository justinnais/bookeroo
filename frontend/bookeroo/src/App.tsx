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
import Profile, { Book } from "./pages/Profile";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import Footer from "./components/Layout/Footer";
import { Routes } from "./routes/Routes";
import RestrictedRoute from "./routes/RestrictedRoute";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            [theme.breakpoints.up("xs")]: { paddingBottom: "65px" }, // reduce footer size on small screens
            [theme.breakpoints.down("xs")]: { paddingBottom: "56px" },
        },
    })
);

const exampleBooks: Book[] = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        condtion: "Lightly Used",
        price: "23.00",
    },
    {
        title: "The Great Gatbsy",
        condtion: "Well Worn",
        price: "16.00",
    },
];

function App() {
    const classes = useStyles();
    return (
        // <Provider store={store}>
        <div className="page-container">
            <Router>
                <Header />
                <div className={classes.content}>
                    <Switch>
                        <Route exact path={Routes.Home} component={Landing} />
                        <Route
                            exact
                            path={Routes.Contact}
                            component={Contact}
                        />
                        <Route exact path={Routes.Profile}>
                            <Profile
                                name="John Smith"
                                rating="4.65"
                                books={exampleBooks}
                            />
                        </Route>
                        <RestrictedRoute
                            exact
                            path={Routes.Register}
                            component={Register}
                        />
                        <RestrictedRoute
                            exact
                            path={Routes.Login}
                            component={Login}
                        />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
        // </Provider>
    );
}
export default App;
