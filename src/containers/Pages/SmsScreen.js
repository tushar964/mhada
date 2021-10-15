import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import {
  Input,
  Collapse,
  Row,
  Select,
  Table,
  InputNumber,
  Upload,
  Form,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./Project.module.css";
const { Option } = Select;
const { Panel } = Collapse;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
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

const SmsScreen = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  // const [to, setTo] = useState("15551231234");
  // const [body, setBody] = useState("Sending SMS from React using Twilio API!");
  // const [logs, setLogs] = React.useState([]);
  const [sms, setSms] = useState("");
  const [number, setNumber] = useState("");
  // const addLog = (log) => {
  //   setLogs((prevLogs) => [...prevLogs, log]);
  // };
  // // const sendMessage = async (e) => {
  // //   /* ... */
  // // };
  // const YOUR_RAPID_API_KEY_GOES_HERE =
  //   "a6s5dfi8as5df98a5sd8f5a964sf98asd5f08asd75f9a67s4d";

  // async function getAccountId() {
  //   const response = await fetch(
  //     "https://twilio-sms.p.rapidapi.com/2010-04-01/Account",
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
  //         "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
  //       },
  //     }
  //   );
  //   const body = await response.json();
  //   console.log("getAccountId", body);

  //   return body.sid;
  // }

  // async function getAvailableNumbers(accountId) {
  //   const result = await fetch(
  //     "https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" +
  //       accountId +
  //       "/AvailablePhoneNumbers/us/Local.json",
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
  //         "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
  //       },
  //     }
  //   );
  //   const body = await result.json();
  //   console.log("getAvailableNumbers", body);

  //   return body
  //     .filter((item) => item.capabilities.SMS)
  //     .map((item) => ({
  //       number: item.phoneNumber.slice(1),
  //       display: item.friendlyName,
  //     }));
  // }

  // async function buyPhoneNumber(accountId, number) {
  //   const result = await fetch(
  //     "https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" +
  //       accountId +
  //       "/IncomingPhoneNumbers.json?phoneNumber=" +
  //       number +
  //       "&phoneNumberType=local&countryCode=us",
  //     {
  //       method: "POST",
  //       headers: {
  //         "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
  //         "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
  //         "content-type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   );

  //   const body = await result.json();
  //   console.log("buyPhoneNumber", body);

  //   return body.phoneNumber?.sid;
  // }

  // async function sendSMS(accountId, phoneId, to, msg) {
  //   to = encodeURIComponent(to);
  //   msg = encodeURIComponent(msg);

  //   const result = await fetch(
  //     "https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" +
  //       accountId +
  //       "/Messages.json?from=" +
  //       phoneId +
  //       "&body=" +
  //       body +
  //       "&to=" +
  //       to,
  //     {
  //       method: "POST",
  //       headers: {
  //         "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
  //         "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
  //         "content-type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   );

  //   const body = await result.json();
  //   console.log("sendSMS", body);

  //   return body.status;
  // }

  // async function deletePhoneNumber(accountId, phoneNumberId) {
  //   const result = await fetch(
  //     "https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" +
  //       accountId +
  //       "/IncomingPhoneNumbers/" +
  //       phoneNumberId +
  //       ".json",
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
  //         "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
  //       },
  //     }
  //   );

  //   const body = await result.json();
  //   console.log("deletePhoneNumber", body);
  // }

  // const sendMessage = async (e) => {
  //   e.preventDefault();

  //   addLog(`Getting account ID`);
  //   const accountId = await getAccountId();
  //   addLog(`Got account ID: ${accountId}`);
  //   addLog("");

  //   addLog(`Finding Phone Numbers`);
  //   const numbers = await getAvailableNumbers(accountId);
  //   addLog(`Got Phone Numbers`);
  //   addLog("");

  //   let phone;
  //   for await (const { number, display } of numbers) {
  //     addLog(`Trying to purchase ${display}`);
  //     const phoneId = await buyPhoneNumber(accountId, number);

  //     if (phoneId) {
  //       addLog(`Number purchased.`);
  //       phone = { id: phoneId, number };
  //       break;
  //     } else {
  //       addLog(`Number is unavailable, trying another.`);
  //     }
  //   }
  //   addLog("");

  //   addLog(`Sending message`);
  //   const status = await sendSMS(accountId, phone.number, to, body);
  //   addLog(`Status: ${status}`);
  //   addLog("");

  //   addLog(`Deleting phone number`);
  //   await deletePhoneNumber(accountId, phone.id);
  //   addLog(`Deleted`);
  //   addLog("");
  // };

  const sendSms = (event) => {
    event.preventDefault();

    let smsObj = {
      mobile_number: "1" + number,
      message: sms,
    };

    fetch("http://localhost:3001/sms_messages/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(smsObj),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
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

  const handleChange = (event) => {
    if (event.target.name === "number") {
      setNumber(event.target.value);
    } else if (event.target.name === "sms") {
      setSms(event.target.value);
    }
  };
  //console.log("resut", result);
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
        <div className={classes.container1}>
          <Form {...layout} onSubmit={sendSms}>
            <Form.Item
              label="Mobile :"
              name="number"
              value={number}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your PhoneNumber!",
                },
              ]}
            >
              <InputNumber />
              {/* <label htmlFor="to">To:</label>
              <input type="tel" name="to" id="to" /> */}
            </Form.Item>
            <Form.Item
              label="Message:"
              name="sms"
              value={sms}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Message!",
                },
              ]}
            >
              {/* <label htmlFor="body">Body:</label> */}
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="submit" type="primary">
                Send message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default SmsScreen;
