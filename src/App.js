import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
// import Profile from "./Pages/Profile";

import "./App.css";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const [loginToggle, setLoginToggle] = useState(false);

  // SIGNUP AND LOGIN/OUT
  const signup = (user) => {
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

  // EVENT HANDLERS
  const displayLogin = () => {
    setLoginToggle(true);
  };

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
            <Route path="/chat">
              <Chat user={user} />
            </Route>
            <Route path="/">
              <Home
                user={user}
                signup={signup}
                loginToggle={loginToggle}
                login={login}
                error={error}
                displayLogin={displayLogin}
              />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
