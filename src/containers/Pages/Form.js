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

import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";
import { Form, Input, InputNumber, Button } from "antd";

const UpdateForm = (props) => {
  const [data, setData] = useState([]);
  console.warn("props", props.match.params.id);
  useEffect(() => {
    let result = [
      {
        key: "1",
        number: 1,
        name: "John Brown",
        mobile: 8574569854,
        email: "trf@ghao.cv",
        status: "process",
        action: "Edit",
      },
    ];
    setData(result);
    console.log("data changed!");
  }, []);
  return (
    <>
      <Header />
      <MenuBar />
      <h1>update form</h1>
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "mobile"]}
        label="Mobile"
        rules={[
          {
            type: "number",
            // min: 0,
            // max: 10,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "status"]} label="Status">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "remark"]} label="Remark">
        <Input.TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
      {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}></Form.Item> */}
    </>
  );
};
export default withRouter(UpdateForm);
