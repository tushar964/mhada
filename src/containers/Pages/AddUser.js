// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { Link, useHistory } from "react-router-dom";
// import Header from "../../components/Layout/Header";
// import MenuBar from "../../components/Layout/Menu";
// import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
// import classes from "./AddUser.module.css";
// import moment from "moment";
// const { Option } = Select;

// const dateFormat = "DD/MM/YYYY";
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const AddUser = () => {
//   const [data, setData] = useState([]);
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const history = useHistory();

//   const Save = async () => {
//     let item = { name, email, address, mobile };

//     let result = await fetch("http://94.237.3.166:8080/mhada/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(item),
//     });
//     result = await result.json();
//     console.log("result", result);
//     localStorage.setItem("user-info", JSON.stringify(result));
//     history.push("/application");
//   };

//   // useEffect(() => {
//   //   //debugger;
//   //   Axios.get("http://94.237.3.166:8080/mhada/user").then((result) => {
//   //     setData(result.data);
//   //     console.log("result", result);
//   //   });
//   //   console.log("yu");
//   //   //debugger;
//   // }, []);

//   const [form] = Form.useForm();
//   const onGenderChange = (value) => {
//     switch (value) {
//       case "male":
//         form.setFieldsValue({
//           note: "Hi, man!",
//         });
//         return;

//       case "female":
//         form.setFieldsValue({
//           note: "Hi, lady!",
//         });
//         return;

//       case "other":
//         form.setFieldsValue({
//           note: "Hi there!",
//         });
//     }
//   };

//   const onFinish = (values) => {
//     console.log(values);
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   const onFill = () => {
//     form.setFieldsValue({
//       note: "Hello world!",
//       gender: "male",
//     });
//   };

//   return (
//     <>
//       <Header />
//       <MenuBar />
//       <div className={classes.container}>
//         <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
//           <Form.Item
//             name="name"
//             label="Name"
//             value="name"
//             onChange={(e) => setName(e.target.value)}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="gender"
//             label="Gender"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               placeholder="Select a option and change input text above"
//               onChange={onGenderChange}
//               allowClear
//             >
//               <Option value="male">male</Option>
//               <Option value="female">female</Option>
//               <Option value="other">other</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.gender !== currentValues.gender
//             }
//           >
//             {({ getFieldValue }) =>
//               getFieldValue("gender") === "other" ? (
//                 <Form.Item
//                   name="customizeGender"
//                   label="Customize Gender"
//                   rules={[
//                     {
//                       required: true,
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               ) : null
//             }
//           </Form.Item>
//           <Form.Item
//             name="address"
//             label="Address"
//             value="address"
//             onChange={(e) => setAddress(e.target.value)}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="role"
//             label="Role"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="datepicker"
//             label="DOB"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <DatePicker
//               defaultValue={moment("19/08/2021", dateFormat)}
//               format={dateFormat}
//             />

//             {/* <Input /> */}
//           </Form.Item>
//           <Form.Item
//             name="text"
//             label="Department"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             value="email"
//             onChange={(e) => setEmail(e.target.value)}
//             rules={[
//               {
//                 type: "email",
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="mobile"
//             label="Mobile"
//             value="mobile"
//             onChange={(e) => setMobile(e.target.value)}
//             rules={[
//               {
//                 // type: "number",
//                 // min: 0,
//                 // max: 99,
//                 required: true,
//               },
//             ]}
//           >
//             <InputNumber />
//           </Form.Item>
//           <Form.Item
//             name="pan card"
//             label="Pan Card"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="adhar card"
//             label="Adhar Number"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item {...tailLayout}>
//             <Button type="primary" onClick={Save} htmlType="submit">
//               Save
//             </Button>
//             <Button htmlType="button" onClick={onReset}>
//               Reset
//             </Button>
//             <Button type="link" htmlType="button" onClick={onFill}>
//               Cancel
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default AddUser;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import {
  Input,
  Collapse,
  Row,
  Select,
  Table,
  Radio,
  Divider,
  Cascader,
  Upload,
  message,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./Project.module.css";
const { Option } = Select;
const { Panel } = Collapse;
const options = [
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
];

const columns = [
  {
    title: "CustomerName",
    dataIndex: "customerName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "emailId",
  },
  {
    title: "Mobile",
    dataIndex: "mobileNo",
  },
  {
    title: "Flat detail",
    dataIndex: "flat",
  },
  {
    title: "Category",
    dataIndex: "category_code",
  },
  {
    title: "Address",
    dataIndex: "currentAddress",
  },
  {
    title: "Pan Card",
    dataIndex: "panNumber",
  },
  {
    title: "Action",
    dataIndex: "status",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.customerName === "Disabled User",
  //     // Column configuration not to be checked
  //     customerName: record.customerName,
  //   }),
};

const AddUser = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);

  useEffect(() => {
    //debugger;
    Axios.get("http://94.237.3.166:8089/postlmhada/getAllCustomers").then(
      (result) => {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data);
        // if (localStorage.getItem("Username") === "admin") {
        //   setTableData(result.data);
        // } else {
        //   //setData([result.data[0]]);
        // }

        console.log("result", result);
      }
    );
    console.log("result");
    //debugger;
  }, []);

  <SettingOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />;

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Input.Group compact>
          Lottory Event:
          <Select defaultValue="" style={{ width: "20%" }}>
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          {/* <AutoComplete
          style={{ width: "70%" }}
          placeholder="Email"
          options={[{ value: "text 1" }, { value: "text 2" }]}
        /> */}
        </Input.Group>
        <br />
        <Input.Group compact>
          Scheme code:
          <Select style={{ width: "20%" }} defaultValue="">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
          {/* <Cascader
          style={{ width: "70%" }}
          options={options}
          placeholder="Select Address"
        /> */}
        </Input.Group>
      </div>
      <div className={classes.table}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          //loading={isLoading}
        />
        <div className={classes.container}>
          <Button type="primary">ACTIVATE WAIT LIST</Button>
          <Button>cancel</Button>
        </div>
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default AddUser;
