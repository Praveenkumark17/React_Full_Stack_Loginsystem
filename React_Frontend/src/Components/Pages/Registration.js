import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "../Css/register.css";
import Card from "antd/es/card/Card";
import { Option } from "antd/es/mentions";
import axios from "axios";
import CryptoJS from "crypto-js";
import { UploadOutlined } from "@ant-design/icons";
import { json } from "react-router-dom";

function Registration() {
  const [finaldatas, setfinalDatas] = useState();

  const dateFormatList = ["YYYY-MM-DD"];

  const [date, SetDate] = useState();
  const [user, Setuser] = useState();
  const [userid, SetuserId] = useState();

  let userids = user + date;

  const [forms] = Form.useForm();

  const [check, setCheck] = useState(false);

  const [trigger, SetTrigger] = useState(false);

  const [getdata, setGetdata] = useState();

  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const ondate = (dates) => {
    console.log("date:", String(dates.date()).padStart(2, "0"));
    SetDate(String(dates.date()).padStart(2, "0"));
  };

  const onuser = (e) => {

    console.log("name:", e);
    if(e == 0){
      Setuser("STUDENT-")
    }
    if(e == 1){
      Setuser("STAFF-")
    }
    // Setuser(e.target.value);
  };

  useEffect(() => {
    console.log(userids);
    SetuserId(userids);
  }, [date,user]);

  useEffect(() => {
    if (finaldatas) {
      console.log("FinalData", finaldatas);
    }
  }, [finaldatas]);

  useEffect(() => {
    if(trigger){
      const userdata = async () => {
        await axios
          .get("http://localhost:8080/user/getuser")
          .then(
            (res) => (console.log("get data:", res.data), setGetdata(res.data))
          )
          .catch((err) => console.log("get data error:", err));
      };
      userdata();
    }
  }, [trigger]);

  const props = {
    name: "file",
    onRemove: (file) => {
      setFileList([]);
      setImageUrl(null);
    },
    beforeUpload: (file) => {
      // return false;
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      } else {
        if (!isLt2M) {
          message.error("Image must smaller than 2MB!");
        } else {
          setFileList([file]);
          setImageUrl(URL.createObjectURL(file));
          return isJpgOrPng && isLt2M;
        }
      }
    },
    fileList,
  };

  const oncheck = (e) => {
    console.log("check box", e.target.checked);
    setCheck(e.target.checked);
    SetTrigger(!trigger)
  };

  const onFinish = async (e) => {
    delete e["cpassword"];
    delete e["remember"];

    //Password encrypted
    // const passphrase = "Praveen12GmqG7Io";
    // const encrypted = CryptoJS.AES.encrypt(
    //   e["password"],
    //   passphrase
    // ).toString();

    // e["password"] = encrypted;
    const roll = e["category"];
    e["userid"] = userid;
    e["authorities"] = { admin: 0, staff_admin: roll == 1 ? 2 : 0 ,student: roll == 0 ? 2 : 0 };

    console.log("Register data:", e);

    const useremail = getdata.find((user) => user.email === e.email);
    const usermobile = getdata.find((user) => user.mobile === e.mobile);
    console.log("user:", useremail);
    if (check) {
      if (useremail && usermobile) {
        message.open({
          type: "error",
          content: "Email and Mobile already registered",
        });
      } else {
        if (useremail) {
          message.open({
            type: "error",
            content: "Email Already Registered",
          });
        } else {
          if (usermobile) {
            message.open({
              type: "error",
              content: "Mobile No. Already Registered",
            });
          } else {
            setfinalDatas(e);

            const formData = new FormData();
            formData.append("file", fileList[0]);
            formData.append(
              "user",
              new Blob([JSON.stringify(e)], { type: "application/json" })
            );

            console.log("File", formData.getAll("file"));
            console.log("user", formData.getAll("user"));

            await axios
              .post("http://localhost:8080/user/postuser", formData)
              .then((res) => console.log("Backend_Success", res))
              .catch((err) => console.log("Backend_error", err));

            setCheck(false);
            forms.resetFields();
            setFileList([]);
            setImageUrl(null);
            message.open({
              type: "success",
              content: user=="STAFF-"?"Your Request Submitted to Admin":"Data Submitted Successfull",
              duration: 2,
            });
          }
        }
      }
    } else {
      message.open({
        type: "warning",
        content: "Agree the Remember",
        duration: 2,
      });
    }
  };

  return (
    <>
      <Row className="register-row" align={"middle"}>
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
                Sign Up
              </div>
            }
            className="logcard"
          >
            <div className="cardrow">
              <Row>
                <Col span={20} offset={2} className="cardcol">
                  <Form
                    form={forms}
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                    }}
                  >
                    <Form.Item
                      name={"firstname"}
                      label={"FirstName"}
                      rules={[
                        {
                          required: true,
                          message: "please enter firstname",
                          pattern: /^[A-Z][a-z]{2,20}$/,
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="firstname"
                        placeholder="Enter the Firstname"
                        className="input"
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
                        className="input"
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
                        onChange={ondate}
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"age"}
                      label={"Age"}
                      rules={[
                        {
                          required: true,
                          message: "please enter the age",
                        },
                        {
                          message: "Age between 20 - 60",
                          pattern: /^[2-6]\d{1}$/,
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber
                        className="input"
                        type="number"
                        placeholder="Enter the age"
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
                        className="input"
                        placeholder="Enter the mobile.no"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"email"}
                      label={"Email"}
                      rules={[
                        { required: true, message: "please enter email" },
                      ]}
                      hasFeedback
                    >
                      <Input
                        name="email"
                        placeholder="Enter the email"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"category"}
                      label={"Category"}
                      rules={[
                        {
                          required: true,
                          message: "please select category",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        placeholder="Select category"
                        style={{ width: "250px" }}
                        onChange={onuser}
                      >
                        <Option value={1}>Staff Request</Option>
                        <Option value={0}>Student</Option>
                      </Select>
                    </Form.Item>
                    {/* <Form.Item
                      name={"dept"}
                      label={"Department"}
                      rules={[
                        {
                          required: true,
                          message: "please select department",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        placeholder="Select Department"
                        style={{ width: "250px" }}
                      >
                        <Option value="A+">CSE</Option>
                        <Option value="A-">EEE</Option>
                        <Option value="B+">MECH</Option>
                        <Option value="B-">ECE</Option>
                        <Option value="AB+">CIVIL</Option>
                      </Select>
                    </Form.Item> */}
                    <Form.Item
                      name={"password"}
                      label={"Password"}
                      rules={[
                        {
                          required: true,
                          message: "please enter password",
                          pattern:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        name="password"
                        placeholder="Enter the password"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"cpassword"}
                      dependencies={["password"]}
                      label={"Re-Password"}
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
                        name="cpassword"
                        placeholder="Enter the re-password"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"file"}
                      label={"Images"}
                      rules={[
                        {
                          required: true,
                          message: "please upload Image",
                        },
                      ]}
                      hasFeedback
                    >
                      <Upload maxCount={1} {...props}>
                        <Button icon={<UploadOutlined />} className="input">
                          Click to Upload
                        </Button>
                      </Upload>
                      {imageUrl && (
                        <>
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(
                                  `current index: ${current}, prev index: ${prev}`
                                ),
                            }}
                          >
                            <Image width={100} src={imageUrl} />
                          </Image.PreviewGroup>
                        </>
                      )}
                    </Form.Item>
                    <Flex justify="start">
                      <Form.Item
                        name={"remember"}
                        style={{ marginRight: "80px" }}
                      >
                        <Checkbox onChange={oncheck}>Remember me</Checkbox>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Flex>
                  </Form>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Registration;
