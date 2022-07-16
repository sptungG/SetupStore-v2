import { message } from "antd";
import { useToggleProductWishlistMutation } from "src/stores/product/product.query";

export const isWishlisted = (wishlist = [], userId) =>
  userId && !!wishlist?.find((u) => u._id === userId);

export function useToggleWishlist() {
  const [toggleProductWishlist, { isLoading: toggleProductWishlistLoading }] =
    useToggleProductWishlistMutation();
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

  // console.log("useAddToCart ~ cart", cart);

  return {
    toggleProductWishlistLoading,
    handleToggleWishlist,
  };
}
