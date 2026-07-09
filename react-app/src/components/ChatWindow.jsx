import React, { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";

export default function ChatWindow({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState([]);
  const bottomRef = useRef(null);

  // Listen to messages in real-time
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, [roomId]);

  // Listen to typing indicator
  useEffect(() => {
    if (!roomId) return;

    const typingRef = ref(rtdb, `typing/${roomId}`);
    const unsubscribe = onValue(typingRef, (snapshot) => {
      if (snapshot.exists()) {
        const typingObj = snapshot.val();
        setTypingUsers(Object.values(typingObj));
      } else {
        setTypingUsers([]);
      }
    });

    return unsubscribe;
  }, [roomId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  if (loading)
    return (
      <div className="chat-window">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <main className="chat-window">
      <div className="messages">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(", ")} is typing...
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
    </main>
  );
}
