import React, { useState, useEffect } from "react";
import Axios from "axios";

import api from "../../services/api";
import {
  Table,
  Space,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Menu,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./ApplicationStatus.module.css";

const { Option } = Select;
const { Search } = Input;

const ApplicationStatus = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [schemeType, setSchemeType] = useState("");
  const [schemeData, setSchemeData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [lottoryEvent, setLottoryEvent] = useState([]);
  const [lottoryName, setLottoryName] = useState(null);

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

  // useEffect(() => {
  //   getLottoryEvent();
  //   getSchemeData(lottoryName);
  //   // getSchemeByLottoryName(lottoryName);
  //   // eslint-disable-next-line no-use-before-define
  // }, [lottoryName]);

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

      console.log("newSchemeData", result);
      setSchemeData(newSchemeData);
      // const action = { type: "ADD_SCHEMEDATA", payload: newSchemeData };
      // dispatch(action);

      setIsLoading(false);
    });
  };

  //   useEffect(() => {
  //       if(selectedCode)
  //     getCustomerData();
  //   }, [pagination.pageNumber]);

  useEffect(
    () => {
      console.log("selectedCode", selectedCode);
      //getCustomerData();
      if (selectedCode) {
        getCustomerDataByScheme(selectedCode);
      } else {
        //getCustomerData();
      }
    },

    //getCustomerData(selectedScheme);
    [pagination.pageNumber]
  );

  const getCustomerData = () => {
    setIsLoading(true);
    api
      .get(
        `/getAllCustomers?pageNo=${pagination?.pageNumber - 1}&pageSize=${
          pagination?.pageSize
        }&sortBy=id`
      )
      .then((result) => {
        if (result && result.data.content) {
          console.log("result", result);

          //   console.log("lllll", localStorage.getItem("Username"));
          setTableData(result.data.content);
          setPagination({
            pageNumber: result.data.pageable.pageNumber + 1 || 1,
            pageSize: result.data.pageable.pageSize || 10,
            total: result.data.totalElements || 0,
          });
        }
        setIsLoading(false);
      });
  };

  // const handleTableChange = () => {
  //   getCustomerData().then((result) => {
  //     pagination.pageNumber = your_value;
  //     setPagination(pagination);
  //   });
  // };

  const getCustomerDataByScheme = (selectedCode) => {
    setIsLoading(true);
    api
      .get(
        `/getCustomersBySchemeCode/${selectedCode}?pageNo=${
          pagination?.pageNumber - 1
        }&pageSize=${pagination?.pageSize}&sortBy=id`
      )
      .then((result) => {
        console.log("reult", result);
        if (result && result.data.content) {
          setTableData(result.data.content);
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
        setTableData([]);

        console.log(error?.response?.data?.error);
        onError(error?.response?.data?.error || "Waiting Schemedata");
        setIsLoading(false);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // update status
    // Axios.post(
    //   "http://94.237.3.166:8089/postlmhada/updateCustomerStatus",
    //   values
    // ).then((result) => {
    //   getCustomerData();
    //   setIsModalVisible(false);
    // });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onError = (error) => {
    message.error(error);
  };

  const columns = [
    {
      title: "S.N.",
      width: 50,
      dataIndex: "id",

      // label: "Sr No",
      // render: (value, item, inn) => {
      //   return (pagination.pageNumber - 1) * 10 + (inn + 1); //(pagination.pageNumber - 1) * 10 + inn + 1;
      // },
    },
    {
      title: "App Refrence",
      dataIndex: "appReference",
      label: "Apprefernce No",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onHistory(record)}>{record?.appReference}</a>
        </Space>
      ),
    },
    //
    {
      title: "Applicant Name",
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
      dataIndex: "emailId",
      label: "Email",
    },
    {
      title: "Category",
      dataIndex: "categoryName ",
      width: 150,
      label: "Category",
      render: (text, record) => {
        return (
          <Space size="middle">
            {record?.categoryCode}-{record?.categoryName}
          </Space>
        );
      },
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

    {
      title: "status",
      dataIndex: "status",
      label: "status",
      width: 150,
      render: (text, record) => {
        return <Tag color="red">{text || "Not Available"}</Tag>;
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      width: 80,

      // render: (text, record) => {
      //   return <Space size="middle">{record?.scheme?.schemeCode}</Space>;
      // },
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>Edit</a>
        </Space>
      ),
    },
  ];

  const onEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const onClear = () => {
    //getCustomerData();
    setIsModalVisible(false);
  };

  const onHistory = (values) => {
    console.log("Success:", values);
    setIsLoading(true);
    const newDataSource = data.map((item) => {
      if (item.key === form.getFieldsValue().key) {
        return form.getFieldsValue();
      } else {
        return item;
      }
    });

    // update status
    api
      .post("/getCustomersHistroy", {
        mobileNo: form.getFieldsValue().mobileNo,
        status: form.getFieldsValue().status,
        remark: form.getFieldsValue().remark,
        emailId: form.getFieldsValue().emailId,
        appReference: form.getFieldsValue().appReference,
      })
      .then((result) => {
        console.log("rt", result, "newDataSource");
        //setTableData(newDataSource);
        getCustomerDataByScheme(selectedCode);
        //getCustomerData();
        setIsModalVisible(false);
        setIsLoading(false);
      });

    //setTableData(newDataSource);
    setIsModalVisible(false);
    //console.log("rt", newDataSource, "newDataSource");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setIsLoading(true);
    const newDataSource = data.map((item) => {
      if (item.key === form.getFieldsValue().key) {
        return form.getFieldsValue();
      } else {
        return item;
      }
    });

    // update status
    api
      .post("/updateCustomerStatus", {
        mobileNo: form.getFieldsValue().mobileNo,
        status: form.getFieldsValue().status,
        remark: form.getFieldsValue().remark,
        emailId: form.getFieldsValue().emailId,
        appReference: form.getFieldsValue().appReference,
      })
      .then((result) => {
        console.log("rt", result, "newDataSource");
        //setTableData(newDataSource);
        getCustomerDataByScheme(selectedCode);
        //getCustomerData();
        setIsModalVisible(false);
        setIsLoading(false);
      });

    //setTableData(newDataSource);
    setIsModalVisible(false);
    //console.log("rt", newDataSource, "newDataSource");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const onSearch = (text) => {
  //   console.log("text", text.trim());
  //   if (text.trim() !== "") {
  //     console.log("ggggggggg");
  //     const newData = data.filter(
  //       (item) =>
  //         item.appReference.indexOf(text) > -1 ||
  //         item.customerName.indexOf(text) > -1 ||
  //         item.mobileNo.indexOf(text) > 1 ||
  //         item.emailId.indexOf(text) > 1 ||
  //         item.status === text
  //     );
  //     //console.log("text:", newData);
  //     setTableData(newData);
  //     console.log("newData", newData);
  //   } else {
  //     if (localStorage.getItem("Username") === "admin") {
  //       setTableData(data);
  //     } else {
  //     }
  //   }
  //   //setSearchText(text);
  // };

  const handleSearch = (text) => {
    setSearchText(text.trim());
    console.log(text + "---on search---");
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getCustomersBySearch?inputString=${text}`
    ).then((result) => {
      setTableData(result.data.content);
      setIsLoading(false);
      console.log("result", text, result);
    });
  };
  console.log("tableData:", tableData);

  const handleChange = () => {
    getCustomerDataByScheme(selectedCode);
  };

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container1}>
        {/* <div className={classes.table}> */}

        <Form.Item label="Lottory Event">
          {/* Lottory Event: */}
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
        <Form.Item label="Scheme">
          <Select
            showSearch
            onClear={onClear}
            allowClear={true}
            style={{
              width: 200,
            }}
            options={schemeData}
            placeholder="schemeCode"
            onSelect={(cvalue, options) => {
              console.log("cvalue", cvalue, options);
              setSelectedCode(cvalue);
              // setSelectedScheme(cvalue);
            }}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button
            // options={schemeData}
            type="primary"
            htmlType="submit"
            onClick={handleChange}
          >
            Search
          </Button>
        </Form.Item>
      </div>
      {/* <div className={classes.container2}>
        <Form.Item>
          <Search
            placeholder="Search by id"
            allowClear
            enterButton="Search"
            onSearch={handleSearch}
            onClear={onClear}
            style={{ width: 300, marginLeft: "120px" }}
          />
        </Form.Item>
      </div> */}

      <div className={classes.container}>
        <Form.Item>
          <Search
            placeholder="Search by id"
            allowClear
            enterButton="Search"
            onSearch={handleSearch}
            onClear={onClear}
            style={{ width: 300, marginLeft: "140px", marginBottom: "10px" }}
          />
        </Form.Item>
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey={(row) => row.id}
          bordered
          size="middle"
          scroll={{ x: "calc(500px + 50%)", y: 400 }}
          loading={isLoading}
          onChange={(page) => {
            console.log("page", pagination);
            setPagination({
              ...pagination,
              pageNumber: page.current || 1,
              //pageNumber: page,
              //pageSize: page.current,
              // total: pagination.total,
            });
          }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: pagination?.pageSize,
            // current: 0,
            // defaultCurrent: 0,
            defaultCurrent: pagination?.pageNumber,
            current: pagination?.pageNumber,
            total: pagination?.total,
          }}
        />
        {/* <div className={classes.btn}>
          <Button htmlType="submit" type="primary">
            Save & Validate
          </Button>
        </div> */}
      </div>

      <Modal
        title="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        loading={isLoading}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
          // loading={isLoading}
        >
          <Form.Item label="Id" name="key" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Application Reference"
            name="appReference"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Name"
            name="customerName"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobileNo"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailId"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <Select allowClear>
              <Option value="POL given">POL given</Option>
              <Option value="Eligibles">Eligibles</Option>
              <Option value="NO SCRUTINY">NO SCRUTINY</Option>
              <Option value="PENDING DOCUMENT">PENDING DOCUMENT</Option>
              <Option value="INELIGIBLE">INELIGIBLE</Option>
              <Option value="REFUNDED">REFUNDED</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Remark"
            name="remark"
            rules={[
              {
                required: true,
                message: "Please input your Remark!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
};

export default ApplicationStatus;
