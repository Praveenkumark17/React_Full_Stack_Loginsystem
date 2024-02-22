import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, QRCode, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "../Css/stafflist.css";

function StaffList() {
  const [user, setUser] = useState();

  const [userlist, setUserList] = useState();

  const [userRequest, setUserRequest] = useState();

  const [getusers, Setgetusers] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgurl, Setimgurl] = useState();

  const [trigger, Settrigger] = useState();

  const [sessiondata, setSessiondata] = useState();

  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState();

  const navigate = useNavigate();

  // const location = useLocation();
  // const userTypes = location.state;
  const userTypes = sessionStorage.getItem("Staff_user");

  useEffect(() => {
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("staff session", datas);
  }, [user]);

  useEffect(() => {
    console.log("states:", userTypes);
    setLoading(true);
  }, [userTypes]);

  const onView = async (id) => {
    await axios
      .get(`http://localhost:8080/user/getuserid/${id}`)
      .then((res) => {
        console.log(res.data);
        Setselectuser(res.data);
      })
      .catch((err) => console.log(err));
    console.log(id);

    setIsModalOpen(true);
  };

  useEffect(() => {
    const qrvalue = { ...selectuser };
    delete qrvalue["password"];
    delete qrvalue["id"];
    delete qrvalue["authorities"];
    delete qrvalue["imagepath"];
    qrvalue["roll"] = "Staff";
    SetQrvalues(qrvalue);
  }, [selectuser]);

  const onOk = () => {
    setIsModalOpen(false);
    Setselectuser(null); //use for security purpose
  };

  const onRemove = async (id) => {
    await axios
      .delete(`http://localhost:8080/user/deleteuser/${id}`)
      .then((res) => {
        console.log(res.data);
        Settrigger(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onaction = async (id, val) => {
    console.log("action_val", val);
    const acceptdata = { staff_admin: val };
    await axios
      .put(`http://localhost:8080/user/staffauth/${id}`, acceptdata)
      .then((res) => {
        console.log("accept-back:", res.data);
        Settrigger(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const updateuser = async () => {
      await axios
        .get("http://localhost:8080/user/getuser")
        .then((res) => {
          const result = res.data;
          if (userTypes == 2) {
            const users = result.filter(
              (user) => user.authorities.staff_admin == 2
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userTypes == 1) {
            const users = result.filter(
              (user) =>
                user.authorities.staff_admin == 1 ||
                user.authorities.staff_admin == 3
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userTypes == 3) {
            const users = result.filter(
              (user) => user.authorities.staff_admin == 1
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
        })
        .catch((err) => console.log(err.data));
    };
    updateuser();
  }, [trigger, userTypes]);

  useEffect(() => {
    if (selectuser) {
      const images = require(`../../Images/${selectuser?.imagepath}`);
      Setimgurl(images);
    }
  }, [selectuser]);

  useEffect(() => {
    const final = getusers?.map((user, index) => ({
      ...user,
      but: (
        <div style={{ textAlign: "center" }}>
          <Space size={"middle"}>
            <Tag color={user.authorities.staff_admin == 1 ? "green" : "red"}>
              {user.authorities.staff_admin == 1 ? "Accepted" : "Rejected"}
            </Tag>
          </Space>
        </div>
      ),
      list_but: (
        <div style={{ textAlign: "center" }}>
          <Space size={"middle"}>
            <Button type="primary" onClick={() => onView(user.id)}>
              View
            </Button>
            <Button type="primary" onClick={() => onRemove(user.id)} danger>
              Remove
            </Button>
          </Space>
        </div>
      ),
      request_but: (
        <div style={{ textAlign: "center" }}>
          <Space size={"middle"}>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              style={{ backgroundColor: "rgb(42, 153, 12)" }}
              onClick={() => onaction(user.id, 1)}
            >
              Accept
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => onaction(user.id, 3)}
              danger
            >
              Reject
            </Button>
          </Space>
        </div>
      ),
    }));
    setUser(final);
  }, [getusers]);

  useEffect(() => {
    let action;
    let title;
    if (user == null) {
      action = "";
    }
    if (userTypes == 1) {
      action = "but";
      title = "STAFF LIST";
    }
    if (userTypes == 3) {
      action = "list_but";
      title = "STAFF DETAILS";
    }
    if (userTypes == 2) {
      action = "request_but";
      title = "STAFF REQUEST";
    }
    setData(action);
    setTitle(title);
    setInterval(() => {
      setLoading(false);
    }, 5000);
  }, [user]);

  const columns = [
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">FirstName</p>
        </div>
      ),
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">LastName</p>
        </div>
      ),
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">Age</p>
        </div>
      ),
      dataIndex: "age",
      key: "age",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">Email</p>
        </div>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">Mobile</p>
        </div>
      ),
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="staff-table-col-style">Action</p>
        </div>
      ),
      dataIndex: data,
      key: "action",
    },
  ];

  if (sessiondata?.authorities?.admin == 1) {
    if (user) {
      return (
        <>
          <Modal
            title={
              <div>
                <h3>
                  Mr. {selectuser?.firstname + " " + selectuser?.lastname}
                </h3>
              </div>
            }
            open={isModalOpen}
            onOk={onOk}
            onCancel={onOk}
          >
            <Flex justify="space-between">
              <QRCode value={JSON.stringify(qrvalues)} />
              {imgurl ? (
                <img
                  className="staff-list-avathar"
                  src={imgurl}
                  height={157}
                  width={147}
                ></img>
              ) : (
                <div className="staff-list-avathar">
                  <div style={{ marginTop: "25px", marginLeft: "25px" }}>
                    <HashLoader color="#0e1630" loading size={100} />
                  </div>
                </div>
              )}
            </Flex>
          </Modal>
          <Row className="staff-list-row">
            <Flex justify="center" style={{ width: "100%" }} align="center">
              {loading ? (
                <>
                  <Row className="staff-list-row-load" align={"middle"}>
                    <Flex justify="center" style={{ width: "100%" }}>
                      <HashLoader color="#0e1630" loading size={110} />
                    </Flex>
                  </Row>
                </>
              ) : (
                <Table
                  title={() => <div className="table-title">{title}</div>}
                  style={{ fontWeight: "bold", width: "75%" }}
                  dataSource={user}
                  columns={columns}
                  pagination={{ pageSize: 5 }}
                />
              )}
            </Flex>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row className="staff-list-row-load" align={"middle"}>
            <Flex justify="center" style={{ width: "100%" }}>
              <HashLoader color="#0e1630" loading size={110} />
            </Flex>
          </Row>
        </>
      );
    }
  } else {
    return navigate("/error", {
      state: {
        message: "Sorry, you are not authorized to access this page.",
        errorCode: 403,
        type: 1,
      },
    });
  }
}

export default StaffList;
