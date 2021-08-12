import React, { useState } from "react";
import { Table, Space, Tag, Modal, Button, Form, Input, Select } from "antd";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./styles.module.css";

const { Option } = Select;
const { Search } = Input;

const dataSource = [
  {
    id: "1",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "2",
    name: "Tushar",
    mobile: 121212212,
    email: "Tushar@Tushar.com",
    status: "Approved",
    remark: "",
  },
  {
    id: "3",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "4",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "5",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "6",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "7",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "8",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "9",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "10",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
  {
    id: "11",
    name: "Mike",
    mobile: 121212212,
    email: "sdsd@sdsd.com",
    status: "Pending",
    remark: "",
  },
];

const Application = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Application Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Applicant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return <Tag color="red">{text}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>Edit</a>
        </Space>
      ),
    },
  ];

  const onEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const newDataSource = dataSource.map((item) => {
      if (item.id === form.getFieldsValue().id) {
        return form.getFieldsValue();
      } else {
        return item;
      }
    });
    setData(newDataSource);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (text) => {
    console.log("text:", text);
    setSearchText(text);
  };

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <div className={classes.table}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: "10px" }}
          />
          <Table
            dataSource={data.filter(
              (item) => item.email.indexOf(searchText) > -1
            )}
            columns={columns}
            rowKey={(row) => row.id}
            bordered
            size="middle"
            scroll={{ x: "calc(700px + 50%)", y: 400 }}
          />
        </div>
      </div>
      <Modal
        title="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select status"
              // onChange={this.onGenderChange}
              allowClear
            >
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Remark"
            name="remark"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Application;
