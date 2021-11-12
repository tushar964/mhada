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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData?.role;
  return (
    <Menu onClick={handleClick} mode="horizontal">
      {userRole === "admin" || userRole === "acount" ? (
        <SubMenu
          onTitleClick={() => handleClickMenu("/dashboard")}
          key="sub1"
          icon={<AppstoreOutlined />}
          title="About MHADA"
        ></SubMenu>
      ) : null}
      <SubMenu
        // onTitleClick={() => handleClickMenu("/broadcastwinner")}
        key="sub6"
        icon={<SettingOutlined />}
        title="Master"
      >
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/application")}
            key="sub5"
            icon={<SettingOutlined />}
            title="Upload Draw Winner"
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/viewuser")}
            key="sub7"
            icon={<SettingOutlined />}
            title=" Mhada Users"
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/adduser")}
            key="sub15"
            icon={<SettingOutlined />}
            title="Add User"
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/schemedetails")}
            key="sub9"
            icon={<SettingOutlined />}
            title="Scheme Details
        "
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/smsscreen")}
            key="sub16"
            icon={<SettingOutlined />}
            title="Sms Screen"
          ></SubMenu>
        ) : null}
      </SubMenu>
      {userRole === "admin" ||
      userRole === "superuser" ||
      userRole === "role" ? (
        <SubMenu
          onTitleClick={() => handleClickMenu("/applicationstatus")}
          key="sub3"
          icon={<SettingOutlined />}
          title="ApplicationStatus"
        ></SubMenu>
      ) : null}

      <SubMenu
        //onTitleClick={() => handleClickMenu("/")}
        key="sub20"
        icon={<SettingOutlined />}
        title="Waiting List"
      >
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/project")}
            key="sub4"
            icon={<SettingOutlined />}
            title="Waiting List "
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/waitinglist")}
            key="sub19"
            icon={<SettingOutlined />}
            title=" Operate Waiting List"
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/activateapplicantlist")}
            key="sub10"
            icon={<SettingOutlined />}
            title="Activate Applicant List
        "
          ></SubMenu>
        ) : null}
        {userRole === "admin" ? (
          <SubMenu
            onTitleClick={() => handleClickMenu("/broadcastwinner")}
            key="sub11"
            icon={<SettingOutlined />}
            title="BroadCast Winner"
          ></SubMenu>
        ) : null}
      </SubMenu>
    </Menu>
  );
};

export default MenuBar;
