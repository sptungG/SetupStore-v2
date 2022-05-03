import { ConfigProvider } from "antd";
import { useChangeLang } from "common/useChangeLang";
import ThemeButton from "components/buttons/ThemeButton";
import LangButton from "components/buttons/LangButton";
import DemoTable from "components/tables/DemoTable";
import React from "react";

const App = () => {
  const { locale, localeName } = useChangeLang();
  console.log(localeName);

  return (
    <ConfigProvider locale={locale}>
      <ThemeButton />
      <LangButton />
      <DemoTable />
    </ConfigProvider>
  );
};

export default App;
