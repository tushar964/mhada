import React from "react";
import { Link } from "react-router-dom";
import { Menu, Switch, Divider } from "antd";
import Header from "../../components/Layout/Header";
import Boards from "../Pages/Boards";
import MenuBar from "../../components/Layout/Menu";

const Dashboard = () => {
  return (
    <>
      <Header />
      <MenuBar />
    </>
  );
};

export default Dashboard;
