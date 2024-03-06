import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Staffcourse() {
  const [sessiondata, setSessiondata] = useState();

  const [getcourse, setGetcourse] = useState();

  const [getcourseid, setGetcourseid] = useState();

  const [trigger, setTrigger] = useState(false);

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
              imgpath: sessiondata.imagepath,
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
