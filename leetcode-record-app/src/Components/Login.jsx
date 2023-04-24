import React, { useContext, useState } from "react";
import { Context } from "../Models/Context";

function Login() {
  const [username, setUsername] = useState("");
  const { onLogin } = useContext(Context);
  return (
    <div className="login-panel">
      <h1 className="title">Leetcode Practing</h1>
      <div className="login-form">
        <h2>Login with username</h2>
        <input
          value={username}
          placeholder="Username"
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="login-button"
          type="button"
          onClick={() => {
            onLogin(username);
            setUsername("");
          }}
        >
          Log In
        </button>
      </div>
      {/* <p>&#128054; DOG is not an allowed username &#128054; </p> */}
    </div>
  );
}

export default Login;
