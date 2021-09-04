// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import { Table, Space, Tag, Modal, Button, Form, Input, Select } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import Header from "../../components/Layout/Header";
// import MenuBar from "../../components/Layout/Menu";
// import classes from "./ViewUser.module.css";

// const { Option } = Select;
// const { Search } = Input;
// const { confirm } = Modal;

// const ViewUser = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [form] = Form.useForm();

//   const formRecord = React.createRef();

//   // useEffect = () => {
//   //   // let id = props.match.params.id;
//   Axios.get(`http://94.237.3.166:8080/mhada/user/{id}`).then((e) => {
//     formRecord.current.setFieldsValue({
//       name: e.data.name,
//       mobile: e.data.mobile,
//       email: e.data.email,
//       // cus_car_number: e.data.cus_car_number,
//       // cus_band: e.data.cus_band,
//       // cus_address: e.data.cus_address,
//     });
//     console.log("formRecord", data);
//   });

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const columns = [
//     // {
//     //   title: "Application Id",
//     //   dataIndex: "id",
//     //   key: "id",
//     // },
//     {
//       title: " Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Mobile",
//       dataIndex: "mobile",
//       key: "mobile",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },

//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <a onClick={() => onEdit(record)}>Edit</a>
//           <a onClick={() => showDeleteConfirm(record)}>Delete</a>
//         </Space>
//       ),
//     },
//   ];

//   const onEdit = (record) => {
//     form.setFieldsValue(record);
//     setIsModalVisible(true);
//   };

//   const onFinish = (values) => {
//     console.log("Success:", values);
//     const newDataSource = formRecord.map((item) => {
//       if (item.id === form.getFieldsValue().id) {
//         return form.getFieldsValue();
//       } else {
//         return item;
//       }
//     });
//     setData(newDataSource);
//     setIsModalVisible(false);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const onSearch = (text) => {
//     console.log("text:", text);
//     setSearchText(text);
//   };

//   const showDeleteConfirm = () => {
//     confirm({
//       title: "Are you sure delete this task?",
//       icon: <ExclamationCircleOutlined />,
//       content: "Some descriptions",
//       okText: "Yes",
//       okType: "danger",
//       cancelText: "No",
//       onOk() {
//         console.log("OK");
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   return (
//     <>
//       <Header />
//       <MenuBar />
//       <div className={classes.container}>
//         <div className={classes.table}>
//           <Search
//             placeholder="input search text"
//             allowClear
//             enterButton="Search"
//             onSearch={onSearch}
//             style={{ width: 300, marginBottom: "10px" }}
//           />
//           <Table
//             dataSource={data.filter(
//               (item) => item.email.indexOf(searchText) > -1
//             )}
//             columns={columns}
//             rowKey={(row) => row.id}
//             bordered
//             size="middle"
//             scroll={{ x: "calc(700px + 50%)", y: 400 }}
//             // loading={isLoading}
//           />
//         </div>
//       </div>
//       <Modal
//         title="Edit"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           ref={formRecord}
//           name="basic"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           layout="vertical"
//           form={form}
//         >
//           <Form.Item label="Id" name="id" hidden>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your name!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Mobile"
//             name="mobile"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your mobile!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Remark"
//             name="remark"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update
//             </Button>
//             {/* <Button onClick={showDeleteConfirm} type="dashed">
//               Delete
//             </Button> */}
//           </Form.Item>
//         </Form>
//       </Modal>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//     </>
//   );
// };

// export default ViewUser;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Table,
  Space,
  Modal,
} from "antd";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./ViewUser.module.css";
const { Column, ColumnGroup } = Table;
const { Search } = Input;

const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );
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
            Add user
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
              name="firstname"
              label="First Name"
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
              name="lastname"
              label="Last Name"
              //tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
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
              name="phone"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="residence"
              label="Address"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              //tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pincode"
              label="Pincode"
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
              name="username"
              label="Username"
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
              label="Password"
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
              label="Confirm Password"
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
              name="select"
              label="Role"
              hasFeedback
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select placeholder="Please Specify">
                <Option value="superadmin">Super Admin</Option>
                <Option value="admin">Admin</Option>
                <Option value="autherizedofficers">Autherized Officers</Option>
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
        </Modal>
      </div>
    </>
  );
};
export default ViewUser;
