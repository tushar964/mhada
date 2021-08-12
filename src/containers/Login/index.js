import React from "react";
import Header from "../../components/Layout/Header";
import classes from "./styles.module.css";

const Login = () => {
  return (
    <>
      <Header page="login" />
      <div className={classes.container}>
        <h1>Welcome to mhada</h1>
      </div>
    </>
  );
};

export default Login;
