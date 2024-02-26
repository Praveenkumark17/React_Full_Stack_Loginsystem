import { Button, Flex, Modal, QRCode, Row, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function ListUser() {
  const [user, setUser] = useState();

  const [getusers, Setgetusers] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgurl, Setimgurl] = useState();

  const [trigger, Settrigger] = useState();

  const [sessiondata, setSessiondata] = useState();

  const navigate = useNavigate();

  const [data, setData] = useState();

  const [title, setTitle] = useState();

  const [loading, setLoading] = useState(true);

  const userTypes = sessionStorage.getItem("list_user");

  useEffect(() => {
    console.log("student_type:", userTypes);
    setLoading(true);
  }, [userTypes]);

  useEffect(() => {
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("staff session", datas);
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
    qrvalue["roll"] = "Student";
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

  useEffect(() => {
    const updateuser = async () => {
      await axios
        .get("http://localhost:8080/user/getuser")
        .then((res) => {
          const result = res.data;
          if (userTypes == 1) {
            const users = result.filter(
              (user) =>
                user.authorities.student == 1 || user.authorities.student == 3
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userTypes == 2) {
            const users = result.filter(
              (user) => user.authorities.student == 2
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userTypes == 3) {
            const users = result.filter(
              (user) => user.authorities.student == 1
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

  const onaction = async (id, val) => {
    console.log("action_val", val);
    const acceptdata = { student: val };
    await axios
      .put(`http://localhost:8080/user/studentauth/${id}`, acceptdata)
      .then((res) => {
        console.log("accept-back:", res.data);
        Settrigger(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const final = getusers?.map((user, index) => ({
      ...user,
      but: (
        <div style={{ textAlign: "center" }}>
          <Space size={"middle"}>
            <Tag color={user.authorities.student == 1 ? "green" : "red"}>
              {user.authorities.student == 1 ? "Accepted" : "Rejected"}
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
      title = "STUDENT LIST";
    }
    if (userTypes == 3) {
      action = "list_but";
      title = "STUDENT DETAILS";
    }
    if (userTypes == 2) {
      action = "request_but";
      title = "STUDENT REQUEST";
    }
    setData(action);
    setTitle(title);
    setInterval(() => {
      setLoading(false);
    }, 1000*5);
  }, [user]);

  const columns = [ //table-col-style
    {
      title: () => <div className="table-col-style">Firstname</div>,
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: () => <div className="table-col-style">Lastname</div>,
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: () => <div className="table-col-style">Age</div>,
      dataIndex: "age",
      key: "age",
    },
    {
      title: () => <div className="table-col-style">Email</div>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => <div className="table-col-style">Mobile</div>,
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: () => <div className="table-col-style">Action</div>,
      dataIndex: data,
      key: "action",
    },
  ];

  if (
    sessiondata?.authorities?.admin == 1 ||
    sessiondata?.authorities?.staff_admin == 1
  ) {
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
                  className="list-avathar"
                  src={imgurl}
                  height={157}
                  width={147}
                ></img>
              ) : (
                <div className="list-avathar">
                  <div style={{ marginTop: "25px", marginLeft: "25px" }}>
                    <HashLoader color="#0e1630" loading size={100} />
                  </div>
                </div>
              )}
            </Flex>
          </Modal>
          <Row className="list-row">
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
          <Row className="list-row-load" align={"middle"}>
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

export default ListUser;
