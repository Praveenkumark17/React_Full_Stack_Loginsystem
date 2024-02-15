import { Button, Flex, Modal, QRCode, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import "../Css/listuser.css";
import {  useNavigate } from "react-router-dom";

function ListUser() {
  const [user, setUser] = useState();

  const [getusers, Setgetusers] = useState();

  const [selectuser, Setselectuser] = useState();

  const [qrvalues, SetQrvalues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgurl, Setimgurl] = useState();

  const [trigger, Settrigger] = useState();

  const [sessiondata,setSessiondata] = useState();

  const navigate = useNavigate();

  useEffect(()=>{
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("staff session",datas)
  },[])

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
    qrvalue["roll"]= "Student";
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
          const users = result.filter(
            (user) =>
              user.authorities.staff_admin == 0 && user.authorities.admin == 0
          );
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
      dataIndex: "but",
      key: "action",
    },
  ];

  if((sessiondata?.authorities?.admin==1) || (sessiondata?.authorities?.staff_admin==1)){
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
            <Flex justify="center" style={{ width: "100%" }} align="center">
              <Table
                title={() => <div className="table-title">STUDENT LIST</div>}
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
          <Row className="list-row-load" align={"middle"}>
            <Flex justify="center" style={{ width: "100%" }}>
              <HashLoader color="#0e1630" loading size={110} />
            </Flex>
          </Row>
        </>
      );
    }
  }else{
    return navigate("/error", {
      state: {
        message: "Sorry, you are not authorized to access this page.",
        errorCode: 403,
        type:1
      },
    });
  }
}

export default ListUser;
