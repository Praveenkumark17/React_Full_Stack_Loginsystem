import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "../Css/changepass.css";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdLockOpen } from "react-icons/md";

function Changepassword() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const sessiondatas = sessionStorage.getItem("userdata");
    const datas = sessiondatas ? JSON.parse(sessiondatas) : {};
    console.log("session pass:", datas);
    // const passphrase = "Praveen12GmqG7Io";
    // const bytes = CryptoJS.AES.decrypt(datas.password, passphrase);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("old pass:",decrypted);
    setData(datas);
  }, []);

  const onfinish = async (value) => {
    console.log("change pass:", data);
    console.log("change value:", value);
    const passphrase = "Praveen12GmqG7Io";
    const encrypted = CryptoJS.AES.encrypt(
      value["password"],
      passphrase
    ).toString();
    value["password"] = encrypted;
    console.log(value["password"]);
    const send = { password: value.password };
    if (value.opassword == data.password) {
      await axios
        .put(`http://localhost:8080/user/updatepass/${data.id}`, send)
        .then((res) => {
          console.log("put pass succ:", res);
          message.open({
            type: "success",
            content: "Password changed",
            duration: 2,
          });
          const cdata = res.data;
          const getdata = { ...data, password: cdata.password };
          sessionStorage.setItem("userdata", JSON.stringify(getdata));
          navigate("/dashboard");
        })
        .catch((err) => console.log("put pass fail:", err));
    } else {
      message.open({
        type: "error",
        content: "Wrong Password",
        duration: 2,
      });
    }
  };

  return (
    <>
      <Row className="pass-row" align={"middle"}>
        <Col span={12} offset={6}>
          <Card
            title={
              <Flex justify="center">
                <Space>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Change Password
                  </div>
                  <Flex align="center">
                    <MdLockOpen size={18} />
                  </Flex>
                </Space>
              </Flex>
            }
            className="pass-logcards"
          >
            <Row>
              <Col span={18} offset={3}>
                <Form
                  autoComplete="off"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                  onFinish={onfinish}
                >
                  <Form.Item
                    name={"opassword"}
                    label={"Old Password"}
                    rules={[
                      {
                        required: true,
                        message: "please enter old password",
                        pattern:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                      },
                    ]}
                    initialValue={""}
                    hasFeedback
                  >
                    <Input.Password
                      name="password"
                      placeholder="Enter the old password"
                      className="change-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"password"}
                    label={"New Password"}
                    rules={[
                      {
                        required: true,
                        message: "please enter new password",
                        pattern:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      name="password"
                      placeholder="Enter the new password"
                      className="change-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"cpassword"}
                    label={"Re-New Password"}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "please enter new re-password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(`Password Does't match!`)
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      name="password"
                      placeholder="Enter the confirm password"
                      className="change-input"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" danger>
                      Change
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Changepassword;
