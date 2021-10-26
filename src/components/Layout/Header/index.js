import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import mhadaImage from "../../../img/mhada.jpg";
import classes from "./styles.module.css";

const Header = (props) => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [form] = Form.useForm();
  const handle = () => {
    localStorage.setItem("Username", "admin");
    localStorage.setItem("Password", "admin");
  };

  const history = useHistory();
  const [error, setError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

    Axios.post(" http://94.237.3.166:8089/postlmhada/login", {
      // id: form.getFieldsValue().id,
      userName: form.getFieldsValue().userName,
      password: form.getFieldsValue().password,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.status === 200) {
          //localStorage.setItem("Username", "admin");
          window.location = "/dashboard";
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
