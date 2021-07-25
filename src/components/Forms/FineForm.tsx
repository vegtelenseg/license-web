import { Form, Input, Button, Collapse, DatePicker } from "antd";
import { Toast } from "antd-mobile";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../contexts/atoms";
import auth from "../../utils/auth";

import { useCreateDriverFineMutation } from "../../generated/graphql";

export const FineForm = () => {
  const user = useRecoilValue(userAtom);
  const [createDriverFine] = useCreateDriverFineMutation({
    onCompleted: () => {
      Toast.info("Ticket Created.", 5);
    },
  });
  const onFinish = async (values: any) => {
    console.log("Success:");
    console.log("Banna: ", user?.id);
    createDriverFine({
      variables: {
        input: {
          data: {
            amount: Number(values.amount),
            reason: values.reason,
            dueDate: new Date(values.dueDate._d).toISOString().split("T")[0],
            officer: values.officer,
            driver: values.driverId,
          },
        },
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const { Panel } = Collapse;
  return (
    <Collapse accordion>
      <Panel header='Add fine' key='1'>
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            officer: auth.get("auth").username,
            dueDate: "",
            reason: "",
            amount: "",
            driverId: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Reason'
            name='reason'
            rules={[
              {
                required: true,
                message: "Please enter reason for fine",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label='Amount'
            name='amount'
            rules={[
              {
                required: true,
                message: "Please enter fine amount",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Due Date'
            name='dueDate'
            rules={[
              {
                required: true,
                message: "Please input due date",
              },
            ]}
          >
            <DatePicker
              name='dueDate'
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label='Officer'
            name='officer'
            rules={[
              {
                required: true,
                message: "Please enter officer",
              },
            ]}
          >
            <Input name='officer' readOnly />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};
