import { Button, Col, Modal, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import { useNavigate } from "react-router-dom";

function ListUser() {
  const [user, setUser] = useState();

  const [selectuser, Setselectuser] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const onView = async (id) => {
    await axios
      .get(`http://localhost:8080/user/getuserid/${id}`)
      .then((res) => (console.log(res.data), Setselectuser(res.data)))
      .catch((err) => console.log(err));
    console.log(id);

    setIsModalOpen(true);
  };

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
      await axios.get("http://localhost:8080/user/getuser").then((res) => {
        console.log("get U List:", res.data);
        const data = res.data;
        const final = data.map((user, index) => ({
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
      });
    };
    getUserList();
  }, []);

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
      // render: ()=>action
    },
  ];

  if (user) {
    return (
      <>
        <Modal title="User Page" open={isModalOpen} onOk={onOk} onCancel={onOk}>
          <h2>{selectuser?.firstname}</h2>
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
