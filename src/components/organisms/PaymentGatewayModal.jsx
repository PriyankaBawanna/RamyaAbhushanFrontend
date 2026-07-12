import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * PaymentGatewayModal — DUMMY SIMULATION.
 *
 * Yeh component abhi ek local card-form dikhata hai aur payment ko fake
 * "processing" ke baad success mark kar deta hai. Real gateway lagane ke liye:
 *
 * --- Razorpay ---
 * 1. Backend par order create karo: POST /api/create-order -> { orderId, amount, currency }
 * 2. Razorpay checkout script index.html me add karo:
 *      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
 * 3. Is component ke andar 'Pay Now' click par:
 *      const options = {
 *        key: 'RAZORPAY_KEY_ID',
 *        amount: amount * 100, // paise
 *        currency: 'INR',
 *        order_id: orderId, // backend se aaya hua
 *        handler: (response) => onSuccess(response.razorpay_payment_id),
 *        prefill: { name, email, contact },
 *        theme: { color: '#6b2737' },
 *      };
 *      const rzp = new window.Razorpay(options);
 *      rzp.open();
 *
 * --- Stripe ---
 * 1. Backend par PaymentIntent banao: POST /api/create-payment-intent -> { clientSecret }
 * 2. @stripe/react-stripe-js ke <Elements> + <PaymentElement> use karo isi modal ki jagah.
 * 3. stripe.confirmPayment() call karke onSuccess(paymentIntent.id) call karo.
 *
 * Dono cases me is component ka bahar wala contract same rahega:
 * props: { amount, onSuccess(paymentId), onClose }
 */
const PaymentGatewayModal = ({ amount, onSuccess, onClose }) => {
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', cardName: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'failed'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    setStatus('processing');

    // Simulated network delay — replace this whole block with real gateway SDK call.
    setTimeout(() => {
      const isValid = form.cardNumber.replace(/\s/g, '').length >= 12 && form.cvv.length >= 3;
      if (isValid) {
        setStatus('success');
        const dummyPaymentId = `pay_${Date.now()}`;
        setTimeout(() => onSuccess(dummyPaymentId), 700);
      } else {
        setStatus('failed');
      }
    }, 1400);
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-modal-header">
          <h3>Secure Payment</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close payment modal">
            ✕
          </button>
        </div>

        <p className="payment-modal-amount">Amount Payable: {formatCurrency(amount)}</p>

        {status === 'success' ? (
          <div className="payment-status payment-status-success">
            ✔ Payment successful! Placing your order...
          </div>
        ) : (
          <form onSubmit={handlePay} className="payment-form">
            <input
              className="input"
              name="cardName"
              placeholder="Name on card"
              value={form.cardName}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              maxLength={19}
              required
            />
            <div className="payment-form-row">
              <input
                className="input"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                maxLength={5}
                required
              />
              <input
                className="input"
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
                maxLength={4}
                required
              />
            </div>

            {status === 'failed' && (
              <p className="auth-error">Payment failed. Please check your card details.</p>
            )}

            <button type="submit" className="btn btn-primary btn-full" disabled={status === 'processing'}>
              {status === 'processing' ? 'Processing...' : `Pay ${formatCurrency(amount)}`}
            </button>
            <p className="payment-modal-note">
              This is a simulated payment screen — no real card data is transmitted. Any card
              number of 12+ digits and a CVV will succeed.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentGatewayModal;
