import React, { useEffect, useState } from "react";
import { Upload, Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function Upimages() {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imgdata, Setimgdata] = useState();
  const [imgurl, Setimgurl] = useState();

  const props = {
    name: "file",
    onRemove: (file) => {
      setFileList([]);
      setImageUrl(null);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      setImageUrl(URL.createObjectURL(file));
      return false;
    },
    fileList,
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("file", fileList[0]);

    console.log(fileList[0]);
    // replace with your Spring Boot upload URL
    const response = await axios.post("http://localhost:8080/user/uploads",formData) 

    if (response.status === 200) {
      console.log(`${fileList[0].name} file uploaded successfully`);
    } else {
      console.log(`${fileList[0].name} file upload failed.`);
    }
  };

  const ongetid = async (e) => {
    console.log(e.id);
    const result = await axios.get(
      `http://localhost:8080/user/getimageid/${e.id}`
    );
    const final = result.data;
    console.log(final);
    Setimgdata(final);
  };

  useEffect(() => {
    if (imgdata) {
      const images = require(`../../Images/${imgdata?.imagepath}`);
      Setimgurl(images);
    }
  }, [imgdata]);

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name={"file"}
          label={"Images"}
          rules={[
            {
              required: true,
              message: "please upload Image",
            },
          ]}
          hasFeedback
        >
          <Upload {...props} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        {imageUrl && <img src={imageUrl} height={100} alt="preview" />}
        <Form.Item>
          <Button type="primary" shape="round" danger htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Form onFinish={ongetid}>
        <Form.Item
          name={"id"}
          label={"Get By ID"}
          rules={[
            {
              required: true,
              message: "please enter value",
            },
          ]}
          hasFeedback
        >
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <img src={imgurl} height={100} alt="Description" />
      </Form>
    </>
  );
}

export default Upimages;
