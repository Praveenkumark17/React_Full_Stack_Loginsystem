import { Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import '../Css/dashhome.css';

function Dashboardhome() {
  const [data, setData] = useState();

  const sessiondata = sessionStorage.getItem("userdata");

  useEffect(() => {
    if (sessiondata) {
      //   console.log("value triger !!", trigger);
      const datas = sessiondata ? JSON.parse(sessiondata) : {};
      const getuserdata = async () => {
        await axios
          .get(`http://localhost:8080/user/getuserid/${datas.id}`)
          .then((res) => {
            console.log("dash-data:", res.data);
            const getdata = res.data;
            setData(getdata);
            console.log(getdata);
            console.log("session admin:", getdata?.authorities?.admin);
          })
          .catch((err) => console.log(err));
      };
      getuserdata();
    }
  }, [sessiondata]);

  return (
    <>
      <Flex justify="center" style={{ width: "100%" }}>
        <div className="dash-head">{data?.userid}</div>
      </Flex>
    </>
  );
}

export default Dashboardhome;
