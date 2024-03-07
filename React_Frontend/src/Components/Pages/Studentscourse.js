import { Avatar, Button, Card, Col, Flex, Row, Space, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "../Css/studentcourse.css";

function Studentscourse() {
  const [sessiondata, setSessiondata] = useState();

  const [getcourse, setGetcourse] = useState([]);

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
          .get(
            `http://localhost:8080/user/getstaffcoursebystuid/${sessiondata.id}/${sessiondata.deptno}`
          )
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
  }, [sessiondata, trigger]);

  const onregister = async (id, no, cname, cno, dno, sname, path,sid) => {
    console.log("student_course", id + "-" + no);
    const sendvalue = { studentcount: 1 };
    const postvalue = {
      coursename: cname,
      courseno: cno,
      deptno: dno,
      staffname: sname,
      studentid: sessiondata.id,
      imgpath: path,
      staffid:sid,
    };
    await axios
      .get(`http://localhost:8080/user/getstaffcoursecourseno/${no}/${id}`)
      .then((res) => {
        console.log("getcourse_no_id_D", res.data);
        const result = res.data;
        const sendvalue = { studentcount: result.studentcount + 1 };

        axios
          .put(
            `http://localhost:8080/user/putstaffcoursecount/${no}/${id}`,
            sendvalue
          )
          .then((res) => {
            console.log("putcourse_no_id_D", res.data);
          })
          .catch((err) => {
            console.log("putcourse_no_id_F", err);
          });
      })
      .catch((err) => console.log("getcourse_no_id_F", err.data));

    await axios
      .post(`http://localhost:8080/user/poststucourse`, postvalue)
      .then((res) => {
        console.log("post_stucourse", res);
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log("post_stucourse_err", err);
      });
    // console.log("post_stucourse", postvalue);
  };

  if (sessiondata?.authorities?.student == 1) {
    return (
      <>
        <Flex style={{ height: "5%", width: "100%" }} justify="center">
          <h2 style={{ color: "rgb(0, 21, 41)" }}>COURSE LIST</h2>
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
                  <Card className="stu-course-card">
                    <Flex
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                      justify="space-between"
                    >
                      <Flex>
                        <Space size={"middle"}>
                          <Avatar
                            size={70}
                            src={require(`../../Images/${
                              user?.imgpath || "wipib0dx.png"
                            }`)}
                          />
                          <Flex vertical>
                            <Space>
                              <div style={{ width: "5.5vw" }}>Staff Name</div>
                              <div>:</div>
                              <div style={{ color: "red" }}>
                                {user.staffname}
                              </div>
                            </Space>
                            <div style={{ height: "2vh" }}></div>
                            <Space>
                              <div style={{ width: "5.5vw" }}>Course</div>
                              <div>:</div>
                              <div style={{ color: "blue" }}>
                                {user.coursename}
                              </div>
                            </Space>
                          </Flex>
                        </Space>
                      </Flex>
                      <Flex>
                        <Button
                          style={{ top: "3vh" }}
                          type="primary"
                          onClick={() => 
                            onregister(
                              user.staffid,
                              user.courseno,
                              user.coursename,
                              user.courseno,
                              user.deptno,
                              user.staffname,
                              user.imgpath,
                              user.staffid
                            )
                          }
                        >
                          Register
                        </Button>
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
          "Sorry, you are not authorized to access student course page. Go back",
        errorCode: 403,
        type: 1,
      },
    });
  }
}

export default Studentscourse;
