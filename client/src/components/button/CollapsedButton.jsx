import { Button } from "antd";
import { useChangeHeaderState } from "src/common/useChangeHeaderState";
import { FaIndent, FaOutdent, FaEllipsisH } from "react-icons/fa";
import React from "react";

const CollapsedButton = () => {
  const { headerState, changeHeaderState } = useChangeHeaderState();
  return (
    <Button
      className="btn-collapsed"
      type="text"
      onClick={() => changeHeaderState({ headerState: !headerState.collapsed })}
    >
      <FaEllipsisH size={20} />
    </Button>
  );
};

export default CollapsedButton;
