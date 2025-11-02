import React from "react";

const BackgroundShapes: React.FC = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="position-absolute bg-shape animate-drift"
        style={{
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          top: "-200px",
          left: "-200px",
        }}
      />
      <div
        className="position-absolute bg-shape animate-drift-delayed"
        style={{
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          bottom: "-150px",
          right: "-150px",
        }}
      />
      <div
        className="position-absolute bg-shape animate-drift-slow"
        style={{
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          top: "40%",
          right: "5%",
        }}
      />
    </div>
  );
};

export default BackgroundShapes;
