import React from "react";

const HeaderComponent: React.FC = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            LLM Language App
          </a>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
