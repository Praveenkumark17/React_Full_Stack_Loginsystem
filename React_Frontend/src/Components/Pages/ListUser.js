import { Button, Col, Modal, QRCode, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import { useNavigate } from "react-router-dom";

function ListUser() {
  const [user, setUser] = useState();

  const [sdata, setSdata] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const sessiondata = sessionStorage.getItem("userdata");

  useEffect(() => {
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSdata(datas);
    console.log(datas);
    console.log("session admin:", datas.authorities.admin);
  }, []);

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
        const updatedUsers = user.filter((user) => user.id !== id);
        setUser(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getUserList = async () => {
      const list = await axios.get("http://localhost:8080/user/getuser");
      console.log("get U List:", list.data);
      const data = list.data;
      const filter = data.filter((user) => user?.id !== sdata?.id);
      const final = filter.map((user, index) => ({
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
    };
    getUserList();
  }, [user]);

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
        <Modal title="User Page" open={isModalOpen} onOk={onOk} onCancel={onOk}>
          <QRCode value={JSON.stringify(qrvalues)} />
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
