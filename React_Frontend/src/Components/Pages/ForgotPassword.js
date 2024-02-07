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
import "../Css/forgotpass.css";
import { LuKeyRound, LuMail } from "react-icons/lu";
import axios from "axios";

function ForgotPassword() {
  const [disabled, setDisabled] = useState(true);
  const [feed, setFeed] = useState(false);

  const [mail, setMail] = useState();

  const onVerify = (e) => {
    delete e["mail"];
    console.log("value", e);
    console.log("value success");
  };

  const onSend = async (e) => {
    delete e["otp"];
    console.log("value", e);

    const random_num = Math.floor(100000 + Math.random() * 900000);

    console.log("random", random_num);

    const config = {
      // Username: "userlogs@yopmail.com",
      // Password: "0A843C50F748F0C5D14A4FAE1CD9FACABD7B",
      // Host: "smtp.elasticemail.com",
      // Port: 2525,
      SecureToken: "0d0f0623-1ef6-4e56-8e17-2c3c277221c1",
      To: e["mail"],
      From: "praveenkumar24622@gmail.com",
      Subject: "Test Subject",
      Body: `<div>
        <h1
          style={{ display: "flex", justifyContent: "center", color: "red" }}
        >
          User Logs
        </h1>
        <Flex><h3 style={{color:"blueviolet"}}>User Logs OTP is ${random_num} for Forgot Passwords</h3></Flex>
      </div>`,
      IsHtml: true,
    };

    await axios
      .get(`http://localhost:8080/user/findemail/${e["mail"]}`)
      .then((res) => {
        console.log("success email:", res.data);
        // message.open({ type: "success", content: "Email Send success" });

        if (window.Email) {
          window.Email.send(config)
            .then((m) => message.open({ type: "success", content: "OTP Send" }))
            .catch((err) => console.log(err));
        }

        setDisabled(false);
        setFeed(true);
        setMail(e["mail"]);
      })
      .catch((err) => {
        console.log("error:", err);
        message.open({ type: "error", content: "Email Not Found in list" });
      });
  };

  return (
    <>
      <Row className="pass-row">
        <Col span={8} offset={8}>
          <Card
            title={
              <Flex justify="center">
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "rgb(16, 127, 253)",
                  }}
                >
                  Forgot Password
                </div>
              </Flex>
            }
            className="pass-logcards"
          >
            <div
              style={{
                marginTop: "0px",
                color: "red",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {mail ? "Dont't Refresh This Page" : ""}
            </div>
            <Form
              autoComplete="off"
              style={{
                marginTop: "20px",
              }}
              onFinish={mail ? onVerify : onSend}
            >
              <Form.Item
                name={"mail"}
                rules={[
                  {
                    required: disabled,
                    message: "please enter password",
                  },
                ]}
                initialValue={""}
                hasFeedback={disabled}
              >
                <Input
                  addonBefore={<LuMail size={20} />}
                  name="mail"
                  placeholder="Enter the Mail Id"
                  className="edit-input"
                  disabled={feed}
                />
              </Form.Item>
              <Form.Item
                name={"otp"}
                rules={[
                  {
                    required: feed,
                    message: "please enter password",
                  },
                ]}
                hasFeedback={feed}
              >
                <Input
                  addonBefore={<LuKeyRound size={20} />}
                  name="otp"
                  placeholder="Enter the OTP "
                  className="edit-input"
                  disabled={disabled}
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="end">
                  <Button type="primary" htmlType="submit">
                    {mail ? "Verify OTP" : "Send OTP"}
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ForgotPassword;
