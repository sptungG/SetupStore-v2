import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderState } from "src/stores/header/header.reducer";

export function useChangeHeaderState() {
  const headerState = useSelector((state) => state.headerState);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (headerState === "light") window.less.modifyVars(lightVars);
  //   else window.less.modifyVars(darkVars);
  // }, [headerState])

  return {
    headerState,
    changeHeaderState: (value) => dispatch(setHeaderState(value)),
  };
}
