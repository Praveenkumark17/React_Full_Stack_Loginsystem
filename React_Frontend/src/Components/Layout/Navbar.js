import { Button, Flex, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";
import Item from "antd/es/list/Item";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";

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

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  return (
    <>
      <Flex>
        <Flex style={{ width: "100%" }} justify="start">
          <Menu mode="horizontal" theme="dark">
            <Link to={"/"}>
              <Item className="menuitem1">User Logs</Item>
            </Link>
          </Menu>
        </Flex>
        <Flex style={{ width: "100%" }} justify="center">
          <Menu mode="horizontal" theme="dark">
            <Item>
              <div className="time">{formatAMPM(time)}</div>
            </Item>
          </Menu>
        </Flex>
        <Flex style={{ width: "100%" }} justify="end">
          <Menu mode="horizontal" theme="dark">
            <Item key="1">
              <Link to="/">
                <Button type="link" className="navbutsub">
                  <Flex>
                    <Space>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FiLogIn size={15} />
                      </div>
                      Sign In
                    </Space>
                  </Flex>
                </Button>
              </Link>
            </Item>
            <Item key="2">
              <Link to="/register">
                <Button type="link" className="navbut">
                  <Flex>
                    <Space>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaUserPlus size={15} />
                      </div>
                      Sign Up
                    </Space>
                  </Flex>
                </Button>
              </Link>
            </Item>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
