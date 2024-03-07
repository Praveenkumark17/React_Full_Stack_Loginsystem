import { Button, Card, Col, Flex, Row, Space, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/mycourse.css";
import { HashLoader } from "react-spinners";
import { ArrowLeftOutlined } from "@ant-design/icons";

function Mycourse() {
  const [sessiondata, setSessiondata] = useState();

  const [getcourse, setGetcourse] = useState([]);

  const [getcourseuser, setGetcourseuser] = useState([]);

  const [openmodel, setOpenmodel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("staff session", datas);
  }, []);

  useEffect(() => {
    if (sessiondata) {
      const getcourse = async () => {
        await axios
          .get(`http://localhost:8080/user/getstaffcourseid/${sessiondata.id}`)
          .then((res) => {
            console.log("get_mycourse", res.data);
            const result = res.data;
            const final = result.map((user, index) => ({
              ...user,
              sno: index + 1,
            }));
            setGetcourse(final);
          });
      };
      getcourse();
    }
  }, [sessiondata]);

  const onview = async (cno) => {
    console.log("staff_value", cno + "-" + sessiondata.id);
    await axios
      .get(
        `http://localhost:8080/user/getuserbystaffidcourseid/${cno}/${sessiondata.id}`
      )
      .then((res) => {
        console.log(res.data);
        setGetcourseuser(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
    setOpenmodel(true);
  };

  const onclosemodel = () => {
    setOpenmodel(false);
  };

  const columns_student = [
    //dept-table-col
    {
      title: () => <div className="staff-table-col">Firstname</div>,
      dataIndex: "firstname",
      key: "name",
    },
    {
      title: () => <div className="staff-table-col">Lastname</div>,
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: () => <div className="staff-table-col">Age</div>,
      dataIndex: "age",
      key: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: () => <div className="staff-table-col">Email</div>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: () => <div className="staff-table-col">Mobile</div>,
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: () => <div className="staff-table-col">Dept.no</div>,
      dataIndex: "deptno",
      key: "deptno",
    },
  ];

  if (sessiondata?.authorities?.staff_admin == 1) {
    return (
      <>
        <Flex vertical className="mycourse-outer">
          <Flex
            vertical
            className={openmodel ? "mycourse-boxs1" : "mycourse-box1"}
          >
            <Flex style={{ height: "10%", width: "100%" }} justify="center">
              <h2 style={{ color: "rgb(0, 21, 41)" }}>MY COURSE</h2>
            </Flex>
            <div
              style={{
                height: "74%",
                width: "70%",
                margin: "3% 15%",
                overflow: "auto",
              }}
              className="mycourse-box"
            >
              {getcourse ? (
                <Row gutter={[16, 16]}>
                  {getcourse?.map((user, index) => (
                    <Col span={24} key={index}>
                      <Card
                        className="course-cards"
                        onClick={() => onview(user.courseno)}
                      >
                        <Flex
                          style={{ fontWeight: "bold", fontSize: "15px" }}
                          justify="space-between"
                        >
                          <Flex>
                            <Space size={"middle"}>
                              <Flex vertical>
                                <Space>
                                  <div style={{ width: "6vw" }}>Course</div>
                                  <div>:</div>
                                  <div style={{ color: "red" }}>
                                    {user.coursename}
                                  </div>
                                </Space>
                                <div style={{ height: "2vh" }}></div>
                                <Space>
                                  <div style={{ width: "6vw" }}>Department</div>
                                  <div>:</div>
                                  <div style={{ color: "blue" }}>
                                    {user.deptname}
                                  </div>
                                </Space>
                              </Flex>
                            </Space>
                          </Flex>
                          <Flex>
                            <Space>
                              <div style={{ width: "7vw" }}>Student Count</div>
                              <div>:</div>
                              <div style={{ color: "red" }}>
                                {user.studentcount}
                              </div>
                            </Space>
                          </Flex>
                        </Flex>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <>
                  <Flex
                    justify="center"
                    style={{ height: "100%" }}
                    align="center"
                  >
                    <HashLoader color="#0e1630" loading size={110} />
                  </Flex>
                </>
              )}
            </div>
          </Flex>
          <Flex
            vertical
            className={openmodel ? "mycourse-boxs2" : "mycourse-box2"}
          >
            <Flex
              align="center"
              // justify="center"
              style={{ width: "100%", height: "10%", position: "relative" }}
            >
              <Flex style={{ position: "absolute", left: "3vw" }}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  shape="circle"
                  onClick={onclosemodel}
                />
              </Flex>
              <Flex justify="center" style={{ width: "100%" }}>
                <h2>STUDENT LIST</h2>
              </Flex>
            </Flex>
            <Flex
              style={{ width: "100%", height: "90%" }}
              justify="center"
              align="center"
            >
              <Table columns={columns_student} dataSource={getcourseuser} className="staff-course-table"/>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  } else {
    return navigate("/error", {
      state: {
        message:
          "Sorry, you are not authorized to access staff course page. Go back",
        errorCode: 403,
        type: 1,
      },
    });
  }
}

export default Mycourse;
