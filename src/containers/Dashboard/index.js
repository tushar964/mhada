import React from "react";
import { Link } from "react-router-dom";
import { Menu, Switch, Divider } from "antd";
import Header from "../../components/Layout/Header";

import MenuBar from "../../components/Layout/Menu";
import classes from "./styles.module.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <h1>About mhada</h1>
      </div>
    </>
  );
};

export default Dashboard;
