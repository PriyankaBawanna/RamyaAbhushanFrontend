import { useDispatch, useSelector } from 'react-redux';
import {
  toggleWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from '../redux/slices/wishlistSlice';

const useWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  const isWishlisted = (productId) => items.some((item) => item.id === productId);

  return {
    items,
    isWishlisted,
    toggleWishlist: (product) => dispatch(toggleWishlist(product)),
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
  };
};

export default useWishlist;
