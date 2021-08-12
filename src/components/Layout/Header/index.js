import React, { useState } from "react";
import { useHistory } from "react-router";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import mhadaImage from "../../../img/mhada.jpg";
import classes from "./styles.module.css";

const Header = (props) => {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("history", history);
    history.push("/dashboard");
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
          >
            <Form.Item
              label="Username"
              name="username"
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
