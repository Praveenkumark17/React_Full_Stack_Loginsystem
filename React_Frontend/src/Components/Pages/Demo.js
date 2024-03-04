import { Col, Flex, Row } from "antd";
import React from "react";
import "../Css/mycourse.css";

function Demo() {
  const style = {
    background: "red",
    height: "70px",
  };
  return (
    <>
      <div
        style={{
          height: "90%",
          width: "90%",
          marginLeft: "5%",
          marginTop: "5%",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Demo;
