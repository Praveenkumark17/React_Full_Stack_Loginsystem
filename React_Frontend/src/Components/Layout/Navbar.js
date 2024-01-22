import { Button, Flex, Menu, Space } from "antd";
import React, { useState } from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";
import Item from "antd/es/list/Item";
import { LoginOutlined, UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";

function Navbar() {
  return (
    <>
      <Flex justify="space-between">
        <Menu mode="horizontal" theme="dark">
          <Link to={"/"}>
            <Item className="menuitem1">User Logs</Item>
          </Link>
        </Menu>
        <Menu mode="horizontal" theme="dark">
          <Item key="1">
            <Link to="/">
              <Button type="link" className="navbutsub">
              <LoginOutlined />Sign In
              </Button>
            </Link>
          </Item>
          <Item>
            <Link to="/register">
              <Button type="link" className="navbut">
              <UsergroupAddOutlined />Sign Up
              </Button>
            </Link>
          </Item>
        </Menu>
      </Flex>
    </>
  );
}

export default Navbar;
