import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createUser, type RegisterUserRequest } from "../../services/UserService";

const SignUpComponent: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formValues, setFormValues] = useState<RegisterUserRequest>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await createUser(formValues);
      signIn(response.data);
      navigate("/categories");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("That email is already in use. Try signing in instead.");
        } else if (err.response?.status === 400) {
          setError("Please check your inputs and try again.");
        } else {
          setError("Something went wrong while creating your account.");
        }
      } else {
        setError("Unable to create account. Please try again later.");
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          padding: 2rem 1rem;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          text-align: center;
          margin-bottom: 0.25rem;
        }

        .auth-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .form-control {
          border-radius: 14px;
          padding: 0.85rem 1rem;
          border: 1px solid #e5e7eb;
          font-size: 1rem;
        }

        .form-control:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
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
          box-shadow: 0 12px 20px -10px rgba(99, 102, 241, 0.6);
        }

        .error-alert {
          background: rgba(248, 113, 113, 0.12);
          color: #b91c1c;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
        }
      `}</style>

      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join LingoLink to start mastering new skills.</p>

        {error && <div className="error-alert mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-semibold text-secondary">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-secondary">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="At least 8 characters"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-1" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-secondary">
          Already have an account?{" "}
          <Link to="/signin" className="fw-semibold" style={{ color: "#6366f1" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;

