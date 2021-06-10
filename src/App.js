import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./App.css";

import Home from "./Pages/Home";
// import Profile from "./Pages/Profile";

const baseUrl = "http://localhost:9000/";

function App() {
  // STATE
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});
  // const [error, setError] = useState("");

  fetch(baseUrl + "users")
    .then((response) => response.json())
    .then((users) => setUsers(users));

  const displayUsers = () => {
    return users.map((user) => <li>{user.username}</li>);
  };

  // // SIGNUP AND LOGIN/OUT
  // const signup = (user) => {
  //   fetch(baseUrl + "users", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: user.username,
  //         // password: user.password,
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((user) => setUser({ user }));
  // };

  // const login = (username, password) => {
  //   fetch(baseUrl + "login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username,
  //         // password,
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.token) {
  //         localStorage.setItem("token", result.token);
  //         setUser(result.user);
  //       } else {
  //         setError(result.error);
  //       }
  //     });
  // };

  // const validateUser = () => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(baseUrl + "profile", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.id) {
  //           setUser(result);
  //         }
  //       });
  //   }
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser({});
  // };

  // useEffect(() => {
  //   validateUser();
  // }, []);

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
              <Nav.Link
                id="nav-link"
                href="/"
                // onClick={logout}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main>
          <Switch>
            {/* <Route path="/profile">{user.username ? <Profile /> : null}</Route> */}
            <Route path="/">
              <h2>Users</h2>
              {displayUsers()}
              <Home
              // user={user}
              // signup={signup}
              // login={login}
              />
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
