import React from 'react';
import {Link} from "react-router-dom";

function NoFound() {
  return (
      <div className="p-5 text-center">
        <h1>404</h1>
        <h3>Opps! This page does not exist</h3>
        <Link to="/">
          Back to home page
        </Link>
      </div>
  );
}

export default NoFound;
