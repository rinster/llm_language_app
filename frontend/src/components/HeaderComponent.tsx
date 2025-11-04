import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, logout } from "../services/AuthService";

const HeaderComponent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token);
    };
    
    // Check on mount
    checkAuth();
    
    // Listen for storage changes (when login/logout happens)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom auth event
    window.addEventListener("authChange", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        .header-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo-box {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-signin {
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
          border: none;
          background: transparent;
        }
        
        .btn-signin:hover {
          color: white;
        }
        
        .btn-signup {
          background: white;
          color: #6366f1;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
        }
        
        .btn-signup:hover {
          background: #f8f9ff;
          transform: translateY(-2px);
        }

        .btn-logout {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .btn-logout:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .nav-link-custom {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .nav-link-custom:hover {
          color: white;
        }

        .nav-link-router {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.3s ease;
          margin-right: 1rem;
        }
        
        .nav-link-router:hover {
          color: white;
        }
      `}</style>

      <header className="header-glass fixed-top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center gap-3">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="logo-box">
                    <span className="fw-bold fs-5" style={{ color: "#6366f1" }}>
                      F
                    </span>
                  </div>
                  <span className="text-white fw-bold fs-5">FlashMind</span>
                </div>
              </Link>
            </div>

            <nav className="d-none d-md-flex align-items-center gap-4">
              <Link to="/categories" className="nav-link-router">
                Categories
              </Link>
              {isAuthenticated && (
                <Link to="/users" className="nav-link-router">
                  Users
                </Link>
              )}
            </nav>

            <div className="d-flex align-items-center gap-2">
              {isAuthenticated ? (
                <button className="btn btn-logout px-4 py-2" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-signin px-3 py-2">Sign In</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-signup px-4 py-2">Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;
