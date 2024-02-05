import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import "../Css/forgotpass.css"

function ForgotPassword() {
  return (
    <>
      <Row className="pass-row">
        <Col span={9} offset={8}>
          <Card
            title={
              <div style={{ textAlign: "center",fontSize:17 }}>
                Forgot Password
              </div>
            }
            className="pass-logcards"
          >
            <Row>
              <Col span={19} offset={2}>
                <Form
                  autoComplete="off"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <Form.Item
                    name={"opassword"}
                    label={"Old Password"}
                    rules={[
                      {
                        required: true,
                        message: "please enter password",
                      },
                    ]}
                    initialValue={""}
                    hasFeedback
                  >
                    <Input
                      name="password"
                      placeholder="Enter the old password"
                      className="edit-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"password"}
                    label={"New Password"}
                    rules={[
                      {
                        required: true,
                        message: "please enter password",
                        pattern:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      name="password"
                      placeholder="Enter the new password"
                      className="edit-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name={"cpassword"}
                    label={"Confirm new Password"}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "please enter password",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      name="password"
                      placeholder="Enter the confirm password"
                      className="edit-input"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ForgotPassword