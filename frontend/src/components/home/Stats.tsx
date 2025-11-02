import React from "react";

interface StatProps {
  number: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ number, label }) => {
  return (
    <div className="text-center text-white">
      <span className="d-block fw-bold mb-2" style={{ fontSize: "2.5rem" }}>
        {number}
      </span>
      <span style={{ fontSize: "1rem", opacity: 0.9 }}>{label}</span>
    </div>
  );
};

export default Stat;
