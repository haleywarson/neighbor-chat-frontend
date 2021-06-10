import React from "react";
import "../App.css";

import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";

export default function Home() {
  return (
    <div className="home">
      <h2>welcome, NAME</h2>

      <SignupForm
      // signup={signup}
      />
      <LoginForm
      // login={login}
      />
    </div>
  );
}
