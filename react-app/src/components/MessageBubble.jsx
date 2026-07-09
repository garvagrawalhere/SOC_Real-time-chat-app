import React from "react";
import { useAuth } from "../context/AuthContext";
import "./MessageBubble.css";

export default function MessageBubble({ message }) {
  const { user } = useAuth();
  const isMe = message.senderId === user?.uid;
  const cls = isMe ? "message me" : "message them";

  const timeString =
    message.timestamp?.toDate?.().toLocaleTimeString() || "pending";

  return (
    <div className={cls}>
      <div className="bubble">{message.text}</div>
      <div className="time">{timeString}</div>
    </div>
  );
}
