import {
  Button,
  Card,
  Col,
  Dropdown,
  Flex,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import "../Css/dashboard.css";
import Footers from "../Layout/Footers";
import ErrorPage from "./ErrorPage";
import {
  ExclamationCircleOutlined,
  PoweroffOutlined,
  ReconciliationOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Editprofile from "./Editprofile";
import Changepassword from "./Changepassword";
import ListUser from "./ListUser";
import { LuUser2 } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { MdLockOpen } from "react-icons/md";
import { FaPowerOff, FaUserClock } from "react-icons/fa6";
import { LiaUserTieSolid } from "react-icons/lia";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);

  const [model, setModel] = useState(false);

  const [trigger, SetTrigger] = useState(false);

  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const sessiondata = sessionStorage.getItem("userdata");

  useEffect(() => {
    if (sessiondata || trigger) {
      console.log("value triger !!", trigger);
      const datas = sessiondata ? JSON.parse(sessiondata) : {};
      const getuserdata = async () => {
        await axios
          .get(`http://localhost:8080/user/getuserid/${datas.id}`)
          .then((res) => {
            console.log("dash-data:", res.data);
            const getdata = res.data;
            setData(getdata);
            console.log(getdata);
            console.log("session admin:", getdata?.authorities?.admin);
          })
          .catch((err) => console.log(err));
      };
      getuserdata();
    }
  }, [sessiondata, trigger]);

  const onrefresh = (val) => {
    const triger = val;
    SetTrigger(triger);
  };

  const onlogout = () => {
    sessionStorage.clear();
    navigate("/");
    message.open({
      type: "success",
      content: "Log out success",
      duration: 1,
    });
  };

  let getUserList;
  let staffList;
  let staffrequestList;

  const error = "Access denied due to invalid credentials";

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

  const Student = "0";
  if (data?.authorities?.admin == 1 || data?.authorities?.staff_admin == 1) {
    getUserList = (
      <Menu.Item key="4">
        <Link
          to={"listUser"}
          state={Student}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          <Button type="link" className="dash-but">
            <Flex>
              <Space>
                <Flex align="center">
                  <LuUsers2 size={18} />
                </Flex>
                <div>Students List</div>
              </Space>
            </Flex>
          </Button>
        </Link>
      </Menu.Item>
    );
  }

  const staff_request = 2;
  if (data?.authorities?.admin == 1) {
    staffrequestList = (
      <Menu.Item key="5">
        <Link
          to={"listUser"}
          state={staff_request}
          style={{ marginLeft: "3px" }}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          <Button type="link" className="dash-but">
            <Flex>
              <Space>
                <Flex align="center">
                  <ReconciliationOutlined />
                </Flex>
                <div>Staff Request</div>
              </Space>
            </Flex>
          </Button>
        </Link>
      </Menu.Item>
    );
  }

  const staff_admins = 1;
  if (data?.authorities?.admin == 1) {
    staffList = (
      <Menu.Item key="6">
        <Link
          to={"listUser"}
          state={staff_admins}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          <Button type="link" className="dash-but">
            <Flex>
              <Space>
                <Flex align="center">
                  <LiaUserTieSolid size={20} />
                </Flex>
                <div>Staff List</div>
              </Space>
            </Flex>
          </Button>
        </Link>
      </Menu.Item>
    );
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`edit/${data.id}`}>
          <Button
            type="link"
            className="dash-but"
            onClick={() => {
              onrefresh(trigger);
              SetTrigger(!trigger);
            }}
          >
            <Flex>
              <Space>
                <Flex align="center">
                  <LuUser2 size={18} />
                </Flex>
                <div>My Profile</div>
              </Space>
            </Flex>
          </Button>
        </Link>
      </Menu.Item>
      {getUserList}
      {staffList}
      {staffrequestList}
      <Menu.Item key="2">
        <Link to="changepass">
          <Button
            type="link"
            className="dash-but"
            onClick={() => {
              onrefresh(trigger);
              SetTrigger(!trigger);
            }}
          >
            <Flex>
              <Space>
                <Flex align="center">
                  <MdLockOpen size={19} />
                </Flex>
                <div>Change Password</div>
              </Space>
            </Flex>
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Button
          type="link"
          onClick={() => setModel(true)}
          danger
          className="dash-out-but"
        >
          <Flex>
            <Space>
              <Flex align="center">
                <FaPowerOff size={18} />
              </Flex>
              <div>Log Out</div>
            </Space>
          </Flex>
        </Button>
      </Menu.Item>
    </Menu>
  );

  if (sessiondata) {
    return (
      <>
        <Layout>
          <Header>
            <Flex>
              <Flex style={{ width: "100%" }} justify="start">
                <Menu mode="horizontal" theme="dark">
                  <Item>
                    <Link
                      to={"/dashboard"}
                      className="dash-menuitem1"
                      onClick={() => {
                        onrefresh(trigger);
                        SetTrigger(!trigger);
                      }}
                    >
                      Welcome Back!! {data.firstname} {data.lastname}
                    </Link>
                  </Item>
                </Menu>
              </Flex>
              <Flex style={{ width: "100%" }} justify="center">
                <Menu mode="horizontal" theme="dark">
                  <Item>
                    <div className="dash_time">{formatAMPM(time)}</div>
                  </Item>
                </Menu>
              </Flex>
              <Flex style={{ width: "100%" }} justify="end">
                <Menu mode="horizontal" theme="dark">
                  <Item>
                    <Dropdown
                      overlay={menu}
                      placement="bottomRight"
                      className="dash-drop"
                    >
                      <Button type="link" style={{ color: "lightblue" }}>
                        Menu
                      </Button>
                    </Dropdown>
                  </Item>
                </Menu>
              </Flex>
            </Flex>
          </Header>
          <Content className="dash-content">
            <Routes>
              <Route path="/edit/:id" element={<Editprofile />} />
              <Route path="/changepass" element={<Changepassword />} />
              <Route path="/listUser" element={<ListUser />} />
            </Routes>
          </Content>
          <Footer className="dash-footer">
            <Footers />
          </Footer>
        </Layout>
        <Modal
          title={
            <>
              <Space>
                <ExclamationCircleOutlined style={{ color: "orange" }} /> Do You
                Want To LogOut
              </Space>
            </>
          }
          style={{ top: 80 }}
          open={model}
          okText="Yes"
          cancelText="No"
          onOk={() => onlogout()}
          onCancel={() => setModel(false)}
        ></Modal>
      </>
    );
  } else {
    return <ErrorPage error={error} />;
  }
}

export default Dashboard;
