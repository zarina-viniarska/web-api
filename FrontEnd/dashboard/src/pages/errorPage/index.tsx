import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ErrorPage: React.FC = () => {
  return (
    <div>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container more-link">
        <Link to="/">
          <a target="_blank" className="more-link">
            Back to Login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
