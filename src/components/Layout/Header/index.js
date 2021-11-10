import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../../../services/api";
//import { useAuth } from "../../../containers/Pages/Auth";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import mhadaImage from "../../../img/mhada.jpg";
import classes from "./styles.module.css";

const Header = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [form] = Form.useForm();
  //const { setAuthTokens } = useAuth();

  const history = useHistory();
  const [error, setError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handle = () => {
  //   localStorage.setItem("Username", JSON.stringify(response.data));
  //   localStorage.setItem("Password", JSON.stringify(response.data));
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("history", props.history);
    //
    // if (item.key === form.getFieldsValue().key) {
    //   return form.getFieldsValue();
    // } else {
    //   return item;
    // }

    // localStorage.setItem("person", JSON.stringify(person)); //stringify object and store
    // var retrievedPerson = JSON.parse(localStorage.getItem("person")); //retrieve the object

    api
      .post("/login", {
        // id: form.getFieldsValue().id,
        userName: form.getFieldsValue().userName,
        password: form.getFieldsValue().password,
      })
      .then(function (response) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        // localStorage.setItem("password", JSON.stringify(response.data));

        console.log("response", response.data);
        if (response.status === 200) {
          setLoggedIn(true);
          //localStorage.setItem("response.data", JSON.stringify(response.data));
          //const userData = JSON.parse(localStorage.getItem("response.data")); //retrieve the object
          // window.location = "/dashboard";
          props.history.push("/dashboard");
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <header className={classes.header}>
        <img className={classes.logo} src={mhadaImage} />
        <h3>MHADA LOTTORY</h3>

        {props.page === "login" ? (
          <Button type="link" onClick={showModal}>
            Login
          </Button>
        ) : (
          <Button type="link" onClick={() => history.push("/login")}>
            Logout
          </Button>
        )}
        <Modal
          title="Login"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {error && <div>Invali credentials</div>}
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </header>
    </>
  );
};

export default Header;
