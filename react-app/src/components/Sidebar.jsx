import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, rtdb } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const navigate = useNavigate();

  // Listen to all rooms
  useEffect(() => {
    const q = collection(db, "rooms");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsList);
    });

    return unsubscribe;
  }, []);

  // Listen to online/offline status
  useEffect(() => {
    const statusRef = ref(rtdb, "status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setOnlineUsers(snapshot.val());
      }
    });

    return unsubscribe;
  }, []);

  const isUserOnline = (uid) => onlineUsers[uid] === "online";

  return (
    <aside className="sidebar">
      {/* App Logo Section */}
      <div className="sidebar-logo-section">
        <img
          src="/chaticon.png"
          alt="Chat App Logo"
          className="app-logo-icon"
        />
      </div>

      {/* User Profile Section */}
      <div className="user-profile">
        <img src={user?.photoURL} alt="profile" width="50" />
        <div className="user-info">
          <h3>{user?.displayName}</h3>
          <button onClick={() => signOut(auth)} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Home Navigation */}
      <div className="home-nav">
        <button onClick={() => navigate("/")} className="home-btn">
          Back to Home
        </button>
      </div>

      {/* Rooms Section */}
      <div className="sidebar-header">Rooms</div>
      <ul className="rooms-list">
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className="room-item"
          >
            <div className="room-info">
              <div className="room-name">{room.name}</div>
              {isUserOnline(room.createdBy) && (
                <span className="online-dot"></span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
