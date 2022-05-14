import { Button } from "antd";
import { useChangeCollapsed } from "common/useChangeCollapsed";
import { FaIndent, FaOutdent } from "react-icons/fa";
import React from "react";

const CollapsedButton = () => {
  const { collapsed, changeCollapsed } = useChangeCollapsed();
  return (
    <Button className="btn-collapsed" type="text" size="large" onClick={() => changeCollapsed(!collapsed)}>
      {collapsed ? <FaIndent size={20} /> : <FaOutdent size={20} />}
    </Button>
  );
};

export default CollapsedButton;
