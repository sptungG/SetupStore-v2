import {
  Affix,
  Alert,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Form,
  InputNumber,
  message,
  Radio,
  Rate,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BsArrowLeft,
  BsBoxArrowUpRight,
  BsBoxSeam,
  BsCartCheck,
  BsCartPlus,
  BsChatLeftText,
  BsCheck2Circle,
  BsDashLg,
  BsEye,
  BsHeart,
  BsHeartFill,
  BsPlusLg,
  BsStar,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import {
  useAddProductToCartMutation,
  useGetProductQuery,
  useProductViewIncMutation,
  useToggleProductWishlistMutation,
} from "src/stores/product/product.query";
import Button from "../button/Button";
import { useEventListener } from "src/common/useEventListener";
import { rgba } from "polished";
import { NOT_FOUND_IMG } from "src/common/constant";
import { checkValidColor } from "src/common/utils";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useGetMyCartQuery } from "src/stores/user/user.query";
import { useAddToCart } from "src/common/useAddToCart";
import ReactionChipTags from "../chip/ReactionChipTags";

const MAX_COUNT_CART = 10;
message.config({
  maxCount: 2,
  duration: 2,
});

const ProductDrawerDetail = ({ productId = null, setSelectedProduct }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [container, setContainer] = useState(null);
  const drawerBodyRef = useRef(null);
  const { cart, addProductToCart } = useAddToCart();
  const [activeThumb, setActiveThumb] = useState();
  const credential = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);
  const isSignedIn =
    user != null && credential.authtoken != null && credential.refreshToken != null;
  const isWishlisted = (wishlist = []) => !!wishlist?.find((u) => u._id === user._id);
  const { data: productQuery, isSuccess: productQuerySuccess } = useGetProductQuery(productId, {
    skip: !productId,
  });
  const [productViewInc, { isLoading: productViewIncLoading }] = useProductViewIncMutation();
  const [toggleProductWishlist, { isLoading: toggleProductWishlistLoading }] =
    useToggleProductWishlistMutation();
  const variantInCart = (variantId = null) =>
    variantId ? cart?.products.find((item) => item.variant._id === variantId) || null : null;
  const variantValue = Form.useWatch("variant", form);
  const quantityValue = Form.useWatch("quantity", form);
  useEffect(() => {
    if (
      productId === variantInCart(variantValue)?.product._id &&
      (variantInCart(variantValue)?.count || 0) + quantityValue === MAX_COUNT_CART
    ) {
      message.error(`Vượt quá LIMIT:${MAX_COUNT_CART} rồi!`);
    }
  }, [productId, quantityValue, variantValue]);

  useEffect(() => {
    if (productQuerySuccess) {
      const initialVariant = productQuery.data.variants[0];
      form.setFieldsValue({
        variant: initialVariant?._id,
        quantity: 0,
      });
    }
  }, [productQuery?.data, productQuerySuccess]);

  // useEffect(() => {
  //   if (productId) productViewInc(productId);
  // }, [productId]);

  const handleAddToCart = async (productId, { variant = "", quantity = 0 }) => {
    try {
      if (!quantity) message.error(`Tăng số lượng và thử lại nhé!`);
      if (!productId || !variant || !quantity) throw new Error("Invalid initdata");
      const cartRes = await addProductToCart({ productId, variantId: variant, quantity }).unwrap();
      message.success({
        content: (
          <>
            <div>Thêm <b>{quantity}</b> sản phẩm vào giỏ hàng thành công</div>
            <Space style={{ color: "#52c41a", textDecoration: "underline" }} wrap={false} size={2}>
              <BsBoxArrowUpRight /> <span>Đến giỏ hàng ngay</span>
            </Space>
          </>
        ),
        style: { cursor: "pointer" },
        onClick: () => navigate("/cart", { replace: true }),
        duration: 3,
      });
      setSelectedProduct(null);
      setActiveThumb(undefined);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleToggleWishlist = async (productId, isWishlisted) => {
    try {
      const productInWishlist = await toggleProductWishlist({ productId }).unwrap();
      if (!isWishlisted) {
        message.success("Thêm vào yêu thích thành công");
      } else {
        message.error("Hủy yêu thích thành công");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Drawer
      destroyOnClose
      visible={!!productId}
      onClose={() => {
        setSelectedProduct(null);
        setActiveThumb(undefined);
      }}
      closeIcon={<BsArrowLeft size={20} />}
      width={480}
      title={"Sản phẩm"}
      footerStyle={{
        padding: "10px 24px",
      }}
      extra={
        productQuerySuccess ? (
          <ReactionChipTags colorful={true} size={16} data={productQuery?.data} />
        ) : (
          <Skeleton.Input active block size="small" />
        )
      }
      getContainer={false}
      className="hide-scrollbar"
      footer={
        <FooterWrapper>
          <Row wrap={false} gutter={10}>
            <Col flex="auto">
              <Tooltip
                placement="topRight"
                destroyTooltipOnHide
                arrowPointAtCenter
                title={isSignedIn ? "Giỏ hàng! Click it" : "Đăng nhập trước nha"}
              >
                <Button
                  type="link"
                  htmlType="submit"
                  form="formDrawer"
                  extraType="btntag"
                  block
                  size="large"
                  icon={<BsCartPlus />}
                  className="btn-cart"
                  loading={!productQuerySuccess}
                  disabled={!productQuerySuccess || productQuery?.data.variants.length < 1}
                >
                  Thêm vào giỏ hàng · {quantityValue}
                </Button>
              </Tooltip>
            </Col>
            <Col flex="none">
              {productQuerySuccess ? (
                <Space
                  wrap={false}
                  split={<Divider type="vertical" />}
                  size={4}
                  className="extra-actions-container"
                >
                  <Tooltip
                    placement="topRight"
                    destroyTooltipOnHide
                    title={
                      isSignedIn
                        ? isWishlisted(productQuery?.data.wishlist)
                          ? "Bạn đã thích sản phẩm này"
                          : "Thêm vào Yêu thích"
                        : "Đăng nhập trước nha"
                    }
                  >
                    <button
                      className={classNames("btn-wishlist", {
                        active: isWishlisted(productQuery?.data.wishlist),
                      })}
                      onClick={() =>
                        handleToggleWishlist(productId, isWishlisted(productQuery?.data.wishlist))
                      }
                    >
                      {isWishlisted(productQuery?.data.wishlist) ? <BsHeartFill /> : <BsHeart />}·
                      <span>{productQuery?.data.wishlist.length}</span>
                    </button>
                  </Tooltip>
                  <Tooltip
                    placement="topRight"
                    destroyTooltipOnHide
                    title="Xem sản phẩm"
                    arrowPointAtCenter
                  >
                    <div className="btn-nav">
                      <Link to={`products/${productId}`}>
                        <BsBoxArrowUpRight />
                      </Link>
                    </div>
                  </Tooltip>
                </Space>
              ) : (
                <Skeleton.Button active block size="large" />
              )}
            </Col>
          </Row>
        </FooterWrapper>
      }
    >
      <ProductDrawerBodyWrapper ref={setContainer}>
        <div className="images-wrapper">
          {productQuerySuccess && (
            <div className="action-on-image">
              <Link to={`products/${productId}`}>
                <BsBoxArrowUpRight /> Xem sản phẩm
              </Link>
            </div>
          )}
          {productQuerySuccess ? (
            <div className="product-images">
              {productQuery.data.images.length < 1 || productQuery.data.images?.some((i) => !i) ? (
                <div className="product-images-slider-error">
                  <img src={NOT_FOUND_IMG} alt="NOT_FOUND_IMG" />
                </div>
              ) : (
                <>
                  <Swiper
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={productQuery.data.images.length > 1}
                    modules={[Navigation, Thumbs]}
                    grabCursor={true}
                    thumbs={{ swiper: activeThumb }}
                    className="product-images-slider"
                  >
                    {productQuery.data.images.map((item, index) => (
                      <SwiperSlide key={item._id + "product-images-slider"}>
                        <img src={item.url} alt={item._id} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setActiveThumb}
                    loop={productQuery.data.images.length > 4}
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Navigation, Thumbs]}
                    className="product-images-slider-thumbs"
                  >
                    {productQuery.data.images.map((item, index) => (
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
          ) : (
            <Skeleton active />
          )}
        </div>
        {productQuerySuccess ? (
          <div className="product-content">
            <Typography.Title level={4} className="name">
              {productQuery.data.name}
            </Typography.Title>
            <Typography.Paragraph
              ellipsis={{ rows: 3, expandable: true, symbol: "Xem thêm" }}
              className="desc"
            >
              {productQuery.data.desc}
            </Typography.Paragraph>
            <Space split={<Divider type="vertical" />} size={2} wrap={false} align="baseline">
              <Space className="rating" wrap={false} size={8} align="baseline">
                <Rate disabled defaultValue={productQuery.data.avgRating} />
                <span className="rating-value">{`( ${productQuery.data.numOfReviews} đánh giá )`}</span>
              </Space>
              <div>{productQuery.data.numOfViews} · lượt xem</div>
            </Space>
            <Form
              form={form}
              layout="vertical"
              id="formDrawer"
              onFinish={(values) => handleAddToCart(productId, values)}
            >
              <Divider orientation="left" plain>
                Phiên bản · {productQuery.data.variants.length}
              </Divider>

              {productQuery.data.variants.length > 0 ? (
                <Form.Item name="variant" noStyle>
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={() => form.setFieldsValue({ quantity: 0 })}
                  >
                    {productQuery.data.variants.map((item) => (
                      <VariantItemWrapper key={item._id} checked={variantValue === item._id}>
                        <Radio value={item._id} id={item._id}>
                          <div className="container">
                            <div className="media">
                              <div className="image-wrapper">
                                <img
                                  alt={item._id}
                                  src={
                                    productQuery.data.images.find((img) => img._id === item.image)
                                      ?.url || NOT_FOUND_IMG
                                  }
                                />
                                <div className="price">
                                  <Statistic
                                    suffix="₫"
                                    className="price-tag"
                                    valueStyle={{ fontSize: 14 }}
                                    value={item.price}
                                  ></Statistic>
                                </div>
                                {!!variantInCart(item._id) && (
                                  <div className="incart">
                                    <Space size={2} split="·" className="incart-tag">
                                      <BsCartCheck size={16.5} />
                                      {variantInCart(item._id).count}
                                    </Space>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="content">
                              <Descriptions column={1} size="small">
                                {item.options.map((o, index) => (
                                  <Descriptions.Item
                                    label={o.name}
                                    span={1}
                                    key={`variant_options_${item._id}_${index}`}
                                  >
                                    {checkValidColor(o.value) ? (
                                      <Tag
                                        color={o.value}
                                        className={"tag"}
                                        style={{ height: 22, width: 22, margin: 0 }}
                                      >
                                        {" "}
                                      </Tag>
                                    ) : (
                                      <Tag
                                        color={"default"}
                                        className={"tag"}
                                        style={{ maxWidth: 43, margin: 0 }}
                                      >
                                        <Typography.Text ellipsis>{o.value}</Typography.Text>
                                      </Tag>
                                    )}
                                  </Descriptions.Item>
                                ))}
                              </Descriptions>
                            </div>
                            <div className="extra-content">
                              <Tooltip
                                destroyTooltipOnHide
                                color={"#fafafa"}
                                placement="leftBottom"
                                overlayStyle={{ maxWidth: 140 }}
                                title={
                                  <Descriptions column={2} size="small">
                                    <Descriptions.Item label="Đã bán" span={2}>
                                      {item.sold}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Kho" span={2}>
                                      {item.quantity}
                                    </Descriptions.Item>
                                  </Descriptions>
                                }
                              >
                                <Space direction="vertical">
                                  <Space size={2} split="·" align="center">
                                    <BsCheck2Circle size={16.5} />
                                    <span>{item.sold}</span>
                                  </Space>
                                  <Space size={2} split="·" align="center">
                                    <BsBoxSeam size={14} />
                                    <span>{item.quantity}</span>
                                  </Space>
                                </Space>
                              </Tooltip>
                            </div>
                            <div className="actions">
                              {variantValue === item._id && (
                                <Form.Item noStyle name={"quantity"}>
                                  <InputNumber
                                    addonBefore={
                                      <BsDashLg
                                        onClick={() =>
                                          form.setFieldsValue({
                                            quantity: quantityValue > 2 ? quantityValue - 1 : 1,
                                          })
                                        }
                                      />
                                    }
                                    addonAfter={
                                      <BsPlusLg
                                        onClick={() =>
                                          form.setFieldsValue({
                                            quantity:
                                              (variantInCart(variantValue)?.count || 0) +
                                                quantityValue <
                                              MAX_COUNT_CART
                                                ? quantityValue + 1
                                                : MAX_COUNT_CART -
                                                  (variantInCart(variantValue)?.count || 0),
                                          })
                                        }
                                      />
                                    }
                                    min={0}
                                    max={MAX_COUNT_CART}
                                    controls={false}
                                    step={1}
                                  />
                                </Form.Item>
                              )}
                            </div>
                          </div>
                        </Radio>
                      </VariantItemWrapper>
                    ))}
                  </Radio.Group>
                </Form.Item>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Form>
          </div>
        ) : (
          <Skeleton active />
        )}
      </ProductDrawerBodyWrapper>
    </Drawer>
  );
};

const VariantItemWrapper = styled.div`
  background-color: ${(props) => (props.checked ? props.theme.generatedColors[0] : "#fafafa")};
  border: 1px solid ${(props) => (props.checked ? props.theme.generatedColors[3] : "#f5f5f5")};
  padding: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
  position: relative;
  width: 100%;
  & .ant-radio-wrapper {
    width: 100%;
    margin-right: 0;
    & > span:nth-child(2) {
      width: 100%;
    }
  }
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  & .container {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
    width: 100%;
    & .content {
      padding-left: 12px;
      border-left: 1px solid #d9d9d9;
      align-self: ${(props) => (props.checked ? "flex-end" : "stretch")};
    }
    & .extra-content {
      align-self: ${(props) => (props.checked ? "flex-end" : "stretch")};
      padding-bottom: 8px;
      & .ant-space-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
  & .image-wrapper {
    flex-shrink: 0;
    width: 160px;
    height: 90px;
    position: relative;
    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    & .incart {
      position: absolute;
      bottom: 12px;
      right: 12px;
      z-index: 1;
      transition: all 0.3s;
      & .incart-tag {
        padding: 3px 6px 0px 6px;
        background-color: ${(props) =>
          rgba(props.checked ? props.theme.generatedColors[1] : "#fafafa", 0.6)};
        backdrop-filter: blur(6px);
        color: ${(props) => (props.checked ? props.theme.generatedColors[5] : "#8c8c8c")};
      }
    }
    & .price {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 1;
      transition: all 0.3s;
      & .price-tag {
        padding: 1px 6px;
        background-color: ${(props) =>
          rgba(props.checked ? props.theme.generatedColors[1] : "#fafafa", 0.6)};
        backdrop-filter: blur(6px);
      }
      & .price-tag .ant-statistic-content {
        color: ${(props) => (props.checked ? props.theme.generatedColors[5] : "#8c8c8c")};
      }
    }
  }
  & .actions {
    height: fit-content;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(13px, -30px);
  }
  & .ant-input-number-group-wrapper {
    max-width: 112px;
    height: 32px;
    overflow: hidden;
    background-color: #fff;
    & .ant-input-number-group-addon {
      background-color: transparent;
      &:hover {
        color: ${(props) => props.theme.primaryColor};
        background-color: ${(props) => props.theme.generatedColors[0]};
      }
    }
    & .ant-input-number-input {
      text-align: center;
    }
  }
`;

const FooterWrapper = styled.div`
  & .extra-actions-container {
    border: 1px solid ${(props) => props.theme.generatedColors[0]};
    width: 100%;
    height: 100%;
    padding: 0 12px;
  }
  & .btn-cart {
    border: 1px solid transparent;
    &:hover {
      text-decoration: underline;
      border-color: ${(props) => props.theme.generatedColors[3]};
    }
  }
  & .btn-nav {
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.primaryColor};
    }
  }
  & .btn-wishlist {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #8c8c8c;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    flex-wrap: nowrap;
    border: none;
    outline: none;
    cursor: pointer;

    &.active {
      color: #ff4d4f;
    }
    &:hover {
      color: #ff4d4f;
      border-bottom: 1px solid #ff4d4f;
    }
  }
`;
const ProductDrawerBodyWrapper = styled.div`
  & .product-content {
  }
  & .ant-empty-normal {
    border: 1px dashed #d9d9d9;
    padding: 24px 0;
    margin: 0;
  }
  & .images-wrapper {
    flex-shrink: 0;
    position: relative;
    margin-bottom: 24px;
  }
  & .action-on-image {
    position: absolute;
    bottom: 10px;
    right: 24px;
    z-index: 10;
    border-radius: 5px;
    padding: 4px 12px;
    background-color: ${(props) => rgba(props.theme.generatedColors[0], 0.5)};
    backdrop-filter: blur(4px);
    & a {
      text-decoration: underline;
      font-size: 16px;
    }
    &:hover {
      background-color: ${(props) => props.theme.generatedColors[0]};
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
  & .product-images-slider-error {
    width: 100%;
    height: 240px;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  & .product-images-slider {
    width: 100%;
    height: 100%;
    max-height: 240px;
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
        object-position: center center;
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
const ReactionsWrapper = styled.div`
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
`;

export default ProductDrawerDetail;
