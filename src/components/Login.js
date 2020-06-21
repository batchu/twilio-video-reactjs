import React from "react";

function Login() {
  return (
    <div>
      <p>Please Login</p>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Join my room" />
      </form>
    </div>
  );
}

export default Login;
