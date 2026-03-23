export const AuthButtons = () => {
  const backendAuthUrl = `${import.meta.env.VITE_API_URL}/auth/google`;

  return (
    <div className="auth-buttons">
      <a href={backendAuthUrl} className="login-link">
        Log In
      </a>
      <a href={backendAuthUrl} className="join-button">
        Join for Free
      </a>
    </div>
  );
};
