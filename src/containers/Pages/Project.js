import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "../../components/Layout/Header";
import MenuBar from "../../components/Layout/Menu";

const Project = () => {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Header />
      <MenuBar />

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default Project;
