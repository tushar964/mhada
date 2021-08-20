import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Layout/Header";
import classes from "./styles.module.css";

const Login = () => {
  const history = useHistory();
  return (
    <>
      <Header page="login" history={history} />
      <div className={classes.container}>
        <h1>Welcome to mhada</h1>
      </div>
    </>
  );
};

export default Login;
