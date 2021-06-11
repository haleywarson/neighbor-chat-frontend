import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function SignUpForm({ signup, displayLogin }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(user);
  };

  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="dark" type="submit">
        Sign Up
      </Button>
      <p id="sign-up-text">
        Already have an account?{" "}
        <span onClick={() => displayLogin()}>Log in.</span>
      </p>
    </Form>
  );
}
