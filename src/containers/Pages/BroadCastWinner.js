import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import {
  Input,
  Collapse,
  Row,
  Select,
  Table,
  Space,
  Tag,
  Form,
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
const { Search } = Input;
const BroadCastWinner = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: +1,
    pageSize: 10,
    total: 0,
  });
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
            label: cvalue.lottery.lotteryName,
            value: cvalue.lottery.lotteryName,
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
  useEffect(
    () => {
      //console.log("selectedCode", selectedCode);

      getCustomerData();

      // getCustomerData();
    },

    //getCustomerData(selectedScheme);
    [pagination.pageNumber]
  );

  const getCustomerData = () => {
    //debugger;
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getAllCustomers?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id`
    ).then((result) => {
      if (result && result.data.content) {
        console.log("lllll", localStorage.getItem("Username"));
        setData(result.data.content);
        setPagination({
          pageNumber: result.data.pageable.pageNumber || 1,
          pageSize: result.data.pageable.pageSize || 10,
          total: result.data.totalElements || 0,
        });
      }
      console.log("result", result);
    });
    console.log("result");
    //debugger;
  };
  const handleSearch = (text) => {
    setSearchText(text.trim());
    console.log(text + "---on search---");
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getCustomersBySearch?inputString=${text}`
    ).then((result) => {
      setData(result.data.content);
      setIsLoading(false);
      console.log("result", text, result);
    });
  };
  <SettingOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />;
  const onClear = () => {
    getCustomerData();
    // setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Sr No",
      width: 100,
      dataIndex: "id",

      // key: "id",

      // label: "Sr No",
      render: (value, item, inn) => {
        return (pagination.pageNumber - 1) * 10 + (inn + 1); //(pagination.pageNumber - 1) * 10 + inn + 1;
      },
      // render: (text, record, id) => {
      //   return fromCurrentIndex(id);
      // },
    },
    {
      title: "Applicant Name",
      width: 200,
      dataIndex: "customerName",
      label: "Applicant Name",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      width: 150,
      label: "Mobile",
    },
    {
      title: "Email",
      width: 150,
      dataIndex: "emailId",
      label: "Email",
    },
    {
      title: "Scheme Name",
      dataIndex: "mhadaUserName",
      width: 200,
      render: (text, record) => {
        return (
          <Space size="middle">
            {record?.scheme?.schemeCode}-{record?.scheme?.schemeName}
          </Space>
        );
      },
    },
    // {
    //   title: "Scheme Code",
    //   dataIndex: "mhadaUserName",
    //   width: 80,
    //   render: (text, record) => {
    //     return <Space size="middle">{record?.scheme?.schemeCode}</Space>;
    //   },
    // },

    {
      title: "status",
      dataIndex: "Draw Winner",
      label: "status",
      width: 150,
      render: (text, record) => {
        return <Tag color="red">{text || "Draw Winner"}</Tag>;
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: 100,
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a onClick={() => onEdit(record)}>Edit</a>
    //     </Space>
    //   ),
    // },
  ];
  const onEdit = (record) => {
    form.setFieldsValue(record);
    // setIsModalVisible(true);
  };
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        {/* <Input.Group compact>
          Lottory Event:
          <Select
            defaultValue=""
            style={{ width: "20%" }}
            options={schemeData}
            showSearch
            allowClear={true}
          />
           
        </Input.Group> */}
        <br />
        {/* <Input.Group compact>
          Scheme code:
          <Select
            style={{ width: "20%" }}
            defaultValue=""
            options={schemeData}
            showSearch
            allowClear={true}
          />
           
        </Input.Group> */}
        <Search
          placeholder="Search by id"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          onClear={onClear}
          style={{ width: 300 }}
        />
      </div>
      <div className={classes.table}>
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
          <Button type="primary" style={{ marginRight: "20px" }}>
            Genrate Instimate
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

export default BroadCastWinner;
