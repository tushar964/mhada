import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Space, Tag, Modal, Button, Form, Input, Select } from "antd";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./styles.module.css";

const { Option } = Select;
const { Search } = Input;

const Application = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    //debugger;
    Axios.get("http://94.237.3.166:8080/mhada/getAllCustomers").then(
      (result) => {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data);
        if (localStorage.getItem("Username") === "admin") {
          setTableData(result.data);
        } else {
          //setData([result.data[0]]);
        }

        console.log("result", result);
      }
    );
    console.log("yu", "result");
    //debugger;
  }, []);

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
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Applicant Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "emailId",
      key: "email",
    },
    {
      title: "status",
      dataIndex: "activeFlag",
      key: "activeFlag",
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
    const newDataSource = data.map((item) => {
      if (item.key === form.getFieldsValue().key) {
        return form.getFieldsValue();
      } else {
        return item;
      }
    });
    setData(newDataSource);
    setIsModalVisible(false);
    console.log("rt", newDataSource, "newDataSource");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (text) => {
    if (!isNaN(text)) {
      const newData = data.filter((item) => item.key === parseInt(text));
      console.log("text:", newData);
      setTableData(newData);
    }
    setSearchText(text);
  };
  console.log("tableData:", tableData);
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <div className={classes.table}>
          <Search
            placeholder="Search by id+"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: "10px" }}
          />
          <Table
            dataSource={
              searchText
                ? tableData.filter((item) => item?.key === parseInt(searchText))
                : tableData
            }
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
          <Form.Item label="Id" name="key" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="customerName"
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
            name="mobileNo"
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
            name="emailId"
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
            name="activeFlag"
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
              <Option value="Y">Y</Option>
              <Option value="R">R</Option>
              {/* <Option value="Rejected">Rejected</Option> */}
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
