import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../services/api";
import { SettingOutlined } from "@ant-design/icons";
import {
  Input,
  Collapse,
  Row,
  Select,
  Table,
  Form,
  Space,
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

const columns = [
  {
    title: "S.N.",
    width: 100,
    dataIndex: "id",
  },
  {
    title: "App Refrence",
    dataIndex: "appReference",
  },
  {
    title: "CustomerName",
    dataIndex: "customerName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Address",
    dataIndex: "currentAddress",
  },
  {
    title: "Category",
    width: 100,
    dataIndex: "categoryCode",
    render: (text, record) => {
      return (
        <Space size="middle">
          {record?.categoryCode}-{record?.categoryName}
        </Space>
      );
    },
  },
  {
    title: "Scheme ",
    width: 150,
    dataIndex: "schemeCode",
    render: (text, record) => {
      return (
        <Space size="middle">
          {record?.scheme?.schemeCode}
          {record?.scheme?.schemeName}
        </Space>
      );
    },
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
    title: "Status",
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
const { Search } = Input;
const Project = () => {
  const history = useHistory();
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [lottoryName, setLottoryName] = useState(null);
  const [lottoryEvent, setLottoryEvent] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });
  useEffect(() => {
    getLottoryEvent();
    getSchemeData(lottoryName);
    // eslint-disable-next-line no-use-before-define
  }, [lottoryName]);

  const getLottoryEvent = () => {
    setIsLoading(true);
    api.get("/getAllLottery").then((result) => {
      console.log("scheme", result);
      const LottoryEvent = result.data.map((cvalue) => {
        return {
          label: cvalue.lotteryName,
          value: cvalue.lotteryName,
        };
      });
      setLottoryEvent(LottoryEvent);
    });
  };

  const getSchemeData = (lottoryName) => {
    setIsLoading(true);
    api.get(`/getSchemeByLotteryId/${lottoryName}`).then((result) => {
      console.log("scheme", result);
      // setSchemeData(newSchemeData);

      const newSchemeData = result.data.map((cvalue) => {
        return {
          label: "#" + cvalue.schemeCode + "-" + cvalue.schemeName,
          value: cvalue.schemeCode,
        };
      });
      console.log("newSchemeData", newSchemeData);
      setSchemeData(newSchemeData);
      // const action = { type: "ADD_SCHEMEDATA", payload: newSchemeData };
      // dispatch(action);

      setIsLoading(false);
    });
  };
  useEffect(
    () => {
      console.log("selectedCode", selectedCode);
      if (lottoryName) {
        getCustomerDataByScheme(selectedCode);
      } else {
        getCustomerData();
      }
    },

    //getCustomerData(selectedScheme);
    [pagination.pageNumber]
  );

  const getCustomerData = () => {
    //debugger;
    api
      .get(
        `/getAllWaitingCustomers?pageNo=${
          pagination?.pageNumber - 1
        }&pageSize=${pagination?.pageSize}&sortBy=id&mhadaUserName=d`
      )
      .then((result) => {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data.content);
        setPagination({
          pageNumber: result.data.pageable.pageNumber + 1 || 1,
          pageSize: result.data.pageable.pageSize || 10,
          total: result.data.totalElements || 0,
        });

        console.log("result", result);
      });
    console.log("result");
    //debugger;
  };

  const getCustomerDataByScheme = (selectedCode) => {
    setIsLoading(true);
    api
      .get(
        `/getAllWaitingCustomersBySchemeCode/${selectedCode}?pageNo=${
          pagination?.pageNumber - 1
        }&pageSize=${pagination?.pageSize}`
      )
      .then((result) => {
        console.log("result123", result);
        if (result && result.data.content) {
          setData(result.data.content);
          setPagination({
            pageNumber: result.data.pageable.pageNumber + 1 || 1,
            pageSize: result.data.pageable.pageSize || 10,
            total: result.data.totalElements || 0,
          });
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setData([]);

        console.log(error?.response?.data?.error);
        //onError(error?.response?.data?.error || "Waiting Schemedata");
        setIsLoading(false);
      });
  };

  const handleSearch = (text) => {
    //setSearchText(text.trim());
    console.log(text + "---on search---");
    api
      .get(`/getWaitingCustomersBySearch?inputString=${text}`)
      .then((result) => {
        setData(result.data.content);
        setIsLoading(false);
        console.log("result", text, result);
      });
  };
  const onClear = () => {
    //getCustomerData();
    //setIsModalVisible(false);
  };
  const onChange = () => {
    console.log("dfd");
    getCustomerDataByScheme(selectedCode);
  };
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
        <Form.Item compact>
          Lottort Event:
          <Select
            style={{ width: "200px" }}
            defaultValue=""
            options={lottoryEvent}
            allowClear={true}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setLottoryName(cvalue);
            }}
          ></Select>
          {/* <Cascader
          style={{ width: "70%" }}
          options={options}
          placeholder="Select Address"
        /> */}
        </Form.Item>
        <Form.Item compact>
          Scheme :
          <Select
            defaultValue=""
            style={{ width: "200px" }}
            options={schemeData}
            showSearch
            allowClear={true}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setSelectedCode(cvalue);
            }}
          >
            {/* <Option value="schemeCode">schemeCode</Option>
            //<Option value="Sign In">Sign In</Option> */}
          </Select>
        </Form.Item>
        <Form.Item compact>
          <Button
            type="primary"
            onClick={onChange}
            style={{ marginRight: "50px" }}
          >
            Search
          </Button>
        </Form.Item>
      </div>
      <div className={classes.table}>
        <Search
          placeholder="Search by id"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          onClear={onClear}
          //style={{ width: 300, marginBottom: "10px" }}
          style={{ width: 300, marginLeft: "120px", marginBottom: "10px" }}
        />

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "calc(500px + 50%)", y: 400 }}
          loading={isLoading}
          onChange={(page) => {
            console.log("pagination", pagination);
            setPagination({
              ...pagination,
              pageNumber: page.current,
              // pageSize: pagination.pageSize,
              // total: pagination.total,
            });
          }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: pagination?.pageSize,
            defaultCurrent: pagination?.pageNumber,
            current: pagination?.pageNumber,
            total: pagination?.total,
          }}
          //loading={isLoading}
        />
        <div className={classes.container}>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            onClick={() => history.push(`/waitinglist?scheme=${selectedCode}`)}
          >
            Operate Waiting List
          </Button>
          <Button onClick={() => history.push("/homepage")}>cancel</Button>
        </div>
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default Project;
