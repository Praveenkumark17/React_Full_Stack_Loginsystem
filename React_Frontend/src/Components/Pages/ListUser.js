import { Col, Row, Table } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import '../Css/listuser.css';

function ListUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserList = async () => {
      await axios.get("http://localhost:8080/user/getuser").then((res) => {
        console.log("get U List:", res.data);
        setUser(res.data);
      });
    };
    getUserList();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  if (user) {
    return (
      <>
        <Row className="list-row">
          <Col span={14} offset={5}>
            <Table dataSource={user}>
              <Column title={()=><div style={{textAlign:"center"}}>Firstname</div>} dataIndex="firstname" key="firstname"/>
              <Column title={()=><div style={{textAlign:"center"}}>Lastname</div>} dataIndex="lastname" key="lastname" />
              <Column title={()=><div style={{textAlign:"center"}}>Age</div>} dataIndex="age" key="age" align="center"/>
              <Column title={()=><div style={{textAlign:"center"}}>Email</div>} dataIndex="email" key="email" />
              <Column title={()=><div style={{textAlign:"center"}}>Dob</div>} dataIndex="dob" key="dob" align="center"/>
              <Column title={()=><div style={{textAlign:"center"}}>Mobile</div>} dataIndex="mobile" key="mobile" align="center"/>
            </Table>
          </Col>
        </Row>
      </>
    );
  } else {
    <ScaleLoader size={300} color="green" />;
  }
}

export default ListUser;
