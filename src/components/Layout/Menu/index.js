import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import AddUser from "../../../containers/Pages/AddUser";

const { SubMenu } = Menu;

const MenuBar = () => {
  const history = useHistory();
  const handleClick = (e) => {
    console.log("click", e);
  };

  const handleClickMenu = (path) => {
    history.push(path);
  };

  return (
    <Menu onClick={handleClick} mode="horizontal">
      <SubMenu
        onTitleClick={() => handleClickMenu("/dashboard")}
        key="sub1"
        icon={<AppstoreOutlined />}
        title="About MHADA"
      ></SubMenu>
      <SubMenu
        onTitleClick={() => handleClickMenu("/broadcastwinner")}
        key="sub6"
        icon={<SettingOutlined />}
        title="Master"
      >
        <SubMenu
          onTitleClick={() => handleClickMenu("/adduser")}
          key="sub11"
          icon={<SettingOutlined />}
          title="Add User"
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/viewuser")}
          key="sub7"
          icon={<SettingOutlined />}
          title="View Mhada User"
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/application")}
          key="sub5"
          icon={<SettingOutlined />}
          title="View Application"
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/schemedetails")}
          key="sub9"
          icon={<SettingOutlined />}
          title="Scheme Details
        "
        ></SubMenu>
      </SubMenu>
      <SubMenu
        onTitleClick={() => handleClickMenu("/applicationstatus")}
        key="sub3"
        icon={<SettingOutlined />}
        title="ApplicationStatus"
      ></SubMenu>
      <SubMenu
        onTitleClick={() => handleClickMenu("/waitinglist")}
        key="sub11"
        icon={<SettingOutlined />}
        title="Waiting List"
      >
        <SubMenu
          onTitleClick={() => handleClickMenu("/broadcastwinner")}
          key="sub11"
          icon={<SettingOutlined />}
          title="BroadCast Winner"
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/project")}
          key="sub8"
          icon={<SettingOutlined />}
          title="User scheme code
        "
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/activateapplicantlist")}
          key="sub10"
          icon={<SettingOutlined />}
          title="Activate Applicant List
        "
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/smsscreen")}
          key="sub11"
          icon={<SettingOutlined />}
          title="Sms Screen"
        ></SubMenu>
        <SubMenu
          onTitleClick={() => handleClickMenu("/project")}
          key="sub4"
          icon={<SettingOutlined />}
          title="Upload document"
        >
          {/* <Menu.Item key="5">photo </Menu.Item> */}
          <Menu.Item key="6">video 1</Menu.Item>
          <Menu.Item key="3">audio </Menu.Item>
          <Menu.Item key="4">captoins </Menu.Item>
        </SubMenu>{" "}
      </SubMenu>
      {/* <Menu.Item key="5">photo </Menu.Item>
        <Menu.Item key="6">video 1</Menu.Item>
        <Menu.Item key="3">audio </Menu.Item>
        <Menu.Item key="4">captoins </Menu.Item> */}
    </Menu>
  );
};

export default MenuBar;
