import { Avatar, Popover, Skeleton, Space, Statistic, Tag, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { BsCartPlus, BsChatLeftText, BsEye, BsHeart, BsLayoutWtf, BsStar } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import { Link, useNavigate } from "react-router-dom";
import ProductHoverDetail from "./ProductHoverDetail";
import Button from "../button/Button";
import { useAddToCart } from "src/common/useAddToCart";
import { useMediaQuery } from "react-responsive";

export const ProductCardLoading = () => {
  return (
    <CardWrapper status={"loading"}>
      <div className="card-action-top">
        <Skeleton.Input active style={{ width: "100%", borderRadius: 5 }} size="small" />
      </div>
      <div className="card-head">
        <Skeleton.Image className="card-img" active />
        <div className="card-content">
          <Skeleton.Avatar shape="square" size={40} active style={{ borderRadius: 10 }} />
          <Skeleton.Input active style={{ width: "100%", borderRadius: 5 }} size="small" />
        </div>
      </div>
    </CardWrapper>
  );
};

const ProductCard = ({ product }) => {
  const { setCart } = useAddToCart();
  let navigate = useNavigate();
  const mediaAbove1024 = useMediaQuery({ minWidth: 1024 });

  return (
    <CardWrapper>
      <Space className="card-action-top">
        <Statistic value={product.price} suffix="₫" className="price-tag" />
      </Space>
      <div className="card-head">
        <Link className="card-img" title={`Xem chi tiết sản phẩm`} to={`products/${product._id}`}>
          <img src={product.images[0].url} alt={product._id} />
        </Link>
        <div className="card-content">
          <div className="card-content-detail">
            {product.combos.length > 0 ? (
              <Avatar.Group maxCount={1}>
                {product.combos.map((c) => (
                  <Link to={`combos/${c._id}`} key={`ProductCombos_${c._id}`}>
                    <Avatar
                      size={40}
                      shape={"square"}
                      src={c.image.url}
                      icon={<BsLayoutWtf />}
                      title="Đi đến Bộ sưu tập"
                    ></Avatar>
                  </Link>
                ))}
              </Avatar.Group>
            ) : (
              <Avatar size={40} shape={"square"} icon={<BsLayoutWtf />} title="Bộ sưu tập"></Avatar>
            )}
            {mediaAbove1024 ? (
              <Popover
                content={<ProductHoverDetail product={product} />}
                placement="topRight"
                destroyTooltipOnHide
                autoAdjustOverflow
                color={"#f8f9fa"}
                overlayInnerStyle={{ borderRadius: 10 }}
              >
                <div className="card-content-info">
                  <Typography.Title level={5} ellipsis className="name">
                    {product.name}
                  </Typography.Title>
                  <Typography.Paragraph ellipsis className="desc">
                    {product.desc}
                  </Typography.Paragraph>
                </div>
              </Popover>
            ) : (
              <div
                className="card-content-info"
                // onClick={() => navigate(`products/${product._id}`)}
              >
                <Typography.Title level={5} ellipsis className="name">
                  {product.name}
                </Typography.Title>
                <Typography.Paragraph ellipsis className="desc">
                  {product.desc}
                </Typography.Paragraph>
              </div>
            )}
          </div>
          <Space className="card-content-action">
            <Button
              type="link"
              extraType="btntag"
              size="large"
              icon={<BsCartPlus />}
              className="btn-cart"
              title="Thêm vào giỏ hàng"
            ></Button>
          </Space>
        </div>
      </div>
      <div className="card-reactions">
        <div className="reaction">
          <span>
            <BsEye size={14} />
          </span>
          <h4>{product.numOfViews}</h4>
        </div>
        <div className="reaction">
          <span>
            <BsChatLeftText size={14} />
          </span>
          <h4>{product.numOfReviews}</h4>
        </div>
        <div className="reaction">
          <span>
            <BsStar size={14} />
          </span>
          <h4>{product.avgRating}</h4>
        </div>
        <div className="reaction">
          <span>
            <BsHeart size={14} />
          </span>
          <h4>{product.wishlist.length}</h4>
        </div>
      </div>
    </CardWrapper>
  );
};

const card_option = keyframes`
    0% {
        margin-top: -10px;
        opacity: 0;  
    }
    100% {
        margin-top: 0px;
        opacity: 1;
    }
`;

const CardWrapper = styled.div`
  width: 330px;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s;
  pointer-events: ${(props) => (props.status === "loading" ? "none" : "auto")};

  &::before {
    content: "";
    border-radius: 10px;
    position: absolute;
    background: ${(props) => (props.status === "loading" ? "#f8f9fa" : "#eee")};
    bottom: 0px;
    right: 0px;
    top: ${(props) => (props.status === "loading" ? "calc(50% + 20px)" : "50%")};
    height: calc(100% - 60px);
    width: calc(100% - 40px);
    z-index: -1;
    transform: translateY(-50%);
    transition: all 0.3s;
  }
  & .card-head {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  & .card-img {
    width: 100%;
    height: 195px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
    border: 1px solid #eee;
    background-color: #eee;
    cursor: pointer;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & .card-content {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    margin: 15px 0px 6px 0px;
    position: relative;
    &-detail {
      width: fit-content;
      height: 100%;
      display: flex;
      flex-direction: revert;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      & .ant-avatar-square {
        border-radius: 10px;
        border: 1px solid #eee;
      }
    }
    &-info {
      max-width: 176px;
    }
    &-info .name {
      margin-bottom: 2px;
    }
    &-info .desc {
      margin-bottom: 0;
    }
    &-action {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      & .btn-cart {
        border: 1px solid ${(props) => props.theme.generatedColors[1]};
      }
    }
  }
  & .card-action-top {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 1;
    transition: all 0.3s;
    & .price-tag {
      border-radius: 5px;
      padding: 1px 6px;
      background-color: ${(props) => rgba(props.theme.generatedColors[1], 0.8)};
    }
    & .price-tag .ant-statistic-content {
      font-size: 16px;
      color: ${(props) => props.theme.generatedColors[5]};
    }
  }
  & .card-reactions {
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    & .reaction {
      width: fit-content;
      height: fit-content;
      padding: 2px 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      background: transparent;
      color: ${(props) => props.theme.generatedColors[9]};
      font-size: 14px;
      border-radius: 5px;

      margin-top: 0px;
      transform: translateY(-10px);
      opacity: 0;
      overflow: hidden;
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #f8f9fa;
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
      }
      & > span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
      }
      & > h4 {
        font-size: inherit;
        color: inherit;
        margin-bottom: 0;
      }

      &:nth-child(1):hover {
        color: #00b4d8;
      }
      &:nth-child(2):hover {
        color: #ffc300;
      }
      &:nth-child(3):hover {
        color: #ffb703;
      }
      &:nth-child(4):hover {
        color: #ff0054;
      }
    }
  }
  &:hover {
    &::before {
      width: 100%;
      height: 100%;
    }
    & .card-img {
      border-radius: 10px;
    }
    & .card-img::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      right: 0px;
      /* background: linear-gradient(230deg, black 0%, transparent 100%); */
    }
    & .card-action-top {
      opacity: 1;
      visibility: visible;
    }
    & .reaction {
      opacity: 1;
      transform: translateY(0px);
    }
    & .reaction:nth-child(1) {
      transition: all 0.4s 0.4s;
      animation: ${card_option} 0.4s 0.4s;
    }
    & .reaction:nth-child(2) {
      transition: all 0.4s 0.3s;
      animation: ${card_option} 0.4s 0.3s;
    }
    & .reaction:nth-child(3) {
      transition: all 0.3s 0.2s;
      animation: ${card_option} 0.3s 0.2s;
    }
    & .reaction:nth-child(4) {
      transition: all 0.4s;
      animation: ${card_option} 0.4s;
    }
  }
  @media screen and (max-width: 1023.98px) {
    /* pointer-events: none;
    .reaction {
      opacity: 1;
      transform: translateY(0px);
    } */
  }
`;

export default ProductCard;
