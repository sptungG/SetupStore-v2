import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "stores/theme/theme.reducer";
import enUS from "antd/lib/locale/en_US";
import viVI from "antd/lib/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export function useChangeLang() {
  const [localeValue, setLocaleValue] = useState(viVI);
  const localeName = useSelector((state) => state.theme.locale);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localeName === "en") {
      moment.locale("en");
      setLocaleValue(enUS);
    } else {
      moment.locale("vi");
      setLocaleValue(viVI);
    }
  }, [localeName]);

  return {
    locale: localeValue,
    localeName,
    setLocaleName: (value) => dispatch(setLocale(value)),
  };
}
