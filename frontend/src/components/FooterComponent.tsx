import React from "react";

const FooterComponent: React.FC = () => {
  return (
    <>
      <style>
        {`
          .footer {
            position: absolute;
            left:0;
            bottom: -150px;
            width: 100%;
            height: 50px;
            text-align: center;
            color: white;
          }
        `}
      </style>
      <footer className="footer">
        <span>Made by Team 11 © All Rights Reserved</span>
      </footer>
    </>
  );
};

export default FooterComponent;
