import React from 'react';
import MessageBubble from './MessageBubble';
import './ChatWindow.css';

export default function ChatWindow({ messages }) {
  return (
    <main className="chat-window">
      <div className="messages">
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
      </div>
    </main>
  );
}