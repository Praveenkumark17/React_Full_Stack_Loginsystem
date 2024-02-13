import { Flex, Space } from "antd";
import React from "react";
import { FaRegCopyright } from "react-icons/fa6";
import "../Css/footer.css";

function Footers() {
  return (
    <>
      <Flex justify="center" style={{ width: "100%" }} className="nav-footer">
        <Space>
          <Flex align="center" style={{ marginTop: "2px" }}>
            <div>
              <FaRegCopyright />
            </div>
          </Flex>
          <h4>Footer</h4>
        </Space>
      </Flex>
    </>
  );
}

export default Footers;
