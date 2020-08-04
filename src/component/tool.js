import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input, Result} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Loading3QuartersOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import * as actions from "../actions";

const Tool = () => {
  const state = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authenticateUser());
  }, []);

  const onFinish = ({username, password, remember}) => {
    dispatch(actions.login(username, password, remember));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (state.isAuthenticating)
    return (
      <Result
        title="Đợi một tí"
        subTitle="Không đợi khỏi dùng"
        icon={<Loading3QuartersOutlined spin/>}
        extra={
          <Link to="/">
            <Button type="primary">Đếch cần, đéo đợi nữa</Button>
          </Link>
        }
      />
    );

  if (state.user)
    return <div>Login</div>

  return (
    <div style={{width: "500px", margin: "auto", marginTop: "150px"}}>
      <Form
        labelCol={{span: 5}}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>Có tài khoản mới đang nhập được</h2>
        <h1>Không có thì ra chỗ khác chơi</h1>
        <h3>Chỗ này không dành cho trẻ em</h3>
        <Form.Item
          label="Username"
          name="username"
          rules={[{required: true, message: "Please input your username!"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: "Please input your password!"}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đi tới chỗ người lớn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Tool;
