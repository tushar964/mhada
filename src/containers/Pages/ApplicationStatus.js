import React, { useState, useEffect } from "react";
import Axios from "axios";
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
import api from "../../../src/services/api";

const { Option } = Select;
const { Search } = Input;

// const field = [
//   { label: "Application Id", value: "appReference" },
//   { label: "Applicant Name", value: "customerName " },
//   { label: "Mobile", value: "mobileNo" },
//   { label: "Email", value: "emailId" },
//   { label: "status", value: "status" },
// ];

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
  const [pagination, setPagination] = useState({
    pageNumber: 1,
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

        const newSchemeData = result.data.map((cvalue) => {
          return {
            label: cvalue.schemeCode,
            value: cvalue.schemeCode,
          };
        });

        console.log("newSchemeData", result);
        setSchemeData(newSchemeData);
        // const action = { type: "ADD_SCHEMEDATA", payload: newSchemeData };
        // dispatch(action);

        setIsLoading(false);
      }
    );
  };

  //   useEffect(() => {
  //       if(selectedCode)
  //     getCustomerData();
  //   }, [pagination.pageNumber]);

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
    [selectedCode, pagination.pageNumber]
  );

  const getCustomerData = () => {
    setIsLoading(true);
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getAllCustomers?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id`
    ).then((result) => {
      console.log("result", result);

      //   console.log("lllll", localStorage.getItem("Username"));
      setTableData(result.data.content);
      setPagination({
        pageNumber: result.data.pageable.pageNumber || 1,
        pageSize: result.data.pageable.pageSize || 10,
        total: result.data.totalElements || 0,
      });
      setIsLoading(false);
    });
  };

  useEffect(
    () => {
      console.log("selectedCode", selectedCode);
      if (selectedCode) {
        getCustomerDataByScheme(selectedCode);
      } else {
        // getCustomerData();
      }
    },

    //getCustomerData(selectedScheme);
    [selectedCode]
  );

  const getCustomerDataByScheme = (selectedCode) => {
    setIsLoading(true);
    Axios.get(
      `http://94.237.3.166:8089/postlmhada/getCustomersBySchemeCode/${selectedCode}?pageNo=${pagination?.pageNumber}&pageSize=${pagination?.pageSize}&sortBy=id`
    )
      .then((result) => {
        console.log("reult", result);
        if (result && result.data.content) {
          console.log("result123", result);
          setTableData(result.data.content);
          setPagination({
            pageNumber: result.data.pageable.pageNumber,
            pageSize: result.data.pageable.pageSize,
            total: result.data.totalElements,
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
    // {
    //   title: "Application Id",
    //   dataIndex: "appReference",
    //   key: "appReference",
    //   label: "Application Id",
    // },
    // {
    //   title: "Applicant Name",
    //   dataIndex: "customerName",
    //   label: "Applicant Name",
    // },
    // {
    //   title: "Mobile",
    //   dataIndex: "mobileNo",
    //   label: "Mobile",
    // },

    // {
    //   title: "status",
    //   dataIndex: "status",
    //   label: "status",
    //   render: (text, record) => {
    //     return <Tag color="red">{text}</Tag>;
    //   },
    // },
    //
    {
      title: "Application Id",
      dataIndex: "id",
      key: "id",
      label: "Application Id",
    },
    {
      title: "Applicant Name",
      dataIndex: "customerName",
      label: "Applicant Name",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      label: "Mobile",
    },
    {
      title: "Email",
      dataIndex: "emailId",
      label: "Email",
    },
    {
      title: "Scheme Name",
      dataIndex: "mhadaUserName",
      width: 250,
      render: (text, record) => {
        return <Space size="middle">{record?.scheme?.schemeName}</Space>;
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
      title: "Action",
      key: "action",
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
    getCustomerData();
    setIsModalVisible(false);
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
      })
      .then((result) => {
        console.log("rt", result, "newDataSource");
        getCustomerDataByScheme();
        setIsModalVisible(false);
        setIsLoading(false);
      });

    setData(newDataSource);
    setIsModalVisible(false);
    //console.log("rt", newDataSource, "newDataSource");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (text) => {
    console.log("text", text.trim());
    if (text.trim() !== "") {
      console.log("ggggggggg");
      const newData = data.filter(
        (item) =>
          item.appReference.indexOf(text) > -1 ||
          item.customerName.indexOf(text) > -1 ||
          item.mobileNo.indexOf(text) > 1 ||
          item.emailId.indexOf(text) > 1 ||
          item.status === text
      );
      //console.log("text:", newData);
      setTableData(newData);
      console.log("newData", newData);
    } else {
      if (localStorage.getItem("Username") === "admin") {
        setTableData(data);
      } else {
      }
    }
    //setSearchText(text);
  };

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
    form.setFieldsValue({ sights: [] });
  };
  //   const handleOnChange = (text) => {
  //     setIsLoading(true);
  //     setSchemeType(text);
  //     Axios.get(
  //       `http://94.237.3.166:8089/postlmhada/getCustomerBySchemeCode/${text}/?pageNo=${1}&pageSize=${10}`
  //     )

  //       .then((result) => {
  //         // console.log("result", result);
  //         setTableData([]);
  //         setTableData(result.data.content);
  //         setPagination({
  //           pageNumber: result.data.pageable.pageNumber,
  //           pageSize: result.data.pageable.pageSize,
  //           total: result.data.totalElements,
  //         });

  //         setIsLoading(false);
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         setTableData([]);
  //         console.log(error?.response?.data?.error);
  //         onError(error?.response?.data?.error);
  //         setIsLoading(false);
  //       });
  //   };
  console.log("tableData", tableData);
  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container1}>
        {/* <div className={classes.table}> */}
        <Search
          placeholder="Search by id"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          onClear={onClear}
          style={{ width: 300, marginBottom: "10px" }}
        />
        <Form.Item label="schemeCode">
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
            }}
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
      </div>
      {/* </div> */}

      <div className={classes.container}>
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey={(row) => row.id}
          bordered
          size="middle"
          scroll={{ x: "calc(700px + 50%)", y: 400 }}
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
            <Input />
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
    </>
  );
};

export default ApplicationStatus;
