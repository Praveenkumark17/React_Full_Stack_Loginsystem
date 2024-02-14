import React from "react";
import "../Css/ErrorPage.css";
import { Button, Flex, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = (props) => {
  let location = useLocation();
  let message = location.state;
  let navigate = useNavigate();
  return (
    <Flex className="result" justify="center" align="center">
      <Result
        status={message?.errorCode}
        title={message?.errorCode}
        subTitle={message?.message}
        extra={<Button type="primary" onClick={()=>{navigate('/')}}>Back Home</Button>}
      />
    </Flex>
    // {props.error?props.error:"Access Denied to Reset the Password"}
  );
};

export default ErrorPage;
