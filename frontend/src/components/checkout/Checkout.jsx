import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/checkout/CheckoutContext";
import "./Checkout.css";

const PAYMENT_PROVIDERS = [
  { id: "BKASH",  label: "bKash",  color: "#E2136E", number: "01712-345678" },
  { id: "NAGAD",  label: "Nagad",  color: "#F7941D", number: "01811-345678" },
  { id: "ROCKET", label: "Rocket", color: "#8C3494", number: "01911-345678" },
];

const STATUS = { IDLE: "IDLE", LOADING: "LOADING", SUCCESS: "SUCCESS", FAILED: "FAILED", ERROR: "ERROR" };

const Checkout = () => {
  const navigate = useNavigate();
  const { courseForCheckout } = useCheckout();

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
  const activeProvider = PAYMENT_PROVIDERS.find((p) => p.id === selectedProvider);

  const handleVerify = async () => {
    if (!transactionId.trim()) return;
    setStatus(STATUS.LOADING);
    setErrorMessage("");

    const payload = {
      courseId,
      amount: price,
      currency,
      provider: selectedProvider,
      transaction_id: transactionId.trim(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === "COMPLETED") {
          setStatus(STATUS.SUCCESS);
          setResponseData(data);
        } else if (data.status === "PENDING") {
          setStatus(STATUS.FAILED);
          setErrorMessage("Your payment is still pending. Please try again shortly.");
        } else {
          setStatus(STATUS.FAILED);
          setErrorMessage("Payment failed at the gateway. Please try again.");
        }
      } else if (response.status === 402) {
        setStatus(STATUS.FAILED);
        setErrorMessage(data?.message || "Transaction failed. Please double-check and try again.");
      } else if (response.status === 401) {
        setStatus(STATUS.ERROR);
        setErrorMessage(data?.message || "You must be logged in to complete a purchase.");
      } else {
        setStatus(STATUS.ERROR);
        setErrorMessage(data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus(STATUS.ERROR);
      setErrorMessage("Could not reach the server. Please check your connection.");
    }
  };

  
  if (status === STATUS.SUCCESS) {
    // if (status === STATUS.SUCCESS && responseData) {
      console.log("Response Data:", responseData);
    // }
    return (
      <div className="checkout-root">
        <div className="checkout-success-card">
          <div className="success-icon">✓</div>
          <h2>Payment Confirmed!</h2>
          <p className="success-course">{title}</p>
          <div className="success-details">
            <div className="success-row"><span>Transaction ID</span><span>{responseData?.transactionId}</span></div>
            <div className="success-row"><span>Amount Paid</span><span>৳{responseData?.paid}</span></div>
            <div className="success-row"><span>Status</span><span className="status-badge completed">{responseData?.status}</span></div>
            <div className="success-row"><span>Processed At</span><span>{new Date(responseData?.processedAt).toLocaleString()}</span></div>
          </div>
          <button className="go-home-btn" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

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
          <h2>Select Payment Method</h2>
          <div className="provider-grid">
            {PAYMENT_PROVIDERS.map((p) => (
              <button
                key={p.id}
                className={`provider-btn ${selectedProvider === p.id ? "provider-btn--active" : ""}`}
                style={selectedProvider === p.id ? { borderColor: p.color, background: p.color + "12" } : {}}
                onClick={() => {
                  setSelectedProvider(p.id);
                  setStatus(STATUS.IDLE);
                  setTransactionId("");
                  setErrorMessage("");
                }}
              >
                <span className="provider-dot" style={{ background: p.color }} />
                {p.label}
                {selectedProvider === p.id && <span className="provider-check">✓</span>}
              </button>
            ))}
          </div>
        </section>

        {activeProvider && (
          <>
            <div className="divider" />
            <section className="payment-instructions">
              <div className="instruction-header" style={{ background: activeProvider.color }}>
                <span className="instruction-provider-name">{activeProvider.label}</span>
                <span className="instruction-step">Send Money</span>
              </div>

              <div className="instruction-body">
                <p className="instruction-label">Send exactly</p>
                <p className="instruction-amount">৳{price} <span className="currency-tag">{currency}</span></p>

                <p className="instruction-label">To this {activeProvider.label} number</p>
                <div className="instruction-number">
                  <span>{activeProvider.number}</span>
                  <button
                    className="copy-btn"
                    onClick={() => navigator.clipboard.writeText(activeProvider.number.replace("-", ""))}
                  >
                    Copy
                  </button>
                </div>

                <ol className="instruction-steps">
                  <li>Open your <strong>{activeProvider.label}</strong> app</li>
                  <li>Go to <strong>Send Money</strong></li>
                  <li>Enter the number above and send <strong>৳{price}</strong></li>
                  <li>Copy the <strong>Transaction ID</strong> from the confirmation screen</li>
                  <li>Paste it below and hit <strong>Verify Payment</strong></li>
                </ol>
              </div>

              <div className="txn-input-section">
                <label className="txn-label" htmlFor="txnId">Your Transaction ID</label>
                <input
                  id="txnId"
                  className="txn-input"
                  type="text"
                  placeholder="e.g. ABCDE12345"
                  value={transactionId}
                  onChange={(e) => {
                    setTransactionId(e.target.value);
                    if (status !== STATUS.IDLE) { setStatus(STATUS.IDLE); setErrorMessage(""); }
                  }}
                  disabled={status === STATUS.LOADING}
                />

                {(status === STATUS.FAILED || status === STATUS.ERROR) && (
                  <p className="txn-error">{errorMessage}</p>
                )}

                <button
                  className="verify-btn"
                  style={{ background: activeProvider.color }}
                  onClick={handleVerify}
                  disabled={!transactionId.trim() || status === STATUS.LOADING}
                >
                  {status === STATUS.LOADING ? <span className="verify-spinner" /> : "Verify Payment"}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;