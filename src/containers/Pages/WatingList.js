import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
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
    title: "Schemecode",
    dataIndex: "schemeCode",
    render: (text, record) => {
      return (
        <Space size="middle">
          {record?.scheme?.schemeName}-{record?.scheme?.schemeCode}
        </Space>
      );
    },
  },
  {
    title: "App ref No",
    dataIndex: "appReference",
  },

  {
    title: "Category",
    width: 100,
    dataIndex: "category_code",
  },
  {
    title: "Income Group",
    dataIndex: "currentAddress",
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
};
const { Search } = Input;

const WaitingList = () => {
  const history = useHistory();
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  const [lottoryEvent, setLottoryEvent] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [lottoryName, setLottoryName] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: +1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getLottoryEvent();
    getSchemeData(lottoryName);
    // getSchemeByLottoryName(lottoryName);
    // eslint-disable-next-line no-use-before-define
  }, [lottoryName]);

  const getLottoryEvent = () => {
    setIsLoading(true);
    Axios.get("http://94.237.3.166:8089/postlmhada/getAllLottery").then(
      (result) => {
        console.log("scheme", result);
        const LottoryEvent = result.data.map((cvalue) => {
          return {
            label: cvalue.lotteryName,
            value: cvalue.lotteryName,
          };
        });
        setLottoryEvent(LottoryEvent);
      }
    );
  };

  const getSchemeData = (lottoryName) => {
    setIsLoading(true);
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getSchemeByLotteryId/${lottoryName}`
    ).then((result) => {
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
        getCustomerData();
      }
    },

    //getCustomerData(selectedScheme);
    [selectedCode, , pagination.pageNumber]
  );

  const getCustomerData = () => {
    //debugger;
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getAllWaitingCustomers?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id&mhadaUserName=d`
    ).then((result) => {
      if (result && result.data.content) {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data.content);
        setPagination({
          pageNumber: result.data.pageable.pageNumber || 1,
          pageSize: result.data.pageable.pageSize || 10,
          total: result.data.totalElements || 0,
        });

        console.log("result", result);
      }
    });
    console.log("result");
    //debugger;
  };

  const getCustomerDataByScheme = (selectedCode) => {
    setIsLoading(true);
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getAllWaitingCustomersBySchemeCode/${selectedCode}?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id`
    )
      .then((result) => {
        if (result && result.data.content) {
          console.log("reult", result);
          if (result && result.data.content) {
            console.log("result123", result);
            setData(result.data.content);
            setPagination({
              pageNumber: result.data.pageable.pageNumber,
              pageSize: result.data.pageable.pageSize,
              total: result.data.totalElements,
            });
          }
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        setData([]);

        console.log(error?.response?.data?.error);
        onError(error?.response?.data?.error || "Waiting Schemedata");
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
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getWaitingCustomersBySearch?inputString=${text}`
    ).then((result) => {
      setData(result.data.content);
      setIsLoading(false);
      console.log("result", text, result);
    });
  };
  const onClear = () => {
    getCustomerData();
    //setIsModalVisible(false);
  };
  const handleChange = (cvalue) => {
    console.log(`selected ${cvalue}`);
  };
  console.log("scheme", lottoryEvent);
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Input.Group compact>
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
        </Input.Group>
        <br />
        <Input.Group compact>
          Scheme code:
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
        </Input.Group>
      </div>
      <div className={classes.table}>
        <Search
          placeholder="Search by id"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          onClear={onClear}
          style={{ width: 300, marginBottom: "10px" }}
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
            onClick={() => history.push("/activateapplicantlist")}
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
