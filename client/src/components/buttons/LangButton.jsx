import { Button, Select } from "antd";
import { useChangeLang } from "common/useChangeLang";
import React from "react";

const LangButton = () => {
  const { locale, localeName, setLocaleName } = useChangeLang();
  return (
    <div>
      <Select value={localeName} onSelect={(value) => setLocaleName(value)}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="vi">Việt Name</Select.Option>
      </Select>
    </div>
  );
};

export default LangButton;
