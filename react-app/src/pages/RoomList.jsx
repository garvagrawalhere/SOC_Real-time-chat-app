import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RoomList.css";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const { user } = useAuth();
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

  // Create new room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName.trim() || !user) return;

    try {
      await addDoc(collection(db, "rooms"), {
        name: newRoomName,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
      setNewRoomName("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="room-list">
      <h2>Chat Rooms</h2>

      <form onSubmit={handleCreateRoom} className="new-room-form">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <button type="submit">+ New Room</button>
      </form>

      <ul className="rooms-list">
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className="room-item"
          >
            <div className="room-name">{room.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
