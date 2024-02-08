import { Button, Flex, Menu } from "antd";
import React, { useEffect, useState } from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";
import Item from "antd/es/list/Item";
import {
  LoginOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Flex justify="space-between">
        <Menu mode="horizontal" theme="dark">
          <Link to={"/"}>
            <Item className="menuitem1">User Logs</Item>
          </Link>
        </Menu>
        <Menu mode="horizontal" theme="dark">
          <Item>
            <div className="time">{time.toLocaleTimeString()}</div>
          </Item>
        </Menu>
        <Menu mode="horizontal" theme="dark">
          <Item key="1">
            <Link to="/">
              <Button type="link" className="navbutsub">
                <LoginOutlined />
                Sign In
              </Button>
            </Link>
          </Item>
          <Item key="2">
            <Link to="/register">
              <Button type="link" className="navbut">
                <UsergroupAddOutlined />
                Sign Up
              </Button>
            </Link>
          </Item>
        </Menu>
      </Flex>
    </>
  );
}

export default Navbar;
