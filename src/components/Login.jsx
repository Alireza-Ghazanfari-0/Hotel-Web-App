import React, { useState } from "react";

import { useAuthentication } from "./context/AuthenticationProvider";

function Login() {
  const { email, setEmail, password, setPassword, checkLogin } =
    useAuthentication();
  function handleSubmit() {
    checkLogin();
  }
  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group form-group-login ">
        <label htmlFor="email" className="">
          Email Address:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="alireza@yahoo.com"
        />
      </div>
      <div className="form-group form-group-login">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          className="input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="123456"
        />
      </div>
      <button className="btn btn-login"> login</button>
    </form>
  );
}

export default Login;
