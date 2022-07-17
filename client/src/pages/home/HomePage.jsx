import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductsFilter } from "src/common/constant";
import { isWishlisted } from "src/common/useToggleWishlist";
import ProductCard, { ProductCardLoading } from "src/components/card/ProductCard";
import ProductDrawerDetail from "src/components/card/ProductDrawerDetail";
import MainLayout from "src/layout/MainLayout";
import { useGetProductsFilteredQuery } from "src/stores/product/product.query";
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
  @media screen and (max-width: 1023.98px) {
    grid-gap: 24px 0;
  }
`;

const HomePage = () => {
  const { data: user } = useSelector((state) => state.user);
  const [productsFilterValue, setProductsFilterValue] = useState(
    new ProductsFilter({ page: 1, limit: 100 })
  );
  const {
    data: productsFilteredQuery,
    isFetching: productsFilteredFetching,
    isSuccess: productsFilteredSuccess,
  } = useGetProductsFilteredQuery(productsFilterValue);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <MainLayout>
      <ProductsWrapper>
        {productsFilteredSuccess
          ? productsFilteredQuery?.data.map((p) => (
              <ProductCard
                key={`ProductCard_${p._id}`}
                product={p}
                getSelectedProductId={(p) => setSelectedProductId(p)}
                isWishlisted={isWishlisted(p.wishlist, user?._id)}
              ></ProductCard>
            ))
          : Array(4)
              .fill(null)
              .map((i, index) => <ProductCardLoading key={`ProductCardLoading_${index}`} />)}
      </ProductsWrapper>
      {productsFilteredSuccess && (
        <ProductDrawerDetail
          productId={selectedProductId || null}
          setSelectedProduct={(value) => setSelectedProductId(value)}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
