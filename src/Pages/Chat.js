import React, { useState } from "react";
import { io } from "socket.io-client";
// const socket = io("http://localhost:8000/");

import Message from "../Components/Message";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    //   if (message) {
    //     //   socket.emit("chat message", message);
    //     setMessages([...messages, message]);
    //     //   displayNewMessage
    //   }
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
          <Message key={message._id} message={message} user={user} />
        ))}
      </ul>
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          id="input"
          autocomplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
