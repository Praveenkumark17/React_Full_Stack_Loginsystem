import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
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
import CryptoJS from "crypto-js";
import "../Css/resetpass.css";
import axios from "axios";

function ResetPassword() {
  const [data, setData] = useState();

  const [forms] = Form.useForm();

  const sessiondata = sessionStorage.getItem("forgotdata");

  useEffect(() => {
    if (sessiondata) {
      const datas = sessiondata ? JSON.parse(sessiondata) : {};
      setData(datas);
      console.log("reset_session:", datas);
    }
  }, [sessiondata]);

  const navigate = useNavigate();

  window.onbeforeunload = function () {
    sessionStorage.clear();
  };
  window.onpopstate = function () {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!sessiondata) {
      navigate("/error", {
        state: {
          message: "Sorry, the page you visited does not exist to reset your password.",
          errorCode: 404,
        },
      })
    }
  }, [!sessiondata]);

  const onfinish = async (e) => {
    console.log("reset_value:", e.password);
    const passphrase = "Praveen12GmqG7Io";
    const encrypted = CryptoJS.AES.encrypt(
      e["password"],
      passphrase
    ).toString();
    e["password"] = encrypted;
    console.log("reset_encrypt:", e.password);
    const send = { password: e.password };
    if (e.password) {
      await axios
        .put(`http://localhost:8080/user/updatepass/${data.id}`, send)
        .then((res) => {
          console.log("put pass succ:", res);
          forms.resetFields();
          message.open({
            type: "success",
            content: "Password Reseted",
            duration: 2,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log("put pass fail:", err);
          message.open({
            type: "error",
            content: "Server Error",
            duration: 2,
          });
        });
    }
  };

  if (sessiondata) {
    return (
      <>
        <Row className="reset_row" align={"middle"}>
          <Col span={8} offset={8}>
            <Card
              title={
                <Flex justify="center">
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Reset Password
                  </div>
                </Flex>
              }
            >
              <Row>
                <Col span={22} offset={0}>
                  <Form
                    form={forms}
                    autoComplete="off"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      marginTop: "20px",
                    }}
                    onFinish={onfinish}
                  >
                    <Form.Item
                      name={"password"}
                      label={"New Password"}
                      rules={[
                        {
                          required: true,
                          message: "please enter password",
                          pattern:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                        },
                      ]}
                      initialValue={""}
                      hasFeedback
                    >
                      <Input.Password
                        name="password"
                        placeholder="Enter the password"
                        className="reset-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"cpassword"}
                      label={"Re-New Password"}
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "please enter re-password",
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
                        placeholder="Enter the re-password"
                        className="change-input"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" danger>
                        Reset
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
}

export default ResetPassword;
