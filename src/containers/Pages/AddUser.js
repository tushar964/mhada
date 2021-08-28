import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import classes from "./AddUser.module.css";
import moment from "moment";
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddUser = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const history = useHistory();

  const Save = async () => {
    let item = { name, email, address, mobile };

    let result = await fetch("http://94.237.3.166:8080/mhada/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.log("result", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/application");
  };

  // useEffect(() => {
  //   //debugger;
  //   Axios.get("http://94.237.3.166:8080/mhada/user").then((result) => {
  //     setData(result.data);
  //     console.log("result", result);
  //   });
  //   console.log("yu");
  //   //debugger;
  // }, []);

  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        return;

      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        return;

      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            value="name"
            onChange={(e) => setName(e.target.value)}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            value="address"
            onChange={(e) => setAddress(e.target.value)}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="datepicker"
            label="DOB"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              defaultValue={moment("19/08/2021", dateFormat)}
              format={dateFormat}
            />

            {/* <Input /> */}
          </Form.Item>
          <Form.Item
            name="text"
            label="Department"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            value="email"
            onChange={(e) => setEmail(e.target.value)}
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            value="mobile"
            onChange={(e) => setMobile(e.target.value)}
            rules={[
              {
                // type: "number",
                // min: 0,
                // max: 99,
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="pan card"
            label="Pan Card"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="adhar card"
            label="Adhar Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={Save} htmlType="submit">
              Save
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
