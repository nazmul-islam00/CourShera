import { useState } from "react";
import { loginLocal, registerLocal } from "../../api/api";
import "./styles/AuthModal.css";

export const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const backendAuthUrl = `${import.meta.env.VITE_API_URL}/auth/google`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (password !== confirmPassword) {
        return setError("Passwords do not match.");
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return setError(
          "Password must be at least 8 characters and contain at least 1 letter and 1 number.",
        );
      }
    }

    const payload = isLogin ? { email, password } : { email, password, name };
    try {
      const { data } = isLogin
        ? await loginLocal(payload)
        : await registerLocal(payload);

      if (data.success) {
        window.location.reload();
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2>{isLogin ? "Log in" : "Create an account"}</h2>
        <p className="modal-subtitle">
          Learn on your own time from top universities and businesses.
        </p>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <button type="submit" className="primary-continue-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "5px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setName("");
              setConfirmPassword("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#0056d2",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLogin
              ? "New to Coursera? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <a href={backendAuthUrl} className="social-btn google-btn">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>

        <div className="modal-footer">
          <p>
            I accept Coursera's <a href="#">Terms of Use</a> and{" "}
            <a href="#">Privacy Notice</a>. Having trouble logging in?{" "}
            <a href="#">Learner help center</a>
          </p>
        </div>
      </div>
    </div>
  );
};
