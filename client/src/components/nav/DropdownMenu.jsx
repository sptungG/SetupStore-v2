import { Drawer } from "antd";
import { useChangeCollapsed } from "common/useChangeCollapsed";
import React from "react";

const DropdownMenu = () => {
  const { collapsed, changeCollapsed } = useChangeCollapsed();

  return (
    <Drawer
      title="Drawer with extra actions"
      placement={"top"}
      onClose={() => changeCollapsed(true)}
      visible={!collapsed}
      style={{ position: "absolute" }}
      getContainer={false}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default DropdownMenu;
