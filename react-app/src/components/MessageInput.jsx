import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "./MessageInput.css";

export default function MessageInput({ roomId }) {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || !user) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: t,
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.photoURL,
        timestamp: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        className="message-input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />
      <button className="send-btn" type="submit">
        Send
      </button>
    </form>
  );
}
