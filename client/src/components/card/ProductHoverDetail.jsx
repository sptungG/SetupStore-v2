import React, { Fragment, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel, Col, InputNumber, Rate, Row, Skeleton, Space, Tag, Typography } from "antd";
import { BsCartPlus, BsChatLeftText, BsEye, BsHeart, BsHeartFill, BsStar } from "react-icons/bs";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { rgba } from "polished";
import lodash from "lodash";
import { checkValidColor, vietnameseSlug } from "src/common/utils";

const generatedVariants = (variants) => Object.entries(lodash.groupBy(variants, "option_label"));

const ProductHoverDetail = ({ product }) => {
  const [initQuantity, setInitQuantity] = useState(1);

  const [activeThumb, setActiveThumb] = useState();

  const onChangeInitQuantity = (value) => {
    setInitQuantity(value);
  };

  return (
    <ProductHoverDetailWrapper>
      {/* <Space className="reaction-container" size={6}>
        <Tag className="reaction-tag" color="default" icon={<BsChatLeftText size={14} />}>
          {product.numOfReviews}
        </Tag>
        <Tag className="reaction-tag" color="default" icon={<BsStar size={14} />}>
          {product.avgRating}
        </Tag>
        <Tag className="reaction-tag" color="default" icon={<BsHeart />}>
          {product.wishlist.length}
        </Tag>
      </Space> */}
      <Row wrap={false} gutter={16}>
        <Col span={13} className="side-images">
          <div className="action-on-image">
            <Link to={`products/${product._id}`}>Xem sản phẩm</Link>
          </div>
          <div className="product-images">
            {product.images.some((i) => !i) ? (
              <Skeleton.Image className="card-img" active />
            ) : (
              <>
                <Swiper
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={10}
                  navigation={product.images.length > 1}
                  modules={[Navigation, Thumbs]}
                  grabCursor={true}
                  thumbs={{ swiper: activeThumb }}
                  className="product-images-slider"
                >
                  {product.images.map((item, index) => (
                    <SwiperSlide key={item._id + "product-images-slider"}>
                      <img src={item.url} alt={item._id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setActiveThumb}
                  loop={product.images.length > 4}
                  spaceBetween={10}
                  slidesPerView={4}
                  modules={[Navigation, Thumbs]}
                  className="product-images-slider-thumbs"
                >
                  {product.images.map((item, index) => (
                    <SwiperSlide key={item._id + "product-images-slider-thumbs"}>
                      <div className="product-images-slider-thumbs-wrapper">
                        <img src={item.url} alt={item._id} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </div>
        </Col>
        <Col span={11} className="side-content">
          <Typography.Title level={5} ellipsis={{ rows: 2 }} className="name">
            {product.name}
          </Typography.Title>
          <Space className="rating" wrap={false} size={8} align="baseline">
            <Rate disabled defaultValue={product.avgRating} />
            <span className="rating-value">{`( ${product.numOfReviews} đánh giá )`}</span>
          </Space>
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
            className="desc"
          >
            {product.desc}
          </Typography.Paragraph>

          {generatedVariants(product.variants).map(([option_label, items]) => (
            <div className="variants" key={vietnameseSlug(option_label, "_")}>
              <span className="variants-label">{option_label}: </span>
              {items.length > 0 ? (
                <Space className="variants-tags" size={1} align="baseline">
                  {items.map((v) => {
                    if (checkValidColor(v.option_value))
                      return (
                        <Tag
                          color={v.option_value || "default"}
                          key={v._id}
                          className={"tag-color"}
                          title={v.option_name}
                        >
                          <div></div>
                        </Tag>
                      );
                    return (
                      <Tag color={"default"} key={v._id} className={"tag"} title={v.option_name}>
                        {v.option_value}
                      </Tag>
                    );
                  })}
                </Space>
              ) : (
                <Tag color="default">Ngẫu nhiên</Tag>
              )}
            </div>
          ))}
          {console.log(
            "ProductHoverDetail ~ generatedVariants(product.variants)",
            generatedVariants(product.variants)
          )}

          {/* <div className="action-quantity">
            <span className="action-quantity-label">Số lượng:</span>
            <InputNumber
              min={1}
              max={product.quantity}
              keyboard={false}
              defaultValue={1}
              value={initQuantity}
              onChange={onChangeInitQuantity}
            />
          </div> */}

          <div className="side-content-actions">
            <button className="btn-wishlist hearts">
              <BsHeart />
            </button>
            <Button
              type="link"
              extraType="btntag"
              size="large"
              icon={<BsCartPlus />}
              className="btn-cart"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
    </ProductHoverDetailWrapper>
  );
};

const hearts = keyframes`
  0% {
     opacity: 0;
     transform:translate(0, 0%) rotate(45deg);
  }
  20% { //show and hint at moving
     opacity: 0.8;
     transform:translate(0, -20%) rotate(45deg);
  }
  100% {
     opacity: 0;
     transform:translate(0, -1000%) rotate(45deg); //Big hearts move faster
  }
`;

const ProductHoverDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 360px;
  overflow: hidden;
  position: relative;
  padding: 4px 0;
  & .side-images {
    flex-shrink: 0;
    position: relative;
  }
  & .side-content {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    & .rating {
      margin-bottom: 8px;
    }
    & .desc {
      margin-bottom: 24px;
    }
    &-actions {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: nowrap;
      & .btn-wishlist {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border-radius: 2px;
        cursor: pointer;
        border: 1px solid transparent;
        &:hover {
          color: #f62682;
          background-color: ${rgba("#f62682", 0.2)};
          border: 1px solid ${rgba("#f62682", 0.1)};
        }
        &.hearts {
          > .particle {
            opacity: 0;
            position: absolute;
            background-color: rgba(204, 42, 93, 1);
            animation: ${hearts} 3s ease-in infinite;
            &:before,
            &:after {
              position: absolute;
              content: "";
              border-radius: 100px;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              background-color: rgba(204, 42, 93, 1);
            }
            &:before {
              transform: translateX(-50%);
            }
            &:after {
              transform: translateY(-50%);
            }
          }
        }
      }
      & .btn-cart {
        border: 1px solid ${(props) => props.theme.generatedColors[1]};
      }
    }
  }

  & .reaction-tag {
    padding: 2px 10px;
    border: 0;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    gap: 4px;
    & span {
      font-size: 14px;
    }
  }
  & .action-on-image {
    position: absolute;
    bottom: 10px;
    right: 24px;
    z-index: 10;
    border-radius: 5px;
    & a {
      text-decoration: underline;
      font-size: 16px;
    }
  }
  & .rating-value {
    color: #000;
    text-decoration: underline;
  }

  & .variants {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
    margin-top: auto;
    margin-bottom: 8px;
    &-label {
      color: #000;
    }
    & .tag-color {
      padding: 0;
      border-radius: 50%;
    }
    & .tag-color > div {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    & .tag-color.selected > div {
      background-color: #fff;
    }
  }

  & .action-quantity {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    flex-wrap: nowrap;
    margin-top: auto;
    margin-bottom: 8px;
    &-label {
      color: #000;
    }
  }

  & .product-images {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }
  & .product-images-slider {
    width: 100%;
    height: 100%;
    & .swiper-slide {
      padding-top: 100%;
      overflow: hidden;
      position: relative;
      border-radius: 5px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & .swiper-button-prev {
      left: 8px;
      color: #000;
    }

    & .swiper-button-next {
      right: 8px;
      color: #000;
    }
  }

  & .product-images-slider-thumbs {
    order: -1;
    flex-shrink: 0;
    & .swiper-slide {
      cursor: pointer;
      border-radius: 5px;
      position: relative;
      width: 52px !important;

      &-thumb-active::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 1;
        backdrop-filter: blur(0.8px);
        background: linear-gradient(230deg, #fff 0%, transparent 100%);
      }
    }
    & .swiper-wrapper {
      flex-direction: column;
      gap: 10px;
    }

    &-wrapper {
      width: 100%;
      padding-top: 100%;
      overflow: hidden;
      position: relative;
      border-radius: 5px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default ProductHoverDetail;
