import { useState } from "react";

import { AuthModal } from "./AuthModal";

export const AuthButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="auth-buttons">
      <button onClick={() => setIsModalOpen(true)} className="login-link">
        Log In
      </button>
      <button onClick={() => setIsModalOpen(true)} className="join-button">
        Join for Free
      </button>

      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
