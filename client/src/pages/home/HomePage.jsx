import React, { useEffect, useState } from "react";
import { ProductsFilter } from "src/common/constant";
import MainLayout from "src/layout/MainLayout";
import { useGetProductsFilteredQuery } from "src/stores/product/products.query";

const HomePage = () => {
  const [productsFilterValue, setProductsFilterValue] = useState(
    new ProductsFilter({ page: 1, limit: 1 })
  );
  const { data: productsFilteredQuery, isLoading, isSuccess,  } = useGetProductsFilteredQuery(productsFilterValue);
  const [productsFiltered, setProductsFiltered] = useState([]);

  return <MainLayout>{JSON.stringify(productsFilteredQuery)}</MainLayout>;
};

export default HomePage;
