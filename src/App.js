import React, { useState, useEffect } from "react";
// import socketClient from "socket.io-client";
// const SERVER = "http://127.0.0.1:8080";
import "./App.css";

function App() {
  // var socket = socketClient(SERVER);
  // socket.on("connection", () => {
  //   console.log(`I'm connected with the back-end`);
  // });

  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:9000/users")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  };

  const displayUsers = () => {
    return users.map((user) => <li>{user.username}</li>);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <ul>{displayUsers()}</ul>
    </div>
  );
}

export default App;
