import React, { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, rtdb } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { ref, set, remove } from "firebase/database";
import "./MessageInput.css";

export default function MessageInput({ roomId }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const typingTimeoutRef = useRef(null);

  const handleTyping = (e) => {
    setText(e.target.value);

    // Set typing indicator
    if (user && roomId) {
      const typingRef = ref(rtdb, `typing/${roomId}/${user.uid}`);
      set(typingRef, user.displayName);

      // Clear typing after 2 seconds of inactivity
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        remove(typingRef);
      }, 2000);
    }
  };

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

      // Clear typing indicator after sending
      const typingRef = ref(rtdb, `typing/${roomId}/${user.uid}`);
      remove(typingRef);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        className="message-input-field"
        value={text}
        onChange={handleTyping}
        placeholder="Type a message"
      />
      <button className="send-btn" type="submit">
        Send
      </button>
    </form>
  );
}
