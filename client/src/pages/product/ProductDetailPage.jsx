import { Col, Row, Skeleton, Typography } from "antd";
import { rgba } from "polished";
import React, { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NOT_FOUND_IMG } from "src/common/constant";
import MainLayout from "src/layout/MainLayout";
import { useGetProductQuery, useProductViewIncMutation } from "src/stores/product/product.query";
import Swiper, { EffectCreative, Parallax } from "swiper";
import styled from "styled-components";
import PostersSlider from "src/components/silder/PostersSlider";

const ProductDetailPage = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const [productViewInc, { isLoading: productViewIncLoading }] = useProductViewIncMutation();
  const { data: productQuery, isSuccess: productQuerySuccess } = useGetProductQuery(productId, {
    skip: !productId,
  });
  const productData = productQuerySuccess ? productQuery?.data : null;
  // useLayoutEffect(() => {
  //   if (productId) productViewInc(productId);
  // }, [productId]);

  return (
    <MainLayout>
      {productData ? (
        <ProductDetailWrapper>
          <div className="container-big-banner">
            <img src={productData.images[0]?.url || NOT_FOUND_IMG} alt={productData._id} />
          </div>
          <div className="container-main">
            <div className="container-info">
              <Row wrap={false} gutter={24}>
                <Col flex="436px">
                  {productData.images.length > 0 ? (
                    <PostersSlider images={productData.images} />
                  ) : (
                    <img src={NOT_FOUND_IMG} alt={"NOT_FOUND_IMG"} />
                  )}
                </Col>
                <Col flex="auto">
                  <Typography.Title>{productData.name}</Typography.Title>
                  <Typography.Title level={productData.desc.length > 150 ? 5 : 4} type="secondary">
                    {productData.desc}
                  </Typography.Title>
                </Col>
              </Row>
            </div>
            <div className="container-detail">{JSON.stringify(productQuery)}</div>
          </div>
        </ProductDetailWrapper>
      ) : (
        <Skeleton active />
      )}
    </MainLayout>
  );
};

const ProductDetailWrapper = styled.main`
  & .container-big-banner {
    width: 100%;
    height: 360px;
    overflow: hidden;
    position: relative;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translateY(-64px);
      z-index: 1;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${rgba("#fff", 0.5)};
      backdrop-filter: blur(4px);
      z-index: 2;
    }
  }
  & .container-main {
    position: relative;
    z-index: 3;
    background-color: #fff;
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
    transform: translateY(-120px);
    padding: 0 96px;
    box-shadow: 0 2px 8px #f0f1f2;
  }
  & .container-info {
    position: absolute;
    top: 0;
    width: calc(100% - 96px * 2);
    transform: translateY(-200px);
  }
  & .container-detail {
    padding-top: calc(160px + 24px);
  }
`;

export default ProductDetailPage;
