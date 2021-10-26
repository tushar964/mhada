import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import {
  Input,
  Collapse,
  Row,
  Select,
  Table,
  Space,
  Switch,
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
    title: "App ref No",
    dataIndex: "appReference",
  },
  {
    title: "Applicant Name",
    dataIndex: "customerName",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Alloted Tenament",
    dataIndex: "mobileNo",
  },
  {
    title: "Scheme Code",
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
    title: "Category",
    width: 50,
    dataIndex: "categoryCode",
  },
  {
    title: "Priority",
    dataIndex: "priority",
  },
  {
    title: "Ineligable App Name",
    dataIndex: "panNumber",
  },
  {
    title: "Ineligable Ctg Code",
    dataIndex: "status",
  },
  {
    title: "Ineligable App ref No",
    dataIndex: "appReference",
  },
  {
    title: "Brodcast",
    dataIndex: "mobileNo",
  },
  {
    title: "Flat detail",
    dataIndex: "flat",
  },

  {
    title: "Action",
    dataIndex: "status",
  },
  {
    title: "Remark",
    dataIndex: "remark",
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
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const { Search } = Input;
const ActivateApplicantList = () => {
  const history = useHistory();
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [schemeData, setSchemeData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [lottoryEvent, setLottoryEvent] = useState([]);
  const [lottoryName, setLottoryName] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: +1,
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
      if (selectedCode) {
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
      console.log("lllll", localStorage.getItem("Username"));
      setData(result.data.content);
      setPagination({
        pageNumber: result.data.pageable.pageNumber || 1,
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

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <Input.Group compact>
          Post Lottery Name:
          <Select
            defaultValue=""
            style={{ width: "200px" }}
            options={lottoryEvent}
            allowClear={true}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setLottoryName(cvalue);
            }}
          />
        </Input.Group>
        <br />
        <Input.Group compact>
          Scheme code:
          <Select
            style={{ width: "250px" }}
            defaultValue=""
            allowClear={true}
            options={schemeData}
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setSelectedCode(cvalue);
            }}
          ></Select>
          {/* <Cascader
          style={{ width: "70%" }}
          options={options}
          placeholder="Select Address"
        /> */}
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
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          rowSelection={{ ...rowSelection, checkStrictly }}
          columns={columns}
          dataSource={data}
          rowKey={(row) => row.id}
          bordered
          size="middle"
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
        />
        <div className={classes.container}>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            onClick={() => history.push("/broadcastwinner")}
          >
            Broadcast Winner
          </Button>
          <Button>cancel</Button>
          <Button type="primary" style={{ marginLeft: "20px" }}>
            Reverse Action
          </Button>
        </div>
      </div>

      {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
    </>
  );
};

export default ActivateApplicantList;
