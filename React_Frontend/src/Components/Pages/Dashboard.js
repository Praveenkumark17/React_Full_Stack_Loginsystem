import {
  Avatar,
  Button,
  Empty,
  Flex,
  Layout,
  Menu,
  Modal,
  Popover,
  Space,
  Tooltip,
  message,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Item from "antd/es/list/Item";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../Css/dashboard.css";
import Footers from "../Layout/Footers";
import {
  ExclamationCircleOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import Editprofile from "./Editprofile";
import Changepassword from "./Changepassword";
import ListUser from "./ListUser";
import { LuUser2 } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { MdLibraryBooks, MdLockOpen, MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaChalkboardUser, FaPowerOff, FaReadme, FaRegCircleUser } from "react-icons/fa6";
import { LiaUserTieSolid } from "react-icons/lia";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { AiOutlineHome } from "react-icons/ai";
import StaffList from "./StaffList";
import Dashboardhome from "./Dashboardhome";
import { RiUserSettingsLine } from "react-icons/ri";
import { PiTreeStructureBold } from "react-icons/pi";
import Department from "./Department";
import Course from "./Course";
import { CgReadme } from "react-icons/cg";
import Staffcourse from "./Staffcourse";
import Mycourse from "./Mycourse";
import Demo from "./Demo";

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
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  const staff_request = 2;
  const staff_admins = 1;
  const staff_list = 3;

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
      <Link to={"home"}>HOME</Link>,
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
          sessionStorage.setItem("list_user", JSON.stringify(1));
        }}
      >
        STUDENT LIST
      </Link>,
      "3",
      <LuUsers2 size={18} />
    ),
  ];

  if (data.authorities?.admin == 1) {
    studentitem.push(
      getItem(
        <Link
          to={"listUser"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
            sessionStorage.setItem("list_user", JSON.stringify(2));
          }}
        >
          STUDENT REQUEST
        </Link>,
        "4",
        <ReconciliationOutlined style={{ fontSize: "20px" }} />
      ),
      getItem(
        <Link
          to={"listUser"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
            sessionStorage.setItem("list_user", JSON.stringify(3));
          }}
        >
          STUDENT DETAILS
        </Link>,
        "5",
        <RiUserSettingsLine size={20} />
      )
    );
  }

  const staffitem = [
    getItem(
      <Link
        to={"staff_list"}
        // state={staff_admins}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
          sessionStorage.setItem("Staff_user", JSON.stringify(1));
        }}
      >
        STAFF LIST
      </Link>,
      "6",
      <LiaUserTieSolid size={20} />
    ),
    getItem(
      <Link
        to={"staff_list"}
        // state={staff_request}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
          sessionStorage.setItem("Staff_user", JSON.stringify(2));
        }}
      >
        STAFF REQUEST
      </Link>,
      "7",
      <ReconciliationOutlined style={{ fontSize: "20px" }} />
    ),
    ,
    getItem(
      <Link
        to={"staff_list"}
        // state={staff_list}
        onClick={() => {
          onrefresh(trigger);
          SetTrigger(!trigger);
          sessionStorage.setItem("Staff_user", JSON.stringify(3));
        }}
      >
        STAFF DETAILS
      </Link>,
      "8",
      <RiUserSettingsLine size={20} />
    ),
  ];

  const manage = [];

  if (data?.authorities?.admin == 1) {
    manage.push(
      getItem(
        <Link
          to={"dept"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          DEPARTMENT
        </Link>,
        "9",
        <PiTreeStructureBold size={20} />
      ),
      getItem(
        <Link
          to={"course"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          COURSE
        </Link>,
        "10",
        <CgReadme size={20} />
      )
    );
  }

  const course =[];

  if(data?.authorities?.staff_admin == 1){
    course.push(
      getItem(
        <Link
          to={"staff_course"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          LIST COURSE 
        </Link>,
        "11",
        <MdLibraryBooks size={20}/>
      ),
      getItem(
        <Link
          to={"my_course"}
          onClick={() => {
            onrefresh(trigger);
            SetTrigger(!trigger);
          }}
        >
          MY COURSE
        </Link>,
        "12",
        <MdOutlineCollectionsBookmark size={20}/>
      )
    )
  }

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
      "13",
      <MdLockOpen size={19} />
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

  const img = require(`../../Images/${data?.imagepath || "wipib0dx.png"}`);

  const popcontent = (
    <>
      <Flex>
        <Space>
          <Avatar size={60} src={img} />
          <div className="pop-body">
            <p className="pop-name">{data.firstname + " " + data.lastname}</p>
            <p className="pop-roll">
              {data.authorities?.staff_admin == 1 && data.authorities.admin == 0
                ? "STAFF"
                : data.authorities?.staff_admin == 0 &&
                  data.authorities.admin == 0
                ? "STUDENT"
                : data.authorities?.staff_admin == 0 &&
                  data.authorities.admin == 1
                ? "ADMIN"
                : ""}
            </p>
          </div>
        </Space>
      </Flex>
    </>
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
                      to={"/dashboard/home"}
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
              <Flex
                style={{ width: "100%", height: "9vh" }}
                justify="end"
                align="center"
              >
                <Menu mode="horizontal" theme="dark">
                  <Item>
                    <Flex>
                      <Popover
                        placement="bottomRight"
                        // title={<div style={{display:"flex",justifyContent:"center"}}>My Info</div>}
                        content={popcontent}
                      >
                        <Button
                          type="link"
                          className="dash-menuitem2"
                          style={{ color: "rgb(0, 191, 255)" }}
                        >
                          {data.firstname?.toUpperCase()}{" "}
                          {data.lastname?.toUpperCase()}
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
                      </Popover>
                      <Flex align="end">
                        <Tooltip title={"LOG OUT"} placement="bottomRight">
                          <Button
                            type="link"
                            style={{
                              fontSize: "17px",
                              fontWeight: "bold",
                              color: "red",
                            }}
                            onClick={() => setModel(true)}
                            title="Log out"
                            icon={<FaPowerOff />}
                          ></Button>
                        </Tooltip>
                      </Flex>
                    </Flex>
                  </Item>
                </Menu>
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
                data?.authorities?.staff_admin == 1 ? (
                  <Menu.SubMenu
                    key="sub2"
                    icon={<FaRegCircleUser size={18} />}
                    title="STUDENTS"
                    className="sider-sub-menu"
                  >
                    {studentitem.map(renderItem)}
                  </Menu.SubMenu>
                ) : (
                  ""
                )}
                {data?.authorities?.admin == 1 ? (
                  <Menu.SubMenu
                    key="sub1"
                    icon={<FaChalkboardUser size={18} />}
                    title="STAFFS"
                    className="sider-sub-menu"
                  >
                    {staffitem.map(renderItem)}
                  </Menu.SubMenu>
                ) : (
                  ""
                )}
                {manage.map(renderItem)}
                {data?.authorities?.staff_admin == 1 ? (
                  <Menu.SubMenu
                    key="sub3"
                    icon={<CgReadme size={20} />}
                    title="COURSE"
                    className="sider-sub-menu"
                  >
                    {course.map(renderItem)}
                  </Menu.SubMenu>
                ) : (
                  ""
                )}
                {changepass.map(renderItem)}
              </Menu>
            </Sider>
            <Content className="dash-content-out">
              <Routes>
                <Route path="/home" element={<Dashboardhome />} />
                <Route path="/edit/:id" element={<Editprofile />} />
                <Route path="/changepass" element={<Changepassword />} />
                <Route path="/listUser" element={<ListUser />} />
                <Route path="/staff_list" element={<StaffList />} />
                <Route path="/dept" element={<Department />} />
                <Route path="/course" element={<Course />} />
                <Route path="/staff_course" element={<Staffcourse />} />
                <Route path="/my_course" element={<Mycourse />} />
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
    return navigate("/");
  }
}

export default Dashboard;
