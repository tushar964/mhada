import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Boards from "../../../containers/Pages/Boards";

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
      >
        <SubMenu key="sub2" title="Vision & Missons">
          <Menu.Item key="7">Our Role</Menu.Item>
          <Menu.Item key="8">History</Menu.Item>
        </SubMenu>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
      </SubMenu>

      {/* <SubMenu
        onTitleClick={() => handleClickMenu("/boards")}
        key="sub3"
        icon={<SettingOutlined />}
        title="Boards"
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
      <SubMenu
        onTitleClick={() => handleClickMenu("/project")}
        key="sub4"
        icon={<SettingOutlined />}
        title="Upload document"
      >
        <Menu.Item key="5">photo </Menu.Item>
        <Menu.Item key="6">video 1</Menu.Item>
        <Menu.Item key="3">audio </Menu.Item>
        <Menu.Item key="4">captoins </Menu.Item>
      </SubMenu> */}
      <SubMenu
        onTitleClick={() => handleClickMenu("/application")}
        key="sub5"
        icon={<SettingOutlined />}
        title="View Application"
      >
        {/* <Menu.Item key="5">photo </Menu.Item>
        <Menu.Item key="6">video 1</Menu.Item>
        <Menu.Item key="3">audio </Menu.Item>
        <Menu.Item key="4">captoins </Menu.Item> */}
      </SubMenu>
    </Menu>
  );
};

export default MenuBar;
