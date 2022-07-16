import { AutoComplete, Input } from "antd";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

const AutocompleteEmailInput = ({
  prefix = <HiOutlineMail size={24} />,
  value = "",
  onChange = (v) => console.log(v),
  placeholder = "Email...",
}) => {
  const [result, setResult] = useState([]);

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com"].map((domain) => `${value}@${domain}`);
    }

    setResult(res.map((r) => ({ value: r, label: r })));
  };
  return (
    <AutoComplete onSearch={handleSearch} onSelect={(value) => onChange(value)} options={result}>
      <Input
        size="large"
        prefix={prefix}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </AutoComplete>
  );
};

export default AutocompleteEmailInput;
