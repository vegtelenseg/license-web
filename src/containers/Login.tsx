import { Form, Button, Input } from "antd";
import { ActivityIndicator } from "antd-mobile";
import axios from "axios";
import auth from "../utils/auth";
import { useHistory } from "react-router";
import { useState } from "react";

export const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_HOST}/auth/local`,
        {
          identifier: values.username,
          password: values.password,
        }
      );

      console.log("Received values of form: ", values, data);

      auth.set(
        {
          id: data.user.id,
          email: data.user.email,
          accessToken: data.jwt,
          username: data.user.email,
        },
        "auth",
        true
      );
      history.push("/lookup");
    } catch (error) {
      console.log("Error logging in: ", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <ActivityIndicator className='loading' />}
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: "calc(100% - 5rem)",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Form.Item
          name='username'
          label='Username'
          colon={false}
          rules={[{ required: true, message: "Please input your Username!" }]}
          htmlFor='username'
          // extra={<UserOutlined className='site-form-item-icon' />}
        >
          <Input placeholder='Username' />
        </Form.Item>

        <Form.Item
          name='password'
          colon={false}
          rules={[{ required: true, message: "Please input your Password!" }]}
          label='Passowrd'
          htmlFor='password'
        >
          <Input
            // extra={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
