import React, { useState } from "react";
import moment from "moment";
import AdminLayout from "src/layout/AdminLayout";
import {
  useGetIncomeStatsQuery,
  useGetUsersStatsQuery,
  useGetVariantsStatsQuery,
} from "src/stores/statistic/statistic.query";
import { Col, Row } from "antd";
import RangePicker, { dateFormat } from "src/components/picker/RangePicker";
import SideBarAdmin from "src/components/nav/SideBarAdmin";
import styled from "styled-components";

const ContentWrapper = styled.div`
  & .content-top {
    margin-bottom: 24px;
  }
  & .content-middle {
    background: #fff;
    padding: 24px;
  }
`;

const DashboardPage = () => {
  const [range, setRange] = useState([
    moment().startOf("week").format(dateFormat),
    moment().endOf("week").format(dateFormat),
  ]);
  const { data: usersStatQuery, isSuccess: usersStatSuccess } = useGetUsersStatsQuery({
    begin: range[0],
    end: range[1],
  });
  // const { data: variantsStatQuery, isSuccess: variantsStatSuccess } = useGetVariantsStatsQuery({
  //   begin: range[0],
  //   end: range[1],
  // });
  const { data: incomeStatQuery, isSuccess: incomeStatSuccess } = useGetIncomeStatsQuery({
    productId: null,
    begin: range[0],
    end: range[1],
  });

  const onChange = (dates, dateStrings) => {
    setRange(dateStrings);
  };
  return (
    <AdminLayout>
      <ContentWrapper>
        <div className="content-top">
          <RangePicker onChange={onChange} bordered />
        </div>
        <div className="content-middle">
          <div className="">{JSON.stringify(usersStatQuery)}</div>
          <div className="">{JSON.stringify(incomeStatQuery)}</div>
        </div>
      </ContentWrapper>
    </AdminLayout>
  );
};

export default DashboardPage;
