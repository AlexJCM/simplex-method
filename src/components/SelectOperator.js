import React from "react";
import { Select } from "antd";
const { Option } = Select;

const SelectOperator = props => (
  <Select defaultValue="<=" style={{ width: 60 }} onChange={props.onChange}>
    <Option value="<=">&#8804;</Option>
    <Option value=">=">&#8805;</Option>
    <Option value="=">&#61;</Option>
  </Select>
);

export default SelectOperator;
