import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "stores/theme/theme.reducer";

export function useChangeCollapsed() {
  const collapsedValue = useSelector((state) => state.theme.collapsed);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (collapsedValue === "light") window.less.modifyVars(lightVars);
  //   else window.less.modifyVars(darkVars);
  // }, [collapsedValue])

  return {
    collapsed: collapsedValue,
    changeCollapsed: (value) => dispatch(setCollapsed(value)),
  };
}
