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
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [disabled, setDisabled] = useState(true);
  const [feed, setFeed] = useState(false);

  const [mail, setMail] = useState();

  const [otp, setOtp] = useState();

  const [sendData, setSendData] = useState();

  const navigate = useNavigate();

  const onVerify = (e) => {
    delete e["mail"];
    console.log("otp val1:", otp);
    console.log("otp val2:", e["otp"]);
    if (otp == e["otp"]) {
      message.open({ type: "success", content: "OTP verify Success" });
      sessionStorage.setItem("forgotdata", JSON.stringify(sendData));
      navigate("/reset_Password");
      console.log("value", e);
      console.log("value success");
    } else {
      message.open({ type: "error", content: "OTP verify fail" });
    }
  };

  const onSend = async (e) => {
    delete e["otp"];
    console.log("value", e);

    const random_num = Math.floor(100000 + Math.random() * 900000);

    console.log("random:", random_num);
    setOtp(random_num);

    const emailBody = `<div style="margin: 0; padding: 0">
      <div style="width: 100%; display: flex; justify-content: center">
        <div
          style="
            margin-top: 20px;
            color: red;
            font-size: x-large;
            font-weight: 600;
          "
        >
          User Logs
        </div>
      </div><br/>
      <div style="
      font-weight: bold;
    ">Forgot Password OTP is <b>${random_num}</b></div>
    </div>`;

    const config = {
      SecureToken: "0d0f0623-1ef6-4e56-8e17-2c3c277221c1",
      To: e["mail"],
      From: "praveenkumar24622@gmail.com",
      Subject: "Test Subject",
      Body: emailBody,
      IsHtml: true,
    };

    await axios
      .get(`http://localhost:8080/user/findemail/${e["mail"]}`)
      .then((res) => {
        const result = res.data;
        console.log("success email:", result);
        console.log("ids:", result.id);
        setSendData(result);

        // if (window.Email) {
        //   window.Email.send(config)
        //     .then((m) => {
        //       message.open({ type: "success", content: "OTP Send" });
        //       setIds(result.id)
        //       setDisabled(false);
        //       setFeed(true);
        //       setMail(e["mail"]);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       message.open({ type: "error", content: "Server Error" });
        //     });
        // }

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
                <Flex justify="space-between">
                  <Link to={"/"} className="but_back">
                    Back To Sign In...
                  </Link>
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
