import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/course.css";
import { CgReadme } from "react-icons/cg";
import { Option } from "antd/es/mentions";
import { PiTreeStructureBold } from "react-icons/pi";
import Icon from "@ant-design/icons/lib/components/Icon";
import { LuFileKey } from "react-icons/lu";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { HashLoader } from "react-spinners";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function Course(props) {
  const [sessiondata, setSessiondata] = useState();

  const [deptdata, setDeptdata] = useState();

  const [trigger, setTrigger] = useState(true);

  const [getcourse, setGetcourse] = useState();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // table filter start

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //table filter end

  useEffect(() => {
    const sessiondata = sessionStorage.getItem("userdata");
    const datas = sessiondata ? JSON.parse(sessiondata) : {};
    setSessiondata(datas);
    console.log("admin session", datas);
  }, []);

  useEffect(() => {
    const getdept = async () => {
      await axios
        .get(`http://${props.ip}:8080/user/getdept`)
        .then((res, index) => {
          console.log("getdept_success", res.data);
          const result = res.data;
          setDeptdata(result);
          console.log("dept_final", result);
        })
        .catch((err) => {
          console.log("getdept_fail", err.data);
        });
    };
    getdept();
  }, []);

  const onremove = async (id) => {
    await axios
      .delete(`http://${props.ip}:8080/user/deletecourse/${id}`)
      .then((res) => (console.log(res.data), setTrigger(!trigger)))
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    const getcourse = async () => {
      await axios
        .get(`http://${props.ip}:8080/user/getcourse`)
        .then((res) => {
          console.log("get_course_success", res);
          const result = res.data;
          const final = result.map((user, index) => ({
            ...user,
            sno: index + 1,
            action: (
              <>
                <Space>
                  {/* <Button type="primary" onClick={() => {}}>
                    View
                  </Button> */}
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
          setGetcourse(final);
        })
        .catch((err) => {
          console.log("get_course_err", err);
        });
    };
    getcourse();
  }, [trigger]);

  const onfinish = async (e) => {
    console.log("course_value", e);
    await axios
      .post(`http://${props.ip}:8080/user/course`, e)
      .then((res) => {
        console.log("postsuccess_course");
        form.resetFields();
        setTrigger(!trigger);
        message.open({
          type: "success",
          content: "Course added",
        });
      })
      .catch((err) => {
        console.log("postfail_course");
      });
  };

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
      ...getColumnSearchProps("coursename")
    },
    {
      title: () => <div className="course-table-col">Course_no</div>,
      dataIndex: "courseno",
      key: "courseno",
      ...getColumnSearchProps("courseno")
    },
    {
      title: () => <div className="course-table-col">Department_no</div>,
      dataIndex: "deptno",
      key: "deptno",
      ...getColumnSearchProps("deptno")
    },
    {
      title: () => <div className="course-table-col">Action</div>,
      dataIndex: "action",
      key: "action",
    },
  ];

  if (sessiondata?.authorities?.admin == 1) {
    return (
      <>
        <Flex className="input-box-course" justify="center" align="center">
          <Form onFinish={onfinish} form={form}>
            <Flex align="center" justify="center">
              <Card className="course-card">
                <Space>
                  <Form.Item
                    name={"coursename"}
                    rules={[
                      {
                        required: true,
                        message: "please enter course name",
                        pattern: /^[A-Za-z\s]+$/,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{
                        width: "20vw",
                      }}
                      placeholder="Course Name"
                      addonBefore={<CgReadme size={20} />}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"courseno"}
                    rules={[
                      {
                        required: true,
                        message: "please enter course Id",
                      },
                      {
                        pattern: /^[1-9]\d{3}$/,
                        message: "please valid code",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      placeholder="Course Id"
                      style={{
                        width: "10vw",
                      }}
                    />
                  </Form.Item>
                  <Space.Compact>
                    <Form.Item
                      name={"deptno"}
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
                        style={{
                          width: "18vw",
                        }}
                      >
                        {deptdata?.map((data, index) => (
                          <Option value={data?.deptno}>{data?.deptname}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Flex justify="end">
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
                      </Flex>
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
        <Flex vertical className="outer-box-course">
          <Flex justify="center">
            <h2 style={{ color: "rgb(0, 21, 41)" }}>COURSE LIST</h2>
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
          "Sorry, you are not authorized to access course details page. Go back",
        errorCode: 403,
        type: 1,
      },
    });
  }
}

export default Course;
