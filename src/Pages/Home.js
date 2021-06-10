import React from "react";
import "../App.css";

import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";

export default function Home({ user, signup, login }) {
  return (
    <div className="home">
      {user.username ? (
        <h2>welcome, {user.username}</h2>
      ) : (
        <>
          <SignupForm signup={signup} />
          <LoginForm login={login} />
        </>
      )}
    </div>
  );
}
