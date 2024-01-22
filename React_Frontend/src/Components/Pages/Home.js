import { Button, Card, Col, Flex, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import "../Css/home.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState();

  const [getdataid, setgetDataid] = useState();

  const [getdata, setGetdata] = useState();

  const [pass, setPass] = useState();

  const [log, setLog] = useState();

  const navigate = useNavigate();

  const sendData = async (value) => {
    const datas = { userid: value.userid, password: value.password };
    await axios
      .post("http://localhost:8080/user/text", datas)
      .then((res) => {
        const resdata = res.data;
        const passphrase = "Praveen12GmqG7Io";
        const bytes = CryptoJS.AES.decrypt(resdata.password, passphrase);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setGetdata({ ...resdata, password: decrypted });
        console.log("back data 3:", resdata);
      })
      .catch((err) => {
        console.log("backend error 3:", err);
        message.open({
          type: "error",
          content: "Login error: Invalid Data",
          duration: 2,
        });
        setPass(null);
        setGetdata(null);
      });
  };

  useEffect(() => {
    if (getdata) {
      validate();
    }
  }, [getdata]);

  const validate = () => {
    if (getdata) {
      console.log("last id:", getdata.userid);
      console.log("last pass:", getdata.password);
      if (
        data.userid === getdata.userid &&
        data.password === getdata.password
      ) {
        console.log("Log success:", getdata.password, data.userid);
        message.open({
          type: "success",
          content: "Login success",
          duration: 1,
        });
        sessionStorage.setItem("userdata",JSON.stringify(getdata))
        navigate('/dashboard')
      } else {
        console.log("Log error:");
        message.open({
          type: "error",
          content: "Login error in",
          duration: 2,
        });
      }
    }
  };

  const onfinished = (value) => {
    console.log("data 1:", value);
    setData(value);
    sendData(value);
  };

  return (
    <>
      <Row className="rows">
        <Col span={8} offset={8}>
          <Card
            title={<div style={{ textAlign: "center" }}>Sign In</div>}
            className="logcards"
          >
            
            <Form
              onFinish={onfinished}
              autoComplete="off"
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                name={"userid"}
                rules={[{ required: true, message: "please enter user name" }]}
              >
                <Input
                  addonBefore={<UserOutlined />}
                  name="userid"
                  placeholder="Enter the user name"
                />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[{ required: true, message: "please enter password" }]}
              >
                <Input.Password
                  addonBefore={<LockOutlined />}
                  name="password"
                  placeholder="Enter the user password"
                />
              </Form.Item>
              <Flex justify="flex-end">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
