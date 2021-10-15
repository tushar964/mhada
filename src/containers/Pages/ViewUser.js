import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Table,
  Space,
  Modal,
  Form,
  Button,
  Tag,
  Popconfirm,
} from "antd";
//import { Form, Button, Modal } from "react-bootstrap";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./ViewUser.module.css";
const { Column, ColumnGroup } = Table;
const { Search } = Input;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ViewUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formtype, setFormType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [smShow, setSmShow] = useState(false);

  useEffect(() => {
    //debugger;
    getUsersData();
    console.log("result");
    //debugger;
  }, []);

  const getUsersData = () => {
    setIsLoading(true);
    Axios.get("http://94.237.3.166:8089/postlmhada/getAllUsers").then(
      (result) => {
        //console.log("lllll", localStorage.getItem("Username"));
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
  //const [form] = Form.useForm();

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

  const handleDelete = (record) => {
    //const formData = [...record];
    const formData = {
      ...record,

      //lottery: record,
    };
    Axios.post(
      "http://94.237.3.166:8089/postlmhada/deleteUsers",
      formData
    ).then((result) => {
      getUsersData();
      setIsModalVisible(false);
      console.log(result, "values");
    });
    // setData({
    //   columns: columns.filter((item) => item.id !== id),
    // });
  };

  const onEdit = (record) => {
    const formData = {
      ...record,
      //lottery: record,
    };
    console.log("ree", formData);
    form.setFieldsValue(formData);
    //mhadaUserName: form.getFieldsValue().firstname;
    setIsModalVisible(true);
    setFormType("edit");
  };

  const onFinish = (values) => {
    console.log(values, "values");
    if (formtype === "add") {
      console.log("--emailId---");
      const values = {
        mhadaUserName: form.getFieldsValue().mhadaUserName,
        emailId: form.getFieldsValue().emailId,
        age: form.getFieldsValue().age,
        mobileNo: form.getFieldsValue().mobileNo,
        pincode: form.getFieldsValue().pincode,
        address: form.getFieldsValue().address,
        designation: form.getFieldsValue().designation,
        role: form.getFieldsValue().role,
        id: form.getFieldsValue().id,
      };
      Axios.post("http://94.237.3.166:8089/postlmhada/user", values).then(
        (result) => {
          getUsersData();
          setIsModalVisible(false);
          console.log(result, "values");
        }
      );
    } else if (formtype === "edit") {
      console.log("--emailId---");

      const formData = {
        ...values,
        //lottery: record,
      };
      Axios.post(
        "http://94.237.3.166:8089/postlmhada/updateUsers",
        formData
      ).then((result) => {
        getUsersData();
        setIsModalVisible(false);
        console.log(result, "values");
      });
    }
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

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const columns = [
    {
      title: "Application Id",
      dataIndex: "id",
      key: "id",
      label: "Application Id",
    },

    {
      title: "Firstname ",
      dataIndex: "mhadaUserName",
      label: "mhadaUserName",
    },
    {
      title: "Email Id ",
      dataIndex: "emailId",
      label: "emailId",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      label: "Mobile",
    },
    // {
    //   title: "Scheme Name",
    //   dataIndex: "mhadaUserName",
    // },

    // {
    //   title: " Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    //   // render: (text, record) => {
    //   //   return <Space size="middle">{record?.flat?.floorNo}</Space>;
    //   // },
    // },
    {
      title: " Age",
      dataIndex: "age",
      // key: "age",
      // render: (text, record) => {
      //   return <Space size="middle">{record?.flat?.floorNo}</Space>;
      // },
    },
    {
      title: " Address",
      dataIndex: "address",
      // key: "address",
      // render: (text, record) => {
      //   return <Space size="middle">{record?.flat?.floorNo}</Space>;
      // },
    },
    {
      title: " PinCode",
      dataIndex: "pincode",
      // key: "pincode",
      // render: (text, record) => {
      //   return <Space size="middle">{record?.flat?.floorNo}</Space>;
      // },
    },
    {
      title: " Role",
      dataIndex: "role",
      // key: "role",
    },

    {
      title: " Designation",
      dataIndex: "designation",
      // key: "designation",
    },
    {
      title: "status",
      dataIndex: "activeFlag",
      label: "status",
      width: 150,
      render: (text, record) => {
        return <Tag color="red">{text || "Not Available"}</Tag>;
      },
    },
    {
      title: "Action",
      // key: "action",
      label: "status",
      width: 150,
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={() => onEdit(record)}>Edit</a>
            {/* <a>Edit</a> */}
            {/* <a onClick={() => onDelete(record)}>Delete</a> */}
            {/* formData.length >= 1 ? ( */}
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
            {/* ) : null, */}
          </Space>
        );
      },
    },
  ];

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
            Add New Users
          </Button>
        </div>
      </div>
      <div className={classes.table}>
        <Table
          dataSource={data}
          loading={isLoading}
          columns={columns}
          rowKey={(row) => row.id}
          bordered
          size="middle"
          scroll={{ x: "calc(700px + 50%)", y: 400 }}
          style={{ padding: "15px" }}
        />

        <Modal
          title={formtype === "add" ? "Add" : "Edit"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          //footer={null}
        >
          {/* <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        > */}
          <div className={classes.container}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
              //layout="inline"
            >
              <Form.Item
                name="mhadaUserName"
                label="Firstname"
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="id"
                label="Application Id"
                key="id"
                hidden={true}
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    //required: true,
                    message: "Please input your id!",
                    whitespace: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                name="emailId"
                label="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mobileNo"
                label="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    // type: "array",
                    required: true,
                    message: "Please select your habitual residence!",
                  },
                ]}
              >
                <Input />
                {/* <Textarea /> */}
              </Form.Item>
              <Form.Item
                name="age"
                label="Age"
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your age!",
                    //whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="pincode"
                label="pincode"
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your pincode!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userName"
                label="userName"
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="role"
                label="role"
                hasFeedback
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Please Specify">
                  <Option value="role">Super Admin</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="role">Autherized Officers</Option>
                  <Option value="appellateofficers">Appelliate Officers</Option>
                  <Option value="accounts officers">Account Officers</Option>
                  <Option value="bank">Bank</Option>
                  <Option value="3rd part agency">3rd Party Agency</Option>
                  <Option value="level1">Bank(Account)Level1</Option>
                  <Option value="level2">Bank(Account)Level2</Option>
                  <Option value="superuser">Super User</Option>
                  <Option value="clerk">Clerk</Option>
                </Select>
              </Form.Item>
              <Form.Item name="checkbox-group" label="Is Active">
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        value="A"
                        style={{ lineHeight: "32px" }}
                      ></Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="designation"
                label="Designation"
                //tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your designation!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "introduction"]}
                label="Post Lottery Event Name
                "
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default ViewUser;
