import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setSidebarCollapsed, setSearchVisible } from "src/stores/header/header.reducer";
import { BsList } from "react-icons/bs";

const CollapsedButton = () => {
  const dispatch = useDispatch();
  const headerState = useSelector((state) => state.headerState);
  const handleClick = () => {
    // if (headerState.searchvisible) dispatch(setSearchVisible(false));
    dispatch(setSidebarCollapsed(!headerState.sidevisible));
  };

  return (
    <Button className="btn-collapsed" type="text" onClick={handleClick}>
      <BsList size={24} />
    </Button>
  );
};

export default CollapsedButton;
