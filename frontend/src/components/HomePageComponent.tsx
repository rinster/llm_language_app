import React from "react";
import { Globe, BookOpen, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HomePageComponent: React.FC = () => {
  return (
    <>
      <style>{`
        .splash-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #5b47db 0%, #9333ea 50%, #ec4899 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .splash-container h1 {
            color: red;
        }
        
        .icon-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .icon-bounce-1 {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .icon-bounce-2 {
          animation: bounce 2s ease-in-out infinite 0.2s;
        }
        
        .icon-bounce-3 {
          animation: bounce 2s ease-in-out infinite 0.4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .enter-btn {
          padding: 1rem 3rem;
          font-size: 1.25rem;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          background: white;
          color: #9333ea;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        
        .enter-btn:hover {
          transform: scale(1.05);
          background: #fde047;
          color: #7c3aed;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
        
        .feature-dot {
          width: 8px;
          height: 8px;
          background: #fde047;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
        }
        
        .bg-pattern {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.1;
        }
        
        .bg-circle-1 {
          position: absolute;
          top: 25%;
          left: 25%;
          width: 256px;
          height: 256px;
          background: white;
          border-radius: 50%;
          filter: blur(80px);
        }
        
        .bg-circle-2 {
          position: absolute;
          bottom: 25%;
          right: 25%;
          width: 384px;
          height: 384px;
          background: white;
          border-radius: 50%;
          filter: blur(80px);
        }
        
        .icons-container {
          position: relative;
          height: 128px;
          margin-bottom: 2rem;
        }
        
        .icon-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .icon-top-left {
          position: absolute;
          top: 0;
          left: 25%;
        }
        
        .icon-top-right {
          position: absolute;
          top: 0;
          right: 25%;
        }
        
        .icon-bottom {
          position: absolute;
          bottom: 0;
          left: 33%;
        }
      `}</style>

      <div className="splash-container">
        <div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 text-center">
              {/* Floating Icons */}
              <div className="icons-container">
                <div className="icon-center icon-float">
                  <Globe size={80} color="white" />
                </div>
                <div className="icon-top-left icon-bounce-1">
                  <BookOpen size={48} color="rgba(255,255,255,0.8)" />
                </div>
                <div className="icon-top-right icon-bounce-2">
                  <MessageCircle size={48} color="rgba(255,255,255,0.8)" />
                </div>
                <div className="icon-bottom icon-bounce-3">
                  <Sparkles size={40} color="#fde047" />
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <h1
                  className="display-1 fw-bold text-white mb-3"
                  style={{ textShadow: "0 4px 6px rgba(0,0,0,0.3)" }}
                >
                  Our App Name Here
                </h1>

                <h1>Hi hi</h1>
                <p
                  className="fs-4 text-white mb-5"
                  style={{ opacity: 0.9, fontWeight: 300 }}
                >
                  What's our slogan?
                </p>
              </div>

              {/* Features */}
              <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
                <div className="text-white" style={{ opacity: 0.8 }}>
                  <span className="feature-dot"></span>
                  <small>Interactive Lessons</small>
                </div>
                <div className="text-white" style={{ opacity: 0.8 }}>
                  <span className="feature-dot"></span>
                  <small>Real Conversations</small>
                </div>
                <div className="text-white" style={{ opacity: 0.8 }}>
                  <span className="feature-dot"></span>
                  <small>50+ Languages</small>
                </div>
              </div>

              {/* Enter Button */}
              <Link
                to="/categories"
                className="enter-btn mb-4 d-inline-block text-center"
                role="button"
              >
                Enter
              </Link>

              {/* Subtitle */}
              <p className="text-white small" style={{ opacity: 0.7 }}>
                Start your language journey today
              </p>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="bg-pattern">
          <div className="bg-circle-1"></div>
          <div className="bg-circle-2"></div>
        </div>
      </div>
    </>
  );
};

export default HomePageComponent;
