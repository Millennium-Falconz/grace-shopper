import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthFormSignUp = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="authFormSignup">
      <form onSubmit={handleSubmit} name={name}>
        <span className="sft">sign up</span>
        <div className="input-container">
          <label htmlFor="firstname"></label>
          <input name="firstname" type="text" placeholder="First Name" />
        </div>
        <div className="input-container">
          <label htmlFor="lastname"></label>
          <input name="lastname" type="text" placeholder="Last Name" />
        </div>
        <div className="input-container">
          <label htmlFor="username"></label>
          <input name="username" type="text" placeholder="UserName" />
        </div>
        <div className="input-container">
          <label htmlFor="password"></label>
          <input name="password" type="password" placeholder="Password" />
        </div>
        <div>
          <button className="btn" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(AuthFormSignUp);
