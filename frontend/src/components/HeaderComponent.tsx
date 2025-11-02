import React from "react";

const HeaderComponent: React.FC = () => {
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
        }
        
        .btn-signup:hover {
          background: #f8f9ff;
          transform: translateY(-2px);
        }
        
        .nav-link-custom {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .nav-link-custom:hover {
          color: white;
        }
      `}</style>

      <header className="header-glass fixed-top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="logo-box">
                <span className="fw-bold fs-5" style={{ color: "#6366f1" }}>
                  F
                </span>
              </div>
              <span className="text-white fw-bold fs-5">FlashMind</span>
            </div>

            <nav className="d-none d-md-flex align-items-center gap-4">
              {/* <a href="#features" className="nav-link-custom">
                Features
              </a>
              <a href="#pricing" className="nav-link-custom">
                Pricing
              </a>
              <a href="#about" className="nav-link-custom">
                About
              </a> */}
            </nav>

            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-signin px-3 py-2">Sign In</button>
              <button className="btn btn-signup px-4 py-2">Sign Up</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;
