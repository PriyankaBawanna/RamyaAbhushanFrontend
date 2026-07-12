import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import PaymentGatewayModal from '../components/organisms/PaymentGatewayModal';
import useAuth from '../hooks/useAuth';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/slices/cartSlice';
import { formatCurrency } from '../utils/formatCurrency';

const Checkout = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
  });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const finalizeOrder = (paymentId = null) => {
    // TODO: Replace with real API call e.g. POST /api/orders
    // body: { ...form, items, total, paymentId, paymentMethod: form.paymentMethod }
    console.log('Order placed (dummy):', { ...form, items, total, paymentId });
    alert(
      paymentId
        ? `Payment successful (${paymentId}). Order placed!`
        : 'Order placed successfully with Cash on Delivery!'
    );
    dispatch(clearCart());
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.paymentMethod === 'online') {
      setIsPaymentOpen(true);
    } else {
      finalizeOrder();
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <p>Your cart is empty. Add products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <h3>Shipping Details</h3>
          <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <Input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />

          <h3>Payment Method</h3>
          <label className="radio-row">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === 'cod'}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <label className="radio-row">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={form.paymentMethod === 'online'}
              onChange={handleChange}
            />
            Pay Online (Card / UPI / Netbanking)
          </label>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="checkout-summary-row">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button type="submit" variant="primary" fullWidth>
            {form.paymentMethod === 'online' ? 'Proceed to Pay' : 'Place Order'}
          </Button>
        </div>
      </form>

      {isPaymentOpen && (
        <PaymentGatewayModal
          amount={total}
          onClose={() => setIsPaymentOpen(false)}
          onSuccess={(paymentId) => {
            setIsPaymentOpen(false);
            finalizeOrder(paymentId);
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
