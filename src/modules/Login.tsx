import { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Toast } from "antd-mobile";
import { AuthContext } from "../contexts/auth/AuthController";

export const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const onFinish = async (values: any) => {
    try {
      console.log("Start handleLogin");
      await handleLogin({
        email: "",
        password: "",
      });
      console.log("Success:", values);
      Toast.success("Successfully logged in :)");
    } catch (error) {
      console.log("Could not log in: ", error.message);
      Toast.fail("Could not log in :(");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    Toast.fail("Could not log in :(");
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ idNumber: "" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='ID Number'
        name='idNumber'
        rules={[{ required: true, message: "ID number cannot be blank!" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item> */}

      {/* <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
