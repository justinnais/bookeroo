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
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import Footer from "./components/Layout/Footer";

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
    return (
        // <Provider store={store}>
        <div className="page-container">
            <Router>
                <Header />
                <div className={classes.content}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/addPerson" component={AddPerson} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
        // </Provider>
    );
}
export default App;
