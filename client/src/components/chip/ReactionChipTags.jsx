import { Space, Typography } from "antd";
import classNames from "classnames";
import { rgba } from "polished";
import React from "react";
import { BsChatLeftText, BsEye, BsHeart, BsHeartFill, BsStar } from "react-icons/bs";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ReactionChipTags = ({ colorful = true, size = 8, data }) => {
  const { data: user } = useSelector((state) => state.user);
  const isWishlisted = (wishlist = [], userId) =>
    userId && !!wishlist?.find((u) => u._id === userId);
  const { numOfViews, avgRating, numOfReviews, wishlist } = data;
  return (
    <ReactionsWrapper size={size} className={colorful ? "colorful" : "no-colorful"}>
      <div className="reaction">
        <span>
          <BsEye size={14} />
        </span>
        <h4>{numOfViews || 0}</h4>
      </div>
      <div className="reaction">
        <span>
          <BsStar size={14} />
        </span>
        <h4>{avgRating || 0}</h4>
      </div>
      <div className="reaction">
        <span>
          <BsChatLeftText size={14} />
        </span>
        <h4>{numOfReviews || 0}</h4>
      </div>
      <div
        className={classNames("reaction wishlist", { active: isWishlisted(wishlist, user?._id) })}
      >
        <span>
          {isWishlisted(wishlist, user?._id) ? <BsHeartFill size={14} /> : <BsHeart size={14} />}
        </span>
        <h4>{wishlist?.length || 0}</h4>
      </div>
    </ReactionsWrapper>
  );
};

const ReactionsWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${(props) => props.size + "px"};

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
    overflow: hidden;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: #fafafa;
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
  }
  &.no-colorful .reaction {
    color: #17024f;
    background: ${rgba("#f0f0f0", 0.25)};
  }
  &.colorful .reaction {
    &:nth-child(1) {
      color: #00b4d8;
      background: ${rgba("#00b4d8", 0.25)};
    }
    &:nth-child(2) {
      color: #ffb703;
      background: ${rgba("#ffb703", 0.25)};
    }
    &:nth-child(3) {
      color: #ffb703;
      background: ${rgba("#ffb703", 0.25)};
    }
    &:nth-child(4) {
      color: #ff0054;
      background: ${rgba("#ff0054", 0.25)};
    }
  }
  & .reaction.wishlist.active {
    color: #ff0054;
  }
`;

export default ReactionChipTags;
