import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Message from "../Components/Message";
const socket = io("http://127.0.0.1:8080/");

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", (message) => {
      // This event is fired by the Socket instance upon connection and reconnection.
      console.log(socket.id);
      console.log("socket connected?", socket.connected);
      console.log("message", message);
      // setMessages([...messages, message]);

      // you shouldn’t register event handlers in the connect handler itself, as a new handler will be registered every time the Socket reconnects:
    });
  }, []);

  //   socket.on("disconnect", () => {
  //     console.log(socket.id);
  //     console.log("disconnected if false:", socket.connected);
  //   });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    setMessages([...messages, message]);
    socket.emit("chat message", message);
  };

  // const scrollMessageList = () => {
  //   //  window.scrollTo(0, document.body.scrollHeight);
  // };

  // const displayMessages = (msg) => {
  //   socket.on("chat message", function (msg)
  //   const item = <li>input.value</li>
  //   messages.appendChild(item);
  //   scrollMessageList()
  // //   map through messages and display each one
  // }
  console.log("chat");

  return (
    <div className="chat">
      <ul id="messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} user={user} />
        ))}
      </ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          id="input"
          autocomplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
