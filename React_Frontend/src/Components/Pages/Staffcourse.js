import { Button, Flex, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Staffcourse() {
  const [sessiondata, setSessiondata] = useState();

  const [getcourse, setGetcourse] = useState();

  const [getcourseid, setGetcourseid] = useState();

  const [trigger, setTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("staff session", datas);
  }, []);

  const onregister = async (id) => {
    await axios
      .get(`http://localhost:8080/user/getcourseid/${id}`)
      .then((res) => {
        console.log("course_byid", res.data);
        setGetcourseid(res.data);
        const mycourse = res.data;

        axios
          .get(`http://localhost:8080/user/getdeptno/${mycourse?.deptno}`)
          .then((res) => {
            console.log("dept_no", res.data);
            const final = res.data;

            const sendData = {
              staffid: sessiondata.id,
              staffname: sessiondata.firstname + " " + sessiondata.lastname,
              courseno: mycourse?.courseno,
              coursename: mycourse?.coursename,
              deptno: mycourse?.deptno,
              deptname: final?.deptname,
              studentcount: 0,
            };

            axios
              .post(`http://localhost:8080/user/poststaffcourse`, sendData)
              .then((res) => {
                console.log("staffcourse_success", res.data);
                setTrigger(!trigger);
              })
              .catch((err) => {
                console.log("staffcourse_byerror", err);
              });
          })
          .catch((err) => {
            console.log("dept_byerror", err);
          });
      })
      .catch((err) => {
        console.log("course_byerror", err);
      });
  };

  useEffect(() => {
    if (sessiondata) {
      const getcourse = async () => {
        await axios
          .get(
            `http://localhost:8080/user/findcoursebystaffkey/${sessiondata.id}`
          )
          .then((res) => {
            console.log("get_course_success", res.data);
            const result = res.data;
            const final = result.map((user, index) => ({
              ...user,
              sno: index + 1,
              action: (
                <>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        onregister(user.id);
                      }}
                    >
                      Register
                    </Button>
                  </Space>
                </>
              ),
            }));
            setGetcourse(final);
          });
      };
      getcourse();
    }
  }, [sessiondata, trigger]);

  const columns = [
    {
      title: () => <div className="course-table-col">S.No</div>,
      dataIndex: "sno",
      key: "S.no",
    },
    {
      title: () => <div className="course-table-col">Course_Name</div>,
      dataIndex: "coursename",
      key: "coursename",
    },
    {
      title: () => <div className="course-table-col">Course_no</div>,
      dataIndex: "courseno",
      key: "courseno",
    },
    {
      title: () => <div className="course-table-col">Department_no</div>,
      dataIndex: "deptno",
      key: "deptno",
    },
    {
      title: () => <div className="course-table-col">Action</div>,
      dataIndex: "action",
      key: "action",
    },
  ];

  if (sessiondata?.authorities?.staff_admin == 1) {
    return (
      <>
        <Flex
          style={{ height: "100%", width: "100%" }}
          justify="center"
          align="center"
          vertical
        >
          <Flex justify="center">
            <h2 style={{ color: "rgb(0, 21, 41)" }}>AVAILABLE COURSE</h2>
          </Flex>
          {getcourse ? (
            <Flex justify="center">
              <Table
                columns={columns}
                dataSource={getcourse}
                className="course-table"
                pagination={{ pageSize: 4 }}
              />
            </Flex>
          ) : (
            <>
              <Flex justify="center" style={{ height: "100%" }} align="center">
                <HashLoader color="#0e1630" loading size={110} />
              </Flex>
            </>
          )}
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

export default Staffcourse;
