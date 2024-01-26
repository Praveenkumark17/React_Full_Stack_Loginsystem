import { Button, Col, Modal, QRCode, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import { useNavigate } from "react-router-dom";

function ListUser() {
  const [user, setUser] = useState();

  const [getusers, Setgetusers] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgurl, Setimgurl] = useState();

  const [trigger, Settrigger] = useState(false);

  const navigate = useNavigate();

  const onView = async (id) => {
    await axios
      .get(`http://localhost:8080/user/getuserid/${id}`)
      .then((res) => (console.log(res.data), Setselectuser(res.data)))
      .catch((err) => console.log(err));
    console.log(id);

    setIsModalOpen(true);
  };

  useEffect(() => {
    const qrvalue = { ...selectuser };
    delete qrvalue["password"];
    delete qrvalue["id"];
    delete qrvalue["authorities"];
    SetQrvalues(qrvalue);
  }, [selectuser]);

  const onOk = () => {
    setIsModalOpen(false);
  };

  const onRemove = async (id) => {
    await axios
      .delete(`http://localhost:8080/user/deleteuser/${id}`)
      .then((res) => {
        console.log(res.data);
        Settrigger(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const updateuser = async () => {
      await axios
        .get("http://localhost:8080/user/getuser")
        .then((res) => {
          const result = res.data;
          const users = result.filter((user) => user.authorities.admin !== 1);
          Setgetusers(users);
          console.log("final list:", users);
        })
        .catch((err) => console.log(err.data));
    };
    updateuser();
  }, [trigger]);

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
    }));
    setUser(final);
  }, [getusers]);

  const columns = [
    {
      title: () => <div style={{ textAlign: "center" }}>FirstName</div>,
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>LastName</div>,
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Age</div>,
      dataIndex: "age",
      key: "age",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Email</div>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Mobile</div>,
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Action</div>,
      dataIndex: "but",
      key: "action",
    },
  ];

  if (user) {
    return (
      <>
        <Modal
          title={selectuser?.firstname + " " + selectuser?.lastname}
          open={isModalOpen}
          onOk={onOk}
          onCancel={onOk}
        >
            <QRCode value={JSON.stringify(qrvalues)} />
            <img src={imgurl} height={100}></img>
        </Modal>
        <Row className="list-row">
          <Col span={14} offset={5}>
            <Table
              dataSource={user}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </Col>
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
