import React from "react";
import { Globe } from "lucide-react";

const HeaderComponent: React.FC = () => {
  return (
    <>
      <style>{`
        .navbar-custom {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .navbar-brand-custom {
          color: white !important;
          font-weight: 600;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .navbar-brand-custom:hover {
          color: #fde047 !important;
          transform: scale(1.05);
        }
      `}</style>

      <header>
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
          <div className="container-fluid px-4">
            <a className="navbar-brand-custom" href="/">
              <Globe size={32} />
              App Name Here
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
