import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '../redux/slices/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return {
    items,
    total,
    count,
    addToCart: (product, quantity = 1) =>
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.specialPrice || product.price,
          image: product.images?.[0],
          quantity,
        })
      ),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    incrementQuantity: (id) => dispatch(incrementQuantity(id)),
    decrementQuantity: (id) => dispatch(decrementQuantity(id)),
    clearCart: () => dispatch(clearCart()),
  };
};

export default useCart;
