import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Space, Tag, Modal, Button, Form, Input, Select } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import classes from "./ViewUser.module.css";

const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

// const dataSource = [
//   {
//     id: "1",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "2",
//     name: "Tushar",
//     mobile: 121212212,
//     email: "Tushar@Tushar.com",
//     status: "Approved",
//     remark: "",
//   },
//   {
//     id: "3",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "4",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "5",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "6",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "7",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "8",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "9",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "10",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
//   {
//     id: "11",
//     name: "Mike",
//     mobile: 121212212,
//     email: "sdsd@sdsd.com",
//     status: "Pending",
//     remark: "",
//   },
// ];

const ViewUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const formRecord = React.createRef();

  // useEffect = () => {
  //   // let id = props.match.params.id;
  Axios.get(`http://94.237.3.166:8080/mhada/user/{id}`).then((e) => {
    formRecord.current.setFieldsValue({
      name: e.data.name,
      mobile: e.data.mobile,
      email: e.data.email,
      // cus_car_number: e.data.cus_car_number,
      // cus_band: e.data.cus_band,
      // cus_address: e.data.cus_address,
    });
    console.log("formRecord", data);
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    // {
    //   title: "Application Id",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>Edit</a>
          <a onClick={() => showDeleteConfirm(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const onEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const newDataSource = formRecord.map((item) => {
      if (item.id === form.getFieldsValue().id) {
        return form.getFieldsValue();
      } else {
        return item;
      }
    });
    setData(newDataSource);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (text) => {
    console.log("text:", text);
    setSearchText(text);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Header />
      <MenuBar />
      <div className={classes.container}>
        <div className={classes.table}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 300, marginBottom: "10px" }}
          />
          <Table
            dataSource={data.filter(
              (item) => item.email.indexOf(searchText) > -1
            )}
            columns={columns}
            rowKey={(row) => row.id}
            bordered
            size="middle"
            scroll={{ x: "calc(700px + 50%)", y: 400 }}
            // loading={isLoading}
          />
        </div>
      </div>
      <Modal
        title="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          ref={formRecord}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
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
            name="mobile"
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
            name="email"
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
            label="Remark"
            name="remark"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            {/* <Button onClick={showDeleteConfirm} type="dashed">
              Delete
            </Button> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewUser;

// import React, { useState, useEffect } from "react";
// import Header from "../../components/Layout/Header";
// import MenuBar from "../../components/Layout/Menu";

// //App.js
// // import React, { useState, useEffect } from "react";
// /* import Table from "./Table";
// import Form from "./Form"; */

// const Form = () => {
//   const [id, setId] = useState(1);
//   const [firstname, setFirstname] = useState("");
//   const [items, setItems] = useState("");

//   /* this.state = {
//       id: 1,
//       firstname: "",
//       items: [],
//     }; */

//   handleFormSubmit = (e) => {
//     e.preventDefault();

//     let item = [...items];

//     items.push({
//       id: id,
//       firstname: firstname,
//     });
//     setId(count + 1);
//     /* this.setState({
//       items,
//       id: this.state.id + 1,
//       firstname: "",
//     }); */
//   };

//   handleInputChange = (e) => {
//     let input = e.target;
//     let name = e.target.name;
//     let value = input.value;

//     this.setState({
//       [name]: value,
//     });
//   };

//   onUpdate = (item) => {
//     const updatedData = items.map((x) =>
//       x.id === item.id ? { ...x, firstname: item.newFirstname } : x
//     );
//     setItems({ items: updatedData });

//     console.log("tj", item);
//   };

//   return null;
//   //<div className="App">
//   //   <Header />
//   //   <MenuBar />
//   //   <Form
//   //     handleFormSubmit={handleFormSubmit}
//   //     handleInputChange={handleInputChange}
//   //     newId={id}
//   //     newFirstname={firstname}
//   //   />
//   //   <Table items={items} onUpdate={onUpdate} />
//   // </div>
// };
// export default Form;

// import React from "react";
// import { withRouter, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Header from "../../components/Layout/Header";
// import MenuBar from "../../components/Layout/Menu";
// import { Form, Input, InputNumber, Button } from "antd";

// const UpdateForm = (props) => {
//   const [data, setData] = useState([]);
//   console.warn("props", props.match.params.id);
//   useEffect(() => {
//     let result = [
//       {
//         key: "1",
//         number: 1,
//         name: "John Brown",
//         mobile: 8574569854,
//         email: "trf@ghao.cv",
//         status: "process",
//         action: "Edit",
//       },
//     ];
//     setData(result);
//     console.log("data changed!");
//   }, []);
//   return (
//     <>
//       <Header />
//       <MenuBar />
//       <h1>update form</h1>
//       <Form.Item
//         name={["user", "name"]}
//         label="Name"
//         rules={[
//           {
//             required: true,
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name={["user", "mobile"]}
//         label="Mobile"
//         rules={[
//           {
//             type: "number",
//             // min: 0,
//             // max: 10,
//           },
//         ]}
//       >
//         <InputNumber />
//       </Form.Item>
//       <Form.Item
//         name={["user", "email"]}
//         label="Email"
//         rules={[
//           {
//             type: "email",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item name={["user", "status"]} label="Status">
//         <Input />
//       </Form.Item>
//       <Form.Item name={["user", "remark"]} label="Remark">
//         <Input.TextArea />
//       </Form.Item>
//       <Button type="primary" htmlType="submit">
//         Save
//       </Button>
//       {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}></Form.Item> */}
//     </>
//   );
// };
// export default withRouter(UpdateForm);
