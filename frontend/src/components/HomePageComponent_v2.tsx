import React from "react";
import BackgroundShapes from "./home/BackgroundShapes";
import Logo from "./home/Logo";
import Stat from "./home/Stats";
import Feature from "./home/Features";

import { Link } from "react-router-dom";

const HomePageComponent_v2: React.FC = () => {
  // const handleDemo = () => {
  //   alert("Showing demo...");
  // };

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes card-flip {
          0%, 100% { transform: rotate(-6deg) translateY(0) rotateY(0deg); }
          25% { transform: rotate(-6deg) translateY(-10px) rotateY(0deg); }
          50% { transform: rotate(-6deg) translateY(-10px) rotateY(180deg); }
          75% { transform: rotate(-6deg) translateY(0) rotateY(180deg); }
        }
        
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(50px, -50px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-card-flip {
          animation: card-flip 4s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 25s infinite;
        }
        
        .animate-drift-delayed {
          animation: drift 20s infinite;
          animation-delay: -5s;
        }
        
        .animate-drift-slow {
          animation: drift 30s infinite;
          animation-delay: -10s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up-delay-1 {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 0.8s ease-out 0.6s both;
        }
        
        .animate-fade-in-up-delay-4 {
          animation: fade-in-up 0.8s ease-out 0.8s both;
        }
        
        .btn-primary-custom {
          background: white;
          color: #6366f1;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .btn-primary-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          background: #f8f9ff;
          color: #6366f1;
        }
        
        .btn-secondary-custom {
          background: transparent;
          color: white;
          border: 2px solid white;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        
        .btn-secondary-custom:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-color: white;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 24px;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.18);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <BackgroundShapes />

      <div
        className="position-relative container text-center"
        style={{ zIndex: 10, paddingTop: "12rem", minHeight: "120vh" }}
      >
        <Logo />

        <h1
          className="text-white fw-bold mb-3 animate-fade-in-up"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-2px",
          }}
        >
          LingoLink
        </h1>
        <p
          className="text-white mb-5 animate-fade-in-up-delay-1"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            opacity: 0.95,
          }}
        >
          Master languages, one card at a time
        </p>

        <Link
          to="/categories"
          className="d-flex flex-wrap gap-3 justify-content-center mb-5 animate-fade-in-up-delay-2"
        >
          <button className="btn btn-primary-custom px-5 py-3">
            Start Learning Free
          </button>
          {/* <button
            onClick={handleDemo}
            className="btn btn-secondary-custom px-5 py-3"
          >
            See How It Works
          </button> */}
        </Link>

        <div className="d-flex flex-wrap gap-5 justify-content-center mb-5 animate-fade-in-up-delay-4">
          <Stat number="10M+" label="Cards Created" />
          <Stat number="500K+" label="Active Learners" />
          <Stat number="98%" label="Retention Rate" />
        </div>

        <div className="row g-4 animate-fade-in-up-delay-3">
          <div className="col-12 col-md-6 col-lg-3">
            <Feature
              icon="🧠"
              title="Smart Spaced Repetition"
              description="Our AI-powered algorithm shows you cards at the perfect time to maximize retention"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <Feature
              icon="✨"
              title="Create Cards Instantly (Coming soon!)"
              description="Generate flashcards from your notes, PDFs, or images in seconds with AI"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <Feature
              icon="📊"
              title="Track Your Progress (Coming soon!)"
              description="Beautiful analytics show your learning journey and keep you motivated"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <Feature
              icon="🌍"
              title="Study Anywhere"
              description="Sync seamlessly across all your devices. Learn on the go or at your desk"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent_v2;
