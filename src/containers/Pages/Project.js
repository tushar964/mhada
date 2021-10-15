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
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Project = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  useEffect(() => {
    getSchemeData();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const getSchemeData = () => {
    setIsLoading(true);
    Axios.get("http://94.237.3.166:8089/postlmhada/getAllScheme").then(
      (result) => {
        console.log("scheme", result);
        // setSchemeData(newSchemeData);

        const newSchemeData = result.data.map((cvalue) => {
          return {
            label: cvalue.schemeCode,
            value: cvalue.schemeCode,
            // label: cvalue.schemeName,
            // value: cvalue.schemeName,
          };
        });
        console.log("newSchemeData", newSchemeData);
        setSchemeData(newSchemeData);
        // const action = { type: "ADD_SCHEMEDATA", payload: newSchemeData };
        // dispatch(action);

        setIsLoading(false);
      }
    );
  };

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
          Scheme code:
          <Select
            defaultValue=""
            style={{ width: "20%" }}
            options={schemeData}
            showSearch
            allowClear={true}
          >
            {/* <Option value="schemeCode">schemeCode</Option>
            //<Option value="Sign In">Sign In</Option> */}
          </Select>
          {/* <AutoComplete
          style={{ width: "70%" }}
          placeholder="Email"
          options={[{ value: "text 1" }, { value: "text 2" }]}
        /> */}
        </Input.Group>
        <br />
        <Input.Group compact>
          Mhada User:
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
        <Button>Show</Button>
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
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default Project;
