import React from "react";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card p-4 text-white h-100">
      <span className="d-block mb-3" style={{ fontSize: "2.5rem" }}>
        {icon}
      </span>
      <h3 className="fs-5 fw-bold mb-3">{title}</h3>
      <p style={{ fontSize: "1rem", opacity: 0.9, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
};

export default Feature;
