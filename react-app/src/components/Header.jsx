import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./Header.css";

export default function Header({ roomId }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const docRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setRoom(docSnap.data());
      }
    });

    return unsubscribe;
  }, [roomId]);

  return (
    <header className="chat-header">
      <div className="chat-title">{room?.name || "Loading..."}</div>
    </header>
  );
}
