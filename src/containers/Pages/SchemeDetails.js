import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Input, Button, Table, Tag, Space, Modal, Form, Select } from "antd";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./SchemeDetails.module.css";
const { Column, ColumnGroup } = Table;
const { Search } = Input;

const { Option } = Select;
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

const SchemeDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formtype, setFormType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    //debugger;
    getUsersData();
    console.log("result");
    //debugger;
  }, []);

  const getUsersData = () => {
    setIsLoading(true);
    Axios.get("http://94.237.3.166:8089/postlmhada/getAllScheme").then(
      (result) => {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data);
        setIsLoading(false);
        console.log("result", result);
      }
    );
  };
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);

    setFormType("add");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  //   const onFinish = (values) => {
  //     console.log(values);
  //   };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  const onEdit = (record) => {
    const formData = {
      ...record,
      lottery: record.lottery.lotteryName,
    };
    console.log("ree", formData);
    form.setFieldsValue(formData);
    setIsModalVisible(true);
    setFormType("edit");
  };

  const onFinish = (values) => {
    console.log(values, "values");
    if (formtype === "add") {
      Axios.post(
        "http://94.237.3.166:8089/postlmhada/persistScheme",
        values
      ).then((result) => {
        getUsersData();
        setIsModalVisible(false);
      });
    } else {
      Axios.post(
        "http://94.237.3.166:8089/postlmhada/updateCustomerStatus",
        values
      ).then((result) => {
        getUsersData();
        setIsModalVisible(false);
      });
    }

    console.log("values");
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

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Search
          placeholder="Search by id"
          allowClear
          enterButton="Search"
          onSearch={onSearch}
          style={{ width: 300, marginBottom: "10px" }}
        />
        {/* <Input placeholder="Basic usage" style={{ width: 150 }} />
        <div className={classes.btn}>
          <Button type="primary">Search</Button>
        </div> */}
        <div className={classes.btn1}>
          <Button type="primary" onClick={showModal}>
            Add Scheme
          </Button>
        </div>
      </div>
      <div className={classes.table}>
        <Table dataSource={data} loading={isLoading}>
          <Column title="key" dataIndex="key" key="key" />
          <Column
            title="Lottery"
            dataIndex="lottery.lotteryName"
            render={(text, record) => (
              <Space size="middle">{record.lottery.lotteryName}</Space>
            )}
            key="lottery"
          />
          <Column title="Scheme Type" dataIndex="schemeType" key="schemeType" />

          <Column title="Scheme Code" dataIndex="schemeCode" key="schemeCode" />
          <Column title="Scheme Name" dataIndex="schemeName" key="schemeName" />
          <Column
            title="Scheme Place "
            dataIndex="schemePlace"
            key="schemePlace"
          />
          <Column title="status " dataIndex="activeFlag" key="activeFlag" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => onEdit(record)}>Edit</a>
                {/* <a>Edit</a> */}
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
        <Modal
          title={formtype === "add" ? "Add" : "Edit"}
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
              name="lottery"
              label="Lottery"
              //   onChange={(e) =>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="schemeType"
              label="Scheme Type"
              //   onChange={(e) =>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="schemeCode"
              label="Scheme code"
              //onChange={(e) =>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="schemeName"
              label="Scheme Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="schemePlace"
              label="Scheme Place"
              rules={[
                {
                  required: true,
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
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {formtype === "add" ? "Add" : "Update"}
              </Button>{" "}
              {formtype === "add" && (
                <Button type="primary" htmlType="submit">
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default SchemeDetails;
