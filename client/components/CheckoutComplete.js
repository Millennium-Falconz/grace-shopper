import React from "react";
import { Link } from "react-router-dom";

export const CheckoutComplete = (props) => {
  return (
    <div>
      <h1>Success! You have captured your Pokemon!</h1>
      <Link to={`/home`}>
        <button>Continue catching them all!</button>
      </Link>
    </div>
  );
};

export default CheckoutComplete;
