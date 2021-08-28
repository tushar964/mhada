import React, { useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";
import MenuBar from "../components/Layout/Menu";
import AddUser from "../containers/Pages/AddUser";
import Application from "../containers/Application";
import Project from "../containers/Pages/Project";
import ViewUser from "../containers/Pages/ViewUser";
import SchemeDetails from "../containers/Pages/SchemeDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/menu">
          <MenuBar />
        </Route>

        <Route path="/project">
          <Project />
        </Route>
        <Route path="/application">
          <Application />
        </Route>
        <Route path="/adduser">
          <AddUser />
        </Route>
        <Route path="/viewuser">
          <ViewUser />
        </Route>
        <Route path="/schemedetails">
          <SchemeDetails />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
