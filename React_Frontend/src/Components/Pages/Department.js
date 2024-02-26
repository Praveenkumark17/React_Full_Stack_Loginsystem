import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import "../Css/department.css";
import { PiTreeStructureBold } from "react-icons/pi";
import axios from "axios";
import { HashLoader } from "react-spinners";

function Department() {
  const [trigger, setTrigger] = useState(false);

  const [getdept, setgetDept] = useState();

  const [forms] = Form.useForm();

  const onremove = async (id) => {
    await axios
      .delete(`http://localhost:8080/user/deletedept/${id}`)
      .then((res) => (console.log(res.data), setTrigger(!trigger)))
      .catch((err) => console.log(err.data));
  };

  const onview = async (id) =>{
    await axios
      .get(`http://localhost:8080/user/userdeptno/${id}`)
      .then((res) => {(console.log("deptno",res.data));})
      .catch((err) => console.log("dept_err",err.data));
  }

  // useEffect(()=>{
  //   const getdeptno = async () =>{
  //     await axios
  //     .get(`http://localhost:8080/user/userdeptno/${109}`)
  //     .then((res) => {(console.log("deptno",res.data));})
  //     .catch((err) => console.log("dept_err",err.data));
  //   }
  //   getdeptno();
  // },[getdept])

  useEffect(() => {
    const getdept = async () => {
      await axios
        .get("http://localhost:8080/user/getdept")
        .then((res, index) => {
          console.log("getdept_success", res.data);
          const result = res.data;
          const final = result.map((user, index) => ({
            ...user,
            sno: index + 1,
            action: (
              <>
                <Space>
                  <Button type="primary" onClick={() => onview(user.id)}>View</Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => onremove(user.id)}
                  >
                    Remove
                  </Button>
                </Space>
              </>
            ),
          }));
          setgetDept(final);
          console.log("dept_final", final);
        })
        .catch((err) => {
          console.log("getdept_fail", err.data);
        });
    };
    getdept();
  }, [trigger]);

  const onfinish = async (e) => {
    const dname = e["dept_name"];
    const num = e["dept_num"];
    const save_data = { deptname: dname, deptno: num, studentcount: 0 };
    await axios
      .post("http://localhost:8080/user/dept", save_data)
      .then((res) => {
        console.log("dept_success", res.data);
        forms.resetFields();
        setTrigger(!trigger);
      })
      .catch((err) => console.log("dept_fail", err.data));
    console.log(e);
  };

  const columns = [
    {
      title: () => <div className="dept-table-col">S.No</div>,
      dataIndex: "sno",
      key: "S.no",
    },
    {
      title: () => <div className="dept-table-col">Department_Name</div>,
      dataIndex: "deptname",
      key: "department_name",
    },
    {
      title: () => <div className="dept-table-col">Department_No</div>,
      dataIndex: "deptno",
      key: "department_no",
    },
    {
      title: () => <div className="dept-table-col">Student_Count</div>,
      dataIndex: "studentcount",
      key: "Student_count",
    },
    {
      title: () => <div className="dept-table-col">Action</div>,
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <>
      <Flex className="input-box" justify="center" align="center">
        <Form onFinish={onfinish} form={forms}>
          <Flex justify="center" align="center">
            <Card className="dept-card">
              <Space size={"middle"}>
                <Form.Item
                  name={"dept_name"}
                  rules={[
                    {
                      required: true,
                      message: "please enter department",
                      pattern: /^[A-Za-z\s]+$/,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{
                      width: "20vw",
                    }}
                    addonBefore={<PiTreeStructureBold size={20} />}
                    placeholder="Department Name"
                  />
                </Form.Item>
                <Space.Compact size="middle">
                  <Form.Item
                    name={"dept_num"}
                    rules={[
                      {
                        required: true,
                        message: "please enter department_num",
                      },
                      {
                        pattern: /^[1-9]\d{2}$/,
                        message: "please valid code",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      style={{
                        width: "15vw",
                      }}
                      placeholder="Department Code"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "rgb(29, 226, 196)",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      ADD
                    </Button>
                  </Form.Item>
                </Space.Compact>
              </Space>
            </Card>
          </Flex>
        </Form>
      </Flex>
      <div
        style={{
          width: "100%",
          height: "3px",
          backgroundColor: "rgb(0, 21, 41)",
        }}
      ></div>
      {getdept ? (
        <Flex className="output-box" justify="center">
          <Flex vertical>
            <Flex justify="center">
              <h2 style={{ color: "white" }}>DEPARTMENT LIST</h2>
            </Flex>
            <Flex>
              <Table
                columns={columns}
                dataSource={getdept}
                className="dept-table"
                pagination={{ pageSize: 4 }}
              />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex
            justify="center"
            style={{ width: "100%", height: "60.7vh" }}
            align="center"
          >
            <HashLoader color="#0e1630" loading size={110} />
          </Flex>
        </>
      )}
    </>
  );
}

export default Department;
