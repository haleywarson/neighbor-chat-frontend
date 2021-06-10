import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";

const baseUrl = "";

function App() {
  // STATE
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  // SIGNUP AND LOGIN/OUT
  const signUp = (user) => {
    fetch(baseUrl + "users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((user) => setUser({ user }));
  };

  const login = (username, password) => {
    fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setUser(result.user);
        } else {
          setError(result.error);
        }
      });
  };

  const validateUser = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(baseUrl + "profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setUser(result);
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar expand="lg" sticky="top" id="nav-bar">
          <Navbar.Brand id="logo" href="/">
            Neighbor Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link id="nav-link" href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link id="nav-link" href="/" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main>
          <Switch>
            <Route path="/profile">{user.username ? <Profile /> : null}</Route>
            <Route path="/">
              <div className="main-container">
                {user.username ? (
                  <>
                    <Home />
                  </>
                ) : (
                  <>
                    <Signup />
                    <Login login={login} error={error} />
                  </>
                )}
              </div>
            </Route>
          </Switch>
        </main>
        <footer className="footer">
          <p>Copyright 2021 Neighbor Chat.</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;

// const displayUsers = () => {
//   return users.map((user) => <li>{user.username}</li>);
// };
