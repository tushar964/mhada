import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Space, Tag, Modal, Button, Form, Input, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./styles.module.css";
import api from "../../../src/services/api";

const { Option } = Select;
const { Search } = Input;

const areas = [
  { label: "AND", value: "AND" },
  { label: "OR", value: "OR" },
];
// const field = [
//   { label: "Application Id", value: "appReference" },
//   { label: "Applicant Name", value: "customerName " },
//   { label: "Mobile", value: "mobileNo" },
//   { label: "Email", value: "emailId" },
//   { label: "status", value: "status" },
// ];

// const sights = {
//   Beijing: ['Tiananmen', 'Great Wall'],
//   Shanghai: ['Oriental Pearl', 'The Bund'],
// };

const sights = {
  AND: ["Application Id", "Applicant Name", "Mobile", "Email", "status"],
  OR: ["Application Id", "Applicant Name", "Mobile", "Email", "status"],
};
const fields = {
  AND: [
    "equal",
    "not equal",
    "less",
    "less or equal",
    "greater",
    "greater or equal",
    ,
    "null",
    "is not null",
    "is in",
    "is not in",
  ],
  AND: [
    "equal",
    "not equal",
    "less",
    "less or equal",
    "greater",
    "greater or equal",
    ,
    "null",
    "is not null",
    "is in",
    "is not in",
  ],
};
const check = [
  { label: "equal", value: "equal" },
  { label: "not equal", value: "not equal" },
  { label: "less", value: "less" },
  { label: "less or equal", value: "less or equal" },
  { label: "greater", value: "greater" },
  { label: "greater or equal", value: "greater or equal" },
  { label: "null", value: "null" },
  { label: "is not null", value: "is not null" },
  { label: "is in", value: "is in" },
  { label: "is not in", value: "is not in" },
];

const Application = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const getCustomerData = () => {
    setIsLoading(true);
    api.get("/getAllCustomers").then((result) => {
      // console.log("lllll", localStorage.getItem("Username"));
      setData(result.data);
      setIsLoading(false);
      if (localStorage.getItem("Username") === "admin") {
        setTableData(result.data);
      } else {
        //setData([result.data[0]]);
      }

      // console.log("result", result);
    });
  };

  // const getCustomerData = (data) =>
  //   api.get(`/getAllCustomers/?setData=${data}`);

  useEffect(() => {
    getCustomerData();
    console.log("-----on application--");
    //debugger;

    // console.log("yu", "result");
    //debugger;
  }, []);

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

  const columns = [
    {
      title: "Application Id",
      dataIndex: "appReference",
      key: "appReference",
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
      title: "status",
      dataIndex: "status",
      label: "status",
      render: (text, record) => {
        return <Tag color="red">{text}</Tag>;
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

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   setIsLoading(true);
  //   // const newDataSource = data.map((item) => {
  //   //   if (item.key === form.getFieldsValue().key) {
  //   //     return form.getFieldsValue();
  //   //   } else {
  //   //     return item;
  //   //   }
  //   // });

  //   // update status
  //   api
  //     .post("/updateCustomerStatus", {
  //       appReference: form.getFieldsValue().appReference,
  //       status: form.getFieldsValue().status,
  //     })
  //     .then((result) => {
  //       getCustomerData();
  //       setIsModalVisible(false);
  //       setIsLoading(false);
  //     });

  //   // setData(newDataSource);
  //   setIsModalVisible(false);
  //   //console.log("rt", newDataSource, "newDataSource");
  // };

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
  console.log("tableData:", tableData);

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <div className={classes.table}>
          {/* <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.List name="field">
              {(fields, { add, remove }) => (
                <>
                  <Space
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      name="area"
                      rules={[{ required: true, message: "Missing area" }]}
                      style={{ width: 250 }}
                    >
                      <Select
                        options={areas}
                        onChange={handleChange}
                        placeholder="AND"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ width: 30 }}
                      ></Button>
                    </Form.Item>
                  </Space>
                  <Space
                    //key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item style={{ width: 200 }}>
                      <Select
                        options={field}
                        onChange={handleChange}
                        placeholder="Application Id"
                      />
                    </Form.Item>
                    <Form.Item style={{ width: 200 }}>
                      <Select
                        options={check}
                        onChange={handleChange}
                        placeholder="equal"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input />
                    </Form.Item>
                  </Space>

                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "first"]}
                        fieldKey={[fieldKey, "first"]}
                        name="area"
                        rules={[{ required: true, message: "Missing area" }]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                        style={{ width: 200 }}
                      >
                        <Select
                          options={columns}
                          onChange={handleChange}
                          placeholder="Application Id"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "last"]}
                        fieldKey={[fieldKey, "last"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                        style={{ width: 200 }}
                      >
                        <Select
                          options={columns}
                          onChange={handleChange}
                          placeholder="equal"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "last"]}
                        fieldKey={[fieldKey, "last"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" onClick={Search}>
                Find{" "}
              </Button>
            </Form.Item>
          </Form> */}
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="area"
              //label="Area"
              rules={[{ required: true, message: "Missing area" }]}
              style={{ width: 250 }}
            >
              <Select options={areas} onChange={handleChange} />
            </Form.Item>
            <Form.List name="fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights ||
                          prevValues.fields !== curValues.fields
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            //label="Sight"
                            name={[field.name, "sight"]}
                            fieldKey={[field.fieldKey, "sight"]}
                            rules={[
                              { required: true, message: "Missing sight" },
                            ]}
                          >
                            <Select
                              disabled={!form.getFieldValue("area")}
                              style={{ width: 130 }}
                            >
                              {(sights[form.getFieldValue("area")] || []).map(
                                (item) => (
                                  <Option key={item} value={item}>
                                    {item}
                                  </Option>
                                )
                              )}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>

                      <Form.Item
                        {...field}
                        // label="label"
                        name={[field.name, "fields"]}
                        fieldKey={[field.fieldKey, "fields"]}
                        rules={[{ required: true, message: "Missing fields" }]}
                      >
                        <Select
                          disabled={!form.getFieldValue("area")}
                          style={{ width: 130 }}
                        >
                          {(fields[form.getFieldValue("area")] || []).map(
                            (item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                      <Input />

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{ width: 30 }}
                    ></Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Search
            placeholder="Search by id"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: "10px" }}
          />
          <Table
            dataSource={tableData}
            columns={columns}
            rowKey={(row) => row.id}
            bordered
            size="middle"
            scroll={{ x: "calc(700px + 50%)", y: 400 }}
            loading={isLoading}
          />
        </div>
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
            <Input />
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

export default Application;
