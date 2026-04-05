import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/checkout/CheckoutContext";
import { initPayment } from "../../api/api";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { courseForCheckout } = useCheckout();

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  if (!courseForCheckout) {
    return (
      <div className="checkout-root">
        <div className="checkout-empty">
          <p>No course selected for checkout.</p>
          <button className="back-link" onClick={() => navigate("/")}>← Back to courses</button>
        </div>
      </div>
    );
  }

  const { courseId, title, price, currency } = courseForCheckout;

  const handleProceed = async () => {
    setLoading(true);
    setError("");

    try {
      const { response, data } = await initPayment({ courseId });

      if (response.status === 409) {
        setError("You are already enrolled in this course.");
        setLoading(false);
        return;
      }

      if (response.status === 401) {
        setError("You must be logged in to purchase a course.");
        setLoading(false);
        return;
      }

      if (!response.ok || !data.gatewayUrl) {
        setError(data?.message || "Could not reach the payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.gatewayUrl;

    } catch {
      setError("Could not reach the server. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-root">
      <div className="checkout-card">
        <button className="back-link" onClick={() => navigate("/")}>← Back to courses</button>

        <section className="order-summary">
          <h1>Checkout</h1>
          <div className="order-row">
            <div>
              <p className="order-course-title">{title}</p>
              <p className="order-course-id">Course ID: {courseId}</p>
            </div>
            <div className="order-price">৳{price}</div>
          </div>
        </section>

        <div className="divider" />

        <section className="provider-section">
          <h2>Payment</h2>
          <p style={{ color: "var(--color-text-muted, #666)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            You will be redirected to SSLCommerz&apos;s secure payment page where you can
            pay via <strong>bKash</strong>, <strong>Nagad</strong>, <strong>Rocket</strong>,
            credit/debit card, and more.
          </p>

          <div className="ssl-badge-row">
            {["bKash", "Nagad", "Rocket", "Visa", "Mastercard"].map((name) => (
              <span key={name} className="ssl-badge">{name}</span>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section className="txn-input-section">
          {error && <p className="txn-error">{error}</p>}

          <button
            className="verify-btn"
            onClick={handleProceed}
            disabled={loading}
          >
            {loading ? <span className="verify-spinner" /> : `Pay ৳${price} via SSLCommerz`}
          </button>

          <p className="ssl-security-note">
            🔒 Secured by SSLCommerz — your payment details are never shared with us.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Checkout;