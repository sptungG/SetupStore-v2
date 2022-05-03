import { Table, Space, DatePicker } from "antd";
import React from "react";

const DemoTable = () => {
  return (
    <Space direction="vertical">
      <DatePicker />
      <DatePicker picker="week" />
      <DatePicker picker="month" />
      <DatePicker picker="quarter" />
      <DatePicker picker="year" />
    </Space>
  );
};

export default DemoTable;
