import { useSearchParams, useNavigate } from "react-router-dom";
import "./PaymentResult.css";

const CONTENT = {
  success: {
    icon: "✓",
    iconClass: "result-icon result-icon--success",
    title: "Payment Successful!",
    body: "Your enrollment is confirmed. You can now access the course from your profile.",
    primaryLabel: "Go to My Courses",
    primaryPath: "/me",
    secondaryLabel: "Browse More Courses",
    secondaryPath: "/",
  },
  failed: {
    icon: "✕",
    iconClass: "result-icon result-icon--failed",
    title: "Payment Failed",
    body: "Something went wrong with your payment. No money has been deducted. Please try again.",
    primaryLabel: "Try Again",
    primaryPath: "/",
    secondaryLabel: "Go Home",
    secondaryPath: "/",
  },
  cancelled: {
    icon: "○",
    iconClass: "result-icon result-icon--cancelled",
    title: "Payment Cancelled",
    body: "You cancelled the payment. Your cart is still saved — come back whenever you're ready.",
    primaryLabel: "Return to Course",
    primaryPath: -1, 
    secondaryLabel: "Go Home",
    secondaryPath: "/",
  },
};

const PaymentResult = () => {
  const [params]   = useSearchParams();
  const navigate   = useNavigate();
  const status     = params.get("status") || "failed";
  const tran_id    = params.get("tran_id");
  const content    = CONTENT[status] ?? CONTENT.failed;

  return (
    <div className="result-root">
      <div className="result-card">
        <div className={content.iconClass}>{content.icon}</div>
        <h2 className="result-title">{content.title}</h2>
        <p className="result-body">{content.body}</p>

        {status === "success" && tran_id && (
          <p className="result-tran-id">Transaction ID: <strong>{tran_id}</strong></p>
        )}

        <div className="result-actions">
          <button
            className="result-btn result-btn--primary"
            onClick={() =>
              content.primaryPath === -1 ? navigate(-1) : navigate(content.primaryPath)
            }
          >
            {content.primaryLabel}
          </button>
          <button
            className="result-btn result-btn--secondary"
            onClick={() => navigate(content.secondaryPath)}
          >
            {content.secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;