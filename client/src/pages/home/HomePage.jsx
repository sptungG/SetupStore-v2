import React from "react";
import MainLayout from "src/layout/MainLayout";
import { generate } from "@ant-design/colors";

const HomePage = () => {
  const colors = generate("#772ce8")
  console.log("HomePage ~ colors", colors);
  return <MainLayout>

  </MainLayout>;
};

export default HomePage;
