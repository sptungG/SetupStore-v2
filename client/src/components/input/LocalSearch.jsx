import React from "react";
import { Divider, Card, Button, Form, Input, Select, Space } from "antd";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const ContentWrapper = styled.div`
  border: 1px solid #eee;
  background: #fff;
  margin-bottom: 24px;
`;

const LocalSearch = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <ContentWrapper>
      <Form form={form} size="large" onFinish={onFinish}>
        <Form.Item name="keySearch" noStyle>
          <Input
            bordered={false}
            style={{ paddingRight: 6 }}
            placeholder="Tìm kiếm trong bảng..."
            allowClear
            suffix={
              <Button type="primary" htmlType="submit" size="middle">
                <BsSearch size={18} />
              </Button>
            }
          />
        </Form.Item>
      </Form>
    </ContentWrapper>
  );
};

export default LocalSearch;
