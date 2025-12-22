import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  HiArrowLeft,
  HiLockClosed,
  HiMail,
  HiInformationCircle,
} from "react-icons/hi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-page-simple">
      <div className="login-card">
        <div className="login-content">
          {/* Left Side - Form */}
          <div className="login-form-section">
            {/* Header */}
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && <div className="login-error">⚠️ {error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="login-form-simple">
              {/* Email */}
              <div className="input-group">
                <div className="input-icon">
                  <HiMail />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <div className="input-icon">
                  <HiLockClosed />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="login-submit">
                Sign In
              </button>
            </form>

            {/* Back Button */}
            <button onClick={() => navigate("/")} className="back-btn">
              <HiArrowLeft /> Back to Home
            </button>
          </div>

          {/* Right Side - Demo Credentials (Desktop Only) */}
          <div className="demo-credentials-section">
            <div className="demo-card">
              <div className="demo-header">
                <HiInformationCircle className="demo-icon" />
                <h3>Test Credentials</h3>
              </div>
              <div className="demo-content">
                <div className="credential-item">
                  <span className="cred-label">Email:</span>
                  <span className="cred-value">user@gmail.com</span>
                </div>
                <div className="credential-item">
                  <span className="cred-label">Password:</span>
                  <span className="cred-value">1234</span>
                </div>
              </div>
              <div className="demo-tip">
                💡 Use these credentials to test the login
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info for Mobile */}
        <div className="demo-info-mobile">
          <div className="demo-credentials-mobile">
            <span>Test: user@gmail.com / 1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
