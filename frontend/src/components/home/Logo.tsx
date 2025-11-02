import React from "react";

const Logo: React.FC = () => {
  return (
    <div
      className="mx-auto mb-4 animate-float"
      style={{
        width: "140px",
        height: "140px",
        background: "rgba(255, 255, 255, 0.15)",
        borderRadius: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <div
        className="position-relative"
        style={{ width: "80px", height: "100px" }}
      >
        <div
          className="position-absolute bg-white rounded shadow-lg d-flex align-items-center justify-content-center fw-bold animate-card-flip"
          style={{
            width: "70px",
            height: "90px",
            fontSize: "2rem",
            color: "#6366f1",
            transform: "rotate(-6deg)",
          }}
        >
          A
        </div>
        <div
          className="position-absolute bg-white rounded shadow-lg d-flex align-items-center justify-content-center fw-bold"
          style={{
            width: "70px",
            height: "90px",
            fontSize: "2rem",
            color: "#6366f1",
            transform: "translateY(5px)",
            opacity: 0.8,
          }}
        >
          B
        </div>
        <div
          className="position-absolute bg-white rounded shadow-lg d-flex align-items-center justify-content-center fw-bold"
          style={{
            width: "70px",
            height: "90px",
            fontSize: "2rem",
            color: "#6366f1",
            transform: "rotate(6deg) translateY(10px)",
            opacity: 0.6,
          }}
        >
          C
        </div>
      </div>
    </div>
  );
};

export default Logo;
