import { Button, Col, Flex, Modal, QRCode, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function ListUser() {
  const [user, setUser] = useState();

  const [getusers, Setgetusers] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgurl, Setimgurl] = useState();

  const [trigger, Settrigger] = useState();

  const navigate = useNavigate();

  const location = useLocation();
  const userType = location.state;

  useEffect(() => {
    console.log("states:", userType);
  }, [userType]);

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

  const onaction = async (id,val) => {
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
          if (userType == 0) {
            const users = result.filter(
              (user) =>
                user.authorities.staff_admin == 0 && user.authorities.admin == 0
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userType == 2) {
            const users = result.filter(
              (user) =>
                user.authorities.staff_admin == 2 && user.authorities.admin == 0
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
          if (userType == 1) {
            const users = result.filter(
              (user) =>
                user.authorities.staff_admin == 1 && user.authorities.admin == 0
            );
            Setgetusers(users);
            console.log("final list:", users);
          }
        })
        .catch((err) => console.log(err.data));
    };
    updateuser();
  }, [trigger, userType]);

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
              onClick={() => onaction(user.id,1)}
            >
              Accept
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => onaction(user.id,3)}
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

  const columns = [
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">FirstName</p>
        </div>
      ),
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">LastName</p>
        </div>
      ),
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">Age</p>
        </div>
      ),
      dataIndex: "age",
      key: "age",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">Email</p>
        </div>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">Mobile</p>
        </div>
      ),
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: () => (
        <div style={{ textAlign: "center" }}>
          <p className="table-col-style">Action</p>
        </div>
      ),
      dataIndex: userType == 0 || userType == 1 ? "but" : "request_but",
      key: "action",
    },
  ];

  if (user) {
    return (
      <>
        <Modal
          title={
            <div>
              <h3>Mr. {selectuser?.firstname + " " + selectuser?.lastname}</h3>
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
          <Flex justify="center" style={{ width: "100%" }}>
            <Table
              title={() => (
                <div className="table-title">
                  {userType == 0
                    ? "STUDENT LIST"
                    : userType == 2
                    ? "STAFF REQUEST"
                    : "STAFF LIST"}
                </div>
              )}
              style={{ fontWeight: "bold" }}
              dataSource={user}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </Flex>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row className="list-row-load">
          <Col span={8} offset={11}>
            <div>
              <HashLoader color="#0e1630" loading size={110} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default ListUser;
