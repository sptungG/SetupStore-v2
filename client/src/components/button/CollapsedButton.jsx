import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setSidebarCollapsed } from "src/stores/header/header.reducer";
import { BsList } from "react-icons/bs";

const CollapsedButton = () => {
  const dispatch = useDispatch();
  const headerState = useSelector((state) => state.headerState);
  return (
    <Button
      className="btn-collapsed"
      type="text"
      onClick={() => dispatch(setSidebarCollapsed(!headerState.sidevisible))}
    >
      <BsList size={24} />
    </Button>
  );
};

export default CollapsedButton;
