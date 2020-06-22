import React from "react";

function Login() {

    function handleSubmit(event){
        alert("submitted"+event)
        event.preventDefault();
    }
  return (
    <div>
      <p>Please Login</p>
      <form  onSubmit={handleSubmit}>
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
