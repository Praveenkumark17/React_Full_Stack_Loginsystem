import { Button, Card, Col, Flex, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import "../Css/home.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";

function Home() {
  const [data, setData] = useState();

  const [getsdata, setgetsData] = useState();

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
      console.log("staff admin:", getdata?.authorities?.staff_admin);
      if (
        data.userid === getdata.userid &&
        data.password === getdata.password
      ) {
        if (getdata?.authorities?.staff_admin !== 2) {
          console.log("Log success:", getdata.password, data.userid);
          message.open({
            type: "success",
            content: "Login success",
            duration: 1,
          });
          sessionStorage.setItem("userdata", JSON.stringify(getdata));
          navigate("/dashboard");
        } else {
          message.open({
            type: "error",
            content: "Admin Not Accept in your request",
            duration: 2,
          });
        }
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
            title={
              <div
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "600",
                  color: "rgb(16, 127, 253)",
                }}
              >
                Sign In
              </div>
            }
            className="logcards"
          >
            <Form
              onFinish={onfinished}
              autoComplete="off"
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                name={"userid"}
                rules={[{ required: true, message: "please enter user id" }]}
              >
                <Input
                  addonBefore={<LuUser2 size={20} />}
                  name="userid"
                  placeholder="Enter the user id"
                />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[{ required: true, message: "please enter password" }]}
              >
                <Input.Password
                  addonBefore={<MdLockOutline size={20} />}
                  name="password"
                  placeholder="Enter the user password"
                />
              </Form.Item>
              <Flex justify="space-between" className="but_flex">
                <Flex vertical>
                  <Form.Item>
                    <p className="new_user_but">
                      <Link to={"/register"} className="but_newuser">
                        New User? Sign Up
                      </Link>
                    </p>
                    <p className="new_user_but">
                      <Link to={"/forgot_Password"} className="but_forgotuser">
                        Forgot Password?
                      </Link>
                    </p>
                  </Form.Item>
                </Flex>
                <Flex justify="center" vertical>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Flex>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
