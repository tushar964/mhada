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
  Radio,
  Divider,
  Space,
  message,
  Button,
  Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./Project.module.css";
const { Option } = Select;
const { Panel } = Collapse;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const { Search } = Input;

const WaitingList = () => {
  const history = useHistory();
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  const [lottoryEvent, setLottoryEvent] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [lottoryName, setLottoryName] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const url = history.location.search.replace("?scheme=", "");
    setSelectedCode(url);
    getCustomerDataByScheme(url);
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

      const newSchemeData = result.data.map((cvalue) => {
        return {
          label: "#" + cvalue.schemeCode + "-" + cvalue.schemeName,
          value: cvalue.schemeCode,
        };
      });

      // console.log("newSchemeData", result);
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
        // getCustomerData();
      }
    },

    //getCustomerData(selectedScheme);
    [pagination.pageNumber]
  );

  // const getCustomerData = () => {
  //   //debugger;
  //   Axios.get(
  //     `http://94.237.3.166:8089/postlmhada/operateWaitingList/${selectedCode}?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id&mhadaUserName=d`
  //   ).then((result) => {
  //     if (result && result.data.content) {
  //       console.log("lllll", localStorage.getItem("Username"));
  //       setData(result.data.content);
  //       setPagination({
  //         pageNumber: result.data.pageable.pageNumber || 1,
  //         pageSize: result.data.pageable.pageSize || 10,
  //         total: result.data.totalElements || 0,
  //       });

  //       console.log("result", result);
  //     }
  //   });
  //   console.log("result");
  //   //debugger;
  // };

  const getCustomerDataByScheme = (selectedCode) => {
    setIsLoading(true);
    api
      .get(
        `/operateWaitingList/${selectedCode}?pageNo=${
          pagination?.pageNumber - 1
        }&pageSize=${pagination?.pageSize}`
      )
      .then((result) => {
        console.log("result123", result);
        if (result && result.data) {
          setCustomerData(result.data);
          setPagination({
            pageNumber: result.data.pageable.pageNumbe + 1 || 1,
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
  const onError = (error) => {
    message.error(error);
  };
  <SettingOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />;
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
  const handleChange = (cvalue) => {
    console.log(`selected ${cvalue}`);
  };
  console.log("scheme", customerData);
  console.log("history", history);
  console.log("history", history.location.search);

  const onChange = () => {
    getCustomerDataByScheme(selectedCode);
  };

  const columns = [
    {
      title: "S.N.",
      width: 50,
      dataIndex: "id",

      // key: "id",

      // label: "Sr No",
      // render: (value, item, inn) => {
      //   return (pagination.pageNumber - 1) * 10 + (inn + 1); //(pagination.pageNumber - 1) * 10 + inn + 1;
      // },
    },
    {
      title: "CustomerName",
      width: 150,
      dataIndex: "customerName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Schemecode",
      width: 200,
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
      title: "App Refrence",
      width: 100,
      dataIndex: "appReference",
    },

    {
      title: "Category",
      width: 150,
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
      title: "In.Group",
      width: 100,
      // dataIndex: "currentAddress",
    },

    {
      title: "Action",
      width: 150,
      dataIndex: "status",
    },
  ];
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Form.Item compact>
          Lottory Event:
          <Select
            // defaultValue=""
            style={{ width: "200px" }}
            options={lottoryEvent}
            allowClear={true}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setLottoryName(cvalue);
            }}
          ></Select>
        </Form.Item>

        <Form.Item compact>
          Scheme :
          <Select
            showSearch
            style={{ width: "250px" }}
            // onChange={handleChange}
            allowClear={true}
            options={schemeData}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setSelectedCode(cvalue);
            }}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button
            // options={schemeData}
            type="primary"
            htmlType="submit"
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
          dataSource={customerData}
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
            onClick={() =>
              history.push(`/activateapplicantlist?scheme=${selectedCode}`)
            }
          >
            ACTIVATE WAIT LIST
          </Button>
          <Button>cancel</Button>
        </div>
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default WaitingList;
