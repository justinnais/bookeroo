import React, { Component } from 'react';
import './styles/App.scss';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddPerson from './components/Persons/AddPerson';
// import { Provider } from "react-redux";
// import store from "./store";

import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';

function App() {
  return (
    // <Provider store={store}>
    <Router>
      <div className='App'>
        <Header />
        {
          //Public Routes
        }

        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />

        {
          //Private Routes
        }
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/addPerson' component={AddPerson} />
      </div>
    </Router>
    // </Provider>
  );
}
export default App;
