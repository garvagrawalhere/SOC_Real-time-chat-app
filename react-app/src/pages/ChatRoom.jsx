import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import "../app-layout.css";

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <Sidebar />
      <div className="chat-area">
        <Header roomId={roomId} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "12px 20px",
            borderBottom: "1px solid #e1e8ed",
            gap: "10px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "8px 16px",
              background: "#f7f7f7",
              border: "1px solid #e1e8ed",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              color: "#1a1a1a",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#e1e8ed";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f7f7f7";
            }}
          >
            ← Back to Rooms
          </button>
        </div>
        <ChatWindow roomId={roomId} />
        <MessageInput roomId={roomId} />
      </div>
    </div>
  );
}
