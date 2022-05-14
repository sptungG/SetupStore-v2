import { Form, Input } from "antd";
import React from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const SearchWrapper = styled.div`
  .ant-input-clear-icon {
    font-size: 20px;
  }
`;

const AutocompleteSearch = () => {
  const [form] = Form.useForm();

  const onFinish = ({ keySearch }) => {
    console.log("onFinish ~ keySearch", keySearch);
  };

  return (
    <SearchWrapper>
      <Form form={form} size="large" onFinish={onFinish}>
        <Form.Item name="keySearch" noStyle>
          <Input
            // bordered={false}
            style={{ paddingRight: 4 }}
            placeholder="Tìm kiếm sản phẩm"
            allowClear
            suffix={<BsSearch size={18} />}
          />
        </Form.Item>
      </Form>
    </SearchWrapper>
  );
};

export default AutocompleteSearch;
