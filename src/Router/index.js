import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";
import MenuBar from "../components/Layout/Menu";
import Boards from "../containers/Pages/Boards";
import Application from "../containers/Application";
import Project from "../containers/Pages/Project";
import Form from "../containers/Pages/Form";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/menu">
          <MenuBar />
        </Route>
        <Route path="/boards">
          <Boards />
        </Route>
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/application">
          <Application />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
