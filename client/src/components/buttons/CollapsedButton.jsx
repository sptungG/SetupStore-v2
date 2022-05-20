import { Button } from "antd";
import { useChangeCollapsed } from "common/useChangeCollapsed";
import { FaIndent, FaOutdent, FaEllipsisH } from "react-icons/fa";
import React from "react";

const CollapsedButton = () => {
  const { collapsed, changeCollapsed } = useChangeCollapsed();
  return (
    <Button
      className="btn-collapsed"
      type="text"
      onClick={() => changeCollapsed(!collapsed)}
    >
      <FaEllipsisH size={20} />
    </Button>
  );
};

export default CollapsedButton;
