import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  Progress,
  Rate,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import Button from "src/components/button/Button";
import { rgba } from "polished";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NOT_FOUND_IMG } from "src/common/constant";
import MainLayout from "src/layout/MainLayout";
import { useGetProductQuery, useProductViewIncMutation } from "src/stores/product/product.query";
import { useGetReviewsByProductQuery } from "src/stores/review/review.query";
import Swiper, { EffectCreative, Parallax } from "swiper";
import styled from "styled-components";
import PostersSlider from "src/components/silder/PostersSlider";
import { BsCartPlus, BsLayoutWtf, BsListStars, BsStar } from "react-icons/bs";
import ChipTag from "src/components/chip/ChipTag";
import ReactionChipTags from "src/components/chip/ReactionChipTags";
import { useChangeThemeProvider } from "src/common/useChangeThemeProvider";
import ProductDrawerDetail from "src/components/card/ProductDrawerDetail";

const getTotalInventoryQuantity = (variants) =>
  variants.reduce((currentValue, nextValue) => {
    return currentValue + (nextValue?.quantity || 0);
  }, 0);
const getTotalInventorySold = (variants) =>
  variants.reduce((currentValue, nextValue) => {
    return currentValue + (nextValue?.sold || 0);
  }, 0);

const ProductDetailPage = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const { themeProvider } = useChangeThemeProvider();
  const [productReviewsFilter, setProductReviewsFilter] = useState({
    rating: "",
    page: 1,
    limit: 10,
    sort: "",
  });
  const [productViewInc, { isLoading: productViewIncLoading }] = useProductViewIncMutation();
  const { data: productQuery, isSuccess: productQuerySuccess } = useGetProductQuery(productId, {
    skip: !productId,
  });
  const { data: productReviewsQuery, isSuccess: productReviewsQuerySuccess } =
    useGetReviewsByProductQuery(
      { productId, filter: productReviewsFilter },
      {
        skip: !productId,
      }
    );
  const productData = productQuerySuccess ? productQuery?.data : null;
  const totalQuantity = productData ? getTotalInventoryQuantity(productData.variants) : 0;
  const totalSold = productData ? getTotalInventorySold(productData.variants) : 0;
  const productReviewsRes = productReviewsQuerySuccess ? productReviewsQuery : null;
  const [activeKey, setActiveKey] = useState("content");
  const [selectedProductId, setSelectedProductId] = useState(null);
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
                  <PostersSlider images={productData.images} />
                  <div className="price">
                    <span>Giá ~</span>
                    <Statistic
                      suffix="₫"
                      className="price-tag"
                      value={productData.price}
                    ></Statistic>
                  </div>
                </Col>
                <Col flex="auto" className="left-info">
                  <div className="left-info-top">
                    <Typography.Title
                      level={1}
                      className="title"
                      ellipsis={{ rows: 2, tooltip: productData.name }}
                    >
                      {productData.name}
                    </Typography.Title>
                    <Typography.Title
                      level={productData.desc.length > 150 ? 5 : 4}
                      ellipsis={{ rows: 2 }}
                      type="secondary"
                      className="desc"
                    >
                      {productData.desc}
                    </Typography.Title>
                    <Space wrap={false} split={<Divider type="vertical" />} style={{marginTop: "auto"}}>
                      <ReactionChipTags colorful={false} size={16} data={productData} />
                    </Space>
                  </div>
                  <Row className="left-info-bottom" gutter={24} wrap={false}>
                    <Col flex="auto" className="bottom-left">
                      <Space
                        wrap={false}
                        size={2}
                        split={<Divider type="vertical" />}
                        className="rating-wrapper ant-space-center-items"
                      >
                        <Space
                          className="rating ant-space-center-items"
                          wrap={false}
                          size={8}
                          align="center"
                        >
                          <Rate disabled defaultValue={productData.avgRating} />
                          <span className="rating-value">{`( ${productData.numOfReviews} đánh giá )`}</span>
                        </Space>
                        {productReviewsRes?.reviewers.length > 0 && (
                          <Avatar.Group maxCount={10} size={36}>
                            {productReviewsRes?.reviewers.map((item) => (
                              <Avatar src={item.picture} key={item._id}>
                                {item.name[0]}
                              </Avatar>
                            ))}
                          </Avatar.Group>
                        )}
                        <Avatar.Group maxCount={10} size={24}>
                          {"ABCDEFGHIKLMNOP".split("").map((item) => (
                            <Avatar key={item}>{item}</Avatar>
                          ))}
                        </Avatar.Group>
                      </Space>
                      <Descriptions column={3} size="small" className="detail">
                        <Descriptions.Item label="Thương hiệu" span={3}>
                          {productData.brand}
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh mục" span={3}>
                          <Typography.Text ellipsis style={{ maxWidth: 240 }}>
                            {productData.category.name}
                          </Typography.Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Đã bán" span={2}>
                          <Tooltip
                            placement="topRight"
                            title={
                              <Statistic
                                groupSeparator="."
                                value={totalSold}
                                valueStyle={{ fontSize: 16, color: "#fff" }}
                                suffix={
                                  <Typography.Text style={{ fontSize: 14, color: "#eee" }}>
                                    {" "}
                                    of {totalQuantity + totalSold}
                                  </Typography.Text>
                                }
                              />
                            }
                          >
                            <Progress
                              strokeColor={{
                                from: themeProvider.generatedColors[4],
                                to: themeProvider.generatedColors[1],
                              }}
                              percent={((totalSold / (totalQuantity + totalSold)) * 100).toFixed(2)}
                              strokeWidth={12}
                              showInfo={false}
                              status="active"
                            />
                          </Tooltip>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col flex="242px">
                      <div className="bottom-right">
                        <Button
                          type="link"
                          extraType="btntag"
                          block
                          size="large"
                          icon={<BsCartPlus />}
                          className="btn-cart"
                          loading={!productQuerySuccess}
                          disabled={!productQuerySuccess || productData.variants.length < 1}
                          onClick={() => setSelectedProductId(productId)}
                        >
                          Thêm vào giỏ hàng
                        </Button>
                        <Button
                          type="default"
                          block
                          size="large"
                          icon={<BsStar />}
                          className="btn-rating"
                          loading={!productQuerySuccess}
                          disabled={!productQuerySuccess || productData.variants.length < 1}
                          onClick={() => setSelectedProductId(productId)}
                        >
                          Đánh giá sản phẩm
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="container-detail">
              <div className="detail-top">
                <Tabs
                  defaultActiveKey="product"
                  activeKey={activeKey}
                  onChange={(key) => {
                    setActiveKey(key);
                  }}
                >
                  <Tabs.TabPane
                    tab={
                      <ChipTag size={4} fontSize={18} icon={<BsListStars size={16.5} />}>
                        Bài viết
                      </ChipTag>
                    }
                    key="content"
                  ></Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <ChipTag size={4} fontSize={18} icon={<BsStar size={16.5} />}>
                        Đánh giá
                      </ChipTag>
                    }
                    key="review"
                  ></Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <ChipTag size={4} fontSize={18} icon={<BsLayoutWtf size={16.5} />}>
                        Bộ sưu tập
                      </ChipTag>
                    }
                    key="combo"
                  ></Tabs.TabPane>
                </Tabs>
              </div>
              {JSON.stringify(productQuery)}
              {JSON.stringify(productReviewsQuery)}
            </div>
          </div>
        </ProductDetailWrapper>
      ) : (
        <Skeleton active />
      )}
      {productQuerySuccess && (
        <ProductDrawerDetail
          productId={selectedProductId || null}
          setSelectedProduct={(value) => setSelectedProductId(value)}
        />
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
  & .left-info {
    display: flex;
    flex-direction: column;
  }
  & .left-info-top {
    height: 200px;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    & .title {
      margin-bottom: 8px;
    }
    & .desc {
      margin-top: 0;
      margin-bottom: 8px;
    }
  }
  & .left-info-bottom {
    margin-top: 12px;
    & .bottom-left {
      display: flex;
      flex-direction: column;
    }
    & .bottom-left .detail {
      margin-top: auto;
    }
    & .bottom-left .rating-wrapper {
      margin-bottom: 12px;
      & .rating-value {
        text-decoration: underline;
      }
    }
    & .bottom-right {
      position: absolute;
      top: 0;
      transform: translateY(-50px);
      padding: 16px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #fff;
      box-shadow: 0 2px 8px #f0f1f2;
    }
    & .btn-cart {
      border: 1px solid ${(props) => props.theme.generatedColors[3]};
      &:hover {
        text-decoration: underline;
        border-color: ${(props) => props.theme.generatedColors[3]};
      }
    }
  }
  & .price {
    position: absolute;
    bottom: 24px;
    right: 36px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 1px 8px;
    background-color: ${(props) => props.theme.generatedColors[1]};
    border-radius: 5px;
    & .price-tag .ant-statistic-content,
    & > span {
      font-size: 15px;
      font-weight: 500;
      color: ${(props) => props.theme.generatedColors[5]};
    }
  }
  & .rating {
  }
`;

export default ProductDetailPage;
