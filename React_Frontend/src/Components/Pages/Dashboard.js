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
  TeamOutlined,
  UnlockOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Editprofile from "./Editprofile";
import Changepassword from "./Changepassword";
import ListUser from "./ListUser";

function Dashboard() {
  const [data, setData] = useState([]);

  const [model, setModel] = useState(false);

  const navigate = useNavigate();

  const sessiondata = sessionStorage.getItem("userdata");

  useEffect(() => {
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setData(datas);
    console.log(datas);
    console.log("session admin:", datas.authorities.admin);
  }, []);

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

  if (data?.authorities?.admin == 1) {
    getUserList = (
      <Menu.Item key="4">
        <Link to={"listUser"}><Button type="link" className="dash-but">
          <TeamOutlined />
          Get User List
        </Button></Link>
      </Menu.Item>
    );
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`edit/${data.id}`}>
          <Button type="link" className="dash-but">
            <UserAddOutlined />
            Profile
          </Button>
        </Link>
      </Menu.Item>
      {getUserList}
      <Menu.Item key="2">
        <Link to="changepass">
          <Button type="link" className="dash-but">
            <UnlockOutlined />
            Change Password
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
          <PoweroffOutlined />
          Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );

  if (sessiondata) {
    return (
      <>
        <Layout>
          <Header>
            <Flex justify="space-between">
              <Menu mode="horizontal" theme="dark">
                <Item>
                  <Link to={"/dashboard"} className="dash-menuitem1">
                    Welcome Back!! {data.firstname} {data.lastname}
                  </Link>
                </Item>
              </Menu>
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
                want LogOut
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
    return <ErrorPage />;
  }
}

export default Dashboard;
