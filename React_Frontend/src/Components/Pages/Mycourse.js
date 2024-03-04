import { Card, Col, Flex, Row, Space, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/mycourse.css";
import { HashLoader } from "react-spinners";

function Mycourse() {
  const [sessiondata, setSessiondata] = useState();

  const [getcourse, setGetcourse] = useState([]);

  const [getdeptno, setGedeptno] = useState();

  const [trigger, setTrigger] = useState(false);

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

  if (sessiondata?.authorities?.staff_admin == 1) {
    return (
      <>
        <Flex style={{ height: "5%", width: "100%" }} justify="center">
          <h2 style={{ color: "rgb(0, 21, 41)" }}>MY COURSE</h2>
        </Flex>
        <div
          style={{
            height: "80%",
            width: "70%",
            margin: "5% 15%",
            overflow: "auto",
          }}
          className="mycourse-box"
        >
          {getcourse ? (
            <Row gutter={[16, 16]}>
              {getcourse?.map((user, index) => (
                <Col span={24} key={index}>
                  <Card
                    className="course-card"
                    onClick={() =>
                      message.open({
                        type: "success",
                        content: `card work ${index + 1}`,
                      })
                    }
                  >
                    <Flex
                      vertical
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      <Flex justify="space-between">
                        <Flex>
                          <Space>
                            <div style={{ width: "6vw" }}>Course</div>
                            <div>:</div>
                            <div style={{ color: "blue" }}>
                              {user.coursename}
                            </div>
                          </Space>
                        </Flex>
                        <Flex>
                          <Space>
                            <div>Student count:</div>
                            <div style={{ color: "red" }}>
                              {user.studentcount}
                            </div>
                          </Space>
                        </Flex>
                      </Flex>
                      <div style={{ height: "1.5vh" }}></div>
                      <Flex>
                        <Space>
                          <div style={{ width: "6vw" }}>Department</div>
                          <div>:</div>
                          <div style={{ color: "red" }}>{user.deptname}</div>
                        </Space>
                      </Flex>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Flex justify="center" style={{ height: "100%" }} align="center">
                <HashLoader color="#0e1630" loading size={110} />
              </Flex>
            </>
          )}
        </div>
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
