import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Tooltip,
  Row,
  Col,
  InputNumber,
  Select,
  DatePicker,
  message,
} from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "../Css/editprofile.css";
import axios from "axios";
import { LiaUserEditSolid } from "react-icons/lia";

function EditProfile() {
  const [edata, setEData] = useState([]);

  const [enable, setEnable] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [enables, setEnables] = useState(false);

  const [update, setUpdate] = useState();

  const formRef = useRef();

  const navigate = useNavigate();

  const dateFormatList = ["YYYY-MM-DD"];

  useEffect(() => {
    const sessiondatas = sessionStorage.getItem("userdata");
    const datas = sessiondatas ? JSON.parse(sessiondatas) : {};
    setEData(datas);
    console.log("Edit page:", datas);
  }, []);

  useEffect(() => {
    formRef.current.setFieldsValue({
      firstname: edata.firstname,
      lastname: edata.lastname,
      dob: dayjs(edata.dob),
      age: edata.age,
      blood_group: edata.blood_group,
      mobile: edata.mobile,
      email: edata.email,
    });
  }, [edata]);

  const onreset = () => {
    formRef.current.setFieldsValue({
      firstname: edata.firstname,
      lastname: edata.lastname,
      dob: dayjs(edata.dob),
      age: edata.age,
      blood_group: edata.blood_group,
      mobile: edata.mobile,
      email: edata.email,
    });
    setEnables(false);
    setEnable(true);
    navigate("/dashboard");
  };

  const onenable = () => {
    setEnable(false);
    setEnables(true);
  };

  const onchanges = (value) => {
    if(value){
      setEnabled(false);
    }
  }

  useEffect(() => {
    if (update) {
      sessionStorage.setItem("userdata", JSON.stringify(update));
      setEnables(false);
      setEnable(true);
      setEnabled(true);
      message.open({
        type:"success",
        content:"Update data Success"
      })
    }
  }, [update]);

  const onfinish = async (value) => {
    const dob = value.dob.format('YYYY-MM-DD');
    const newValue = { ...value, dob };
    console.log(value.dob);
    await axios
      .put(`http://localhost:8080/user/update/${edata.id}`, newValue)
      .then((res) => {
        console.log("put success:", res.data);
        setUpdate(res.data);
      })
      .catch((err) => console.log("put fail:", err));
  };

  return (
    <>
      <Row className="edit-row">
        <Col span={9} offset={8}>
          <Card
            title={
              <>
                <Row>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <h3 style={{ textAlign: "center" }}>
                      Profile <UserAddOutlined />
                    </h3>
                  </Col>
                  <Col span={8}>
                    <h3
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <Tooltip
                        placement="topLeft"
                        title={
                          enable ? "Click to Edit profile" : "You Can Edit Now"
                        }
                      >
                        <Button
                          shape="circle"
                          type="link"
                          icon={enables?<LiaUserEditSolid size={20} color="gray"/>:<LiaUserEditSolid size={20} color="black"/>}
                          size="middle"
                          onClick={onenable}
                          disabled={enables}
                        ></Button>
                      </Tooltip>
                    </h3>
                  </Col>
                </Row>
              </>
            }
            className="edit-logcards"
          >
            <Row>
              <Col span={19} offset={2}>
                <Form
                  autoComplete="off"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                  ref={formRef}
                  onFinish={onfinish}
                >
                  <Form.Item
                    label="FirstName"
                    name={"firstname"}
                    rules={[
                      { required: true, message: "please enter user name" },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="firstname"
                      placeholder="Enter the first name"
                      className="edit-input"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name={"lastname"}
                    label={"LastName"}
                    rules={[
                      {
                        required: true,
                        message: "please enter lastname",
                        pattern: /^[A-Za-z]{1,10}$/,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="lastname"
                      placeholder="Enter the Lastname"
                      className="edit-input"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name={"dob"}
                    label={"Dob"}
                    rules={[{ required: true, message: "please pick dob" }]}
                    hasFeedback
                  >
                    <DatePicker
                      format={dateFormatList}
                      className="edit-input"
                      disabled={enable}
                      onChange={onchanges}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"age"}
                    label={"Age"}
                    rules={[
                      {
                        required: true,
                        message: "Age between 20 - 60",
                        pattern: /^[2-6]\d{1}$/,
                      },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      className="edit-input"
                      type="number"
                      placeholder="Enter the age"
                      disabled={enable}
                      onChange={onchanges}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"blood_group"}
                    label={"BloodGroup"}
                    rules={[
                      {
                        required: true,
                        message: "please select blood group",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select Blood group"
                      style={{ width: "250px" }}
                      disabled={enable}
                      onChange={onchanges}
                    >
                      <Option value="A+">A+</Option>
                      <Option value="A-">A-</Option>
                      <Option value="B+">B+</Option>
                      <Option value="B-">B-</Option>
                      <Option value="AB+">AB+</Option>
                      <Option value="AB-">AB-</Option>
                      <Option value="O+">O+</Option>
                      <Option value="O-">O-</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"mobile"}
                    label={"Mobile.No"}
                    rules={[
                      {
                        required: true,
                        message: "please Enter Mobile.no",
                      },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Invalid Mobile Number",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      className="edit-input"
                      placeholder="Enter the mobile.no"
                      disabled={enable}
                      onChange={onchanges}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"email"}
                    label={"Email"}
                    rules={[{ required: true, message: "please enter email" }]}
                    hasFeedback
                  >
                    <Input
                      name="email"
                      placeholder="Enter the email"
                      className="edit-input"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item>
                    <Row style={{ marginRight: "25px" }}>
                      <Col span={8}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={enable}
                          danger
                          onClick={onreset}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col span={8}></Col>
                      <Col span={8}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={enabled}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
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

export default EditProfile;
