import {
  Button,
  Flex,
  Layout,
  Menu,
  Modal,
  Space,
  Tooltip,
  message,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Item from "antd/es/list/Item";
import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../Css/dashboard.css";
import Footers from "../Layout/Footers";
import ErrorPage from "./ErrorPage";
import {
  ExclamationCircleOutlined,
  HomeOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import Editprofile from "./Editprofile";
import Changepassword from "./Changepassword";
import ListUser from "./ListUser";
import { LuUser2 } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { MdLockOpen } from "react-icons/md";
import { FaChalkboardUser, FaPowerOff } from "react-icons/fa6";
import { LiaUserTieSolid } from "react-icons/lia";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { AiOutlineHome } from "react-icons/ai";
import StaffList from "./StaffList";

function Dashboard() {
  const [data, setData] = useState([]);

  const [model, setModel] = useState(false);

  const [trigger, SetTrigger] = useState(false);

  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  // const [collapsed, setCollapsed] = useState(false);

  const siderStyle = {
    lineHeight: "120px",
    color: "#fff",
    // backgroundColor: "#1677ff",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // setTimeout(()=>{sessionStorage.clear()},1000*60)

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

  const staff_request = 2;
  const staff_admins = 1;

  function getItem(label, key, icon, className) {
    return {
      key,
      icon,
      className,
      label,
    };
  }

  const items = [
    getItem(
      <Link to={``}>HOME</Link>,
      "1",
      <AiOutlineHome size={18} />,
      "item-profile"
    ),
    getItem(
      <Link to={`edit/${data.id}`}>MY PROFILE</Link>,
      "2",
      <LuUser2 size={18} />
    ),
  ];

  const studentitem = [
    getItem(
      <Link
        to={"listUser"}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
        }}
      >
        STUDENT LIST
      </Link>,
      "3",
      <LuUsers2 size={18} />
    ),
  ];

  const changepass = [
    getItem(
      <Link
        to={"changepass"}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
        }}
      >
        CHANGE PASSWORD
      </Link>,
      "6",
      <MdLockOpen size={19} />
    ),
  ];

  const staffitem = [
    getItem(
      <Link
        to={"staff_list"}
        state={staff_admins}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
        }}
      >
        STAFF LIST
      </Link>,
      "4",
      <LiaUserTieSolid size={20} />
    ),
    getItem(
      <Link
        to={"staff_list"}
        state={staff_request}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
        }}
      >
        STAFF REQUEST
      </Link>,
      "5",
      <ReconciliationOutlined />
    ),
  ];

  const renderItem = useCallback(
    (item) => (
      <Menu.Item key={item.key} icon={item.icon} className={item.className}>
        {item.label}
      </Menu.Item>
    ),
    []
  );

  if (sessiondata) {
    return (
      <>
        <Layout>
          <Header className="dash-header">
            <Flex>
              <Flex style={{ width: "100%" }} justify="start">
                <Menu mode="horizontal" theme="dark" style={{ height: "10px" }}>
                  <Item>
                    <Link
                      to={"/dashboard"}
                      className="dash-menuitem1"
                      onClick={() => {
                        onrefresh(trigger);
                        SetTrigger(!trigger);
                      }}
                    >
                      User Logs
                    </Link>
                  </Item>
                </Menu>
              </Flex>
              <Flex style={{ width: "100%" }} justify="center">
                <Menu mode="horizontal" theme="dark" style={{ height: "10px" }}>
                  <Item>
                    <div className="dash_time">{formatAMPM(time)}</div>
                  </Item>
                </Menu>
              </Flex>
              <Flex style={{ width: "100%" }} justify="end">
                <Flex
                  justify="end"
                  align="center"
                  style={{ marginTop: "3.5%" }}
                >
                  <Button
                    type="link"
                    className="dash-menuitem2"
                    style={{ color: "rgb(0, 191, 255)" }}
                  >
                    {data.firstname} {data.lastname}
                    {data.authorities?.staff_admin == 1 &&
                    data.authorities.admin == 0
                      ? " (STAFF)"
                      : data.authorities?.staff_admin == 0 &&
                        data.authorities.admin == 0
                      ? " (STUDENT)"
                      : data.authorities?.staff_admin == 0 &&
                        data.authorities.admin == 1
                      ? " (ADMIN)"
                      : ""}
                  </Button>
                  <Tooltip title={"LOG OUT"} placement="bottomRight">
                    <Button
                      type="link"
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "red",
                      }}
                      onClick={() => setModel(true)}
                    >
                      <FaPowerOff />
                    </Button>
                  </Tooltip>
                </Flex>
              </Flex>
            </Flex>
          </Header>
          <Layout className="layout">
            <Sider width={"20%"} className="sider" theme="dark">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                className="sider-menu"
              >
                {items.map(renderItem)}
                {data?.authorities?.admin == 1 ||
                data?.authorities?.staff_admin == 1
                  ? studentitem.map(renderItem)
                  : ""}
                {data?.authorities?.admin == 1 ? (
                  <Menu.SubMenu
                    key="sub1"
                    icon={<FaChalkboardUser size={18} />}
                    title="STAFF"
                    className="sider-sub-menu"
                  >
                    {staffitem.map(renderItem)}
                  </Menu.SubMenu>
                ) : (
                  ""
                )}
                {changepass.map(renderItem)}
              </Menu>
            </Sider>
            <Content className="dash-content-out">
              <Routes>
                <Route path="/edit/:id" element={<Editprofile />} />
                <Route path="/changepass" element={<Changepassword />} />
                <Route path="/listUser" element={<ListUser />} />
                <Route path="/staff_list" element={<StaffList />} />
              </Routes>
            </Content>
          </Layout>
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
    return navigate("/error", {
      state: {
        message:
          "Sorry, the page you visited does not exist to enter the dashboard.",
        errorCode: 404,
        type: 2,
      },
    });
  }
}

export default Dashboard;
