import { Form } from "antd";
import { ActivityIndicator, InputItem } from "antd-mobile";
import { IdcardOutlined } from "@ant-design/icons";
import {
  GetDriverByIdNumberQuery,
  useGetDriverByIdNumberLazyQuery,
} from "../../generated/graphql";
import { useRecoilState } from "recoil";
import { userAtom } from "../../contexts/atoms";
import { Profile } from "../Profile/Profile";
import "./lookup.css";

export const LookUp = () => {
  const [getDriverByIdNumber, { data, loading }] =
    useGetDriverByIdNumberLazyQuery();
  const [user, setUser] = useRecoilState(userAtom);

  setUser(user);
  if (loading) {
    return <ActivityIndicator text='Loading...' className='loading' />;
  }
  return (
    <>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ idNumber: "" }}
        onFinish={(vals) => {
          try {
            getDriverByIdNumber({
              variables: {
                idNumber: vals.driverId,
              },
            });
            // history.push("/profile");
          } catch (error) {
            console.log("Could not get driver: ", error.message);
          }
        }}
      >
        <Form.Item
          name='driverId'
          rules={[
            { required: true, message: "Driver id is a required field." },
          ]}
          style={{
            padding: "1rem",
            position: "relative",
          }}
        >
          <InputItem clear placeholder='Enter ID number'>
            <IdcardOutlined />
          </InputItem>
        </Form.Item>
      </Form>
      <Profile data={data as GetDriverByIdNumberQuery} />
    </>
  );
};
