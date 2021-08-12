import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space } from "antd";
import { Button, Modal } from "antd";
import { Form, Input, InputNumber } from "antd";
import { AutoComplete } from "antd";

import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import { CallMissedSharp } from "@material-ui/icons";
import classes from "./styles.module.css";
const { Option } = AutoComplete;

const Application = () => {
  const [result, setResult] = useState([]);

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "163.com", "qq.com"].map(
        (domain) => `${value}@${domain}`
      );
    }

    setResult(res);
  };
  const columns = [
    {
      title: "Applicant Id",
      dataIndex: "number",
    },
    {
      title: " Applicant Name",
      dataIndex: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" onClick={showModal}>
          <a>
            <Link to={"application/" + record.id}>Edit</Link>
          </a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      number: 1,
      name: "John Brown",
      mobile: 8574569854,
      email: "trf@ghao.cv",
      status: "process",
      action: "Edit",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  // const Demo = () => {
  //   const onFinish = (values) => {
  //     console.log(values);
  //   };
  // };
  return (
    <>
      <Header />
      <MenuBar />
      <AutoComplete
        style={{
          width: 200,
        }}
        onSearch={handleSearch}
        placeholder="Search"
      >
        {result.map((email) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>

      <Button className={classes.btn} type="primary">
        Enter
      </Button>

      <Button type="small">All Records</Button>
      <div>
        <div className={classes.container}>
          {data.map((record) => (
            <Table columns={columns} dataSource={data} size="middle" />
          ))}
        </div>
        <Modal
          title="Applicant Form"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...layout}
            name="nest-messages"
            // onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "mobile"]}
              label="Mobile"
              rules={[
                {
                  type: "number",
                  // min: 0,
                  // max: 10,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["user", "status"]} label="Status">
              <Input />
            </Form.Item>
            <Form.Item name={["user", "remark"]} label="Remark">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                <Link>Save</Link>
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Application;
