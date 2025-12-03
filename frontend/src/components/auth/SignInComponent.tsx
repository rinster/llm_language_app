import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser, type LoginRequest } from "../../services/UserService";

const SignInComponent: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(credentials);
      signIn(response.data);
      navigate("/categories");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError("Unable to sign in. Please try again later.");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.6);
          color: white;
          backdrop-filter: blur(12px);
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.25rem;
        }

        .auth-subtitle {
          text-align: center;
          color: rgba(226, 232, 240, 0.75);
          margin-bottom: 2rem;
        }

        .form-control {
          border-radius: 14px;
          padding: 0.85rem 1rem;
          border: 1px solid rgba(148, 163, 184, 0.4);
          color: white;
        }

        .form-control:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 14px;
          padding: 0.85rem 1rem;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -10px rgba(99, 102, 241, 0.8);
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.15);
          color: #fecaca;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
        }
      `}</style>

      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to pick up where you left off.</p>

        {error && <div className="error-alert mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@flashmind.app"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label className="form-label fw-semibold">Password</label>
            <input

              type="password"
              className="form-control"
              placeholder="Your password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-1" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0" style={{ color: "rgba(226, 232, 240, 0.75)" }}>
          Need an account?{" "}
          <Link to="/signup" className="fw-semibold" style={{ color: "#a5b4fc" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInComponent;

