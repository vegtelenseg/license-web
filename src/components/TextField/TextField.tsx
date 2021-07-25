import React from "react";
import { InputItem } from "antd-mobile";

export const InputField = ({ ...rest }) => {
  return (
    <InputItem clear placeholder='auto focus' {...rest}>
      Id No.
    </InputItem>
  );
};
