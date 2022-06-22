import React, { useEffect, useState } from "react";
import { ProductsFilter } from "src/common/constant";
import ProductCard, { ProductCardLoading } from "src/components/card/ProductCard";
import MainLayout from "src/layout/MainLayout";
import { useGetProductsFilteredQuery } from "src/stores/product/products.query";
import styled from "styled-components";

const ProductsWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 380px);
  justify-content: center;
  justify-items: center;
  align-items: center;
  padding: 24px;
`;

const HomePage = () => {
  const [productsFilterValue, setProductsFilterValue] = useState(
    new ProductsFilter({ page: 1, limit: 100 })
  );
  const {
    data: productsFilteredQuery,
    isFetching: productsFilteredFetching,
    isSuccess: productsFilteredSuccess,
  } = useGetProductsFilteredQuery(productsFilterValue);
  const [productsFiltered, setProductsFiltered] = useState([]);

  return (
    <MainLayout>
      <ProductsWrapper>
        {productsFilteredFetching &&
          Array(4)
            .fill(null)
            .map((i) => <ProductCardLoading />)}
        {productsFilteredSuccess &&
          productsFilteredQuery?.data.map((p) => (
            <ProductCard key={p._id} product={p}></ProductCard>
          ))}
      </ProductsWrapper>
    </MainLayout>
  );
};

export default HomePage;
