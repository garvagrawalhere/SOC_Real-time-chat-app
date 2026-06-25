import React from 'react';
import './Header.css';

export default function Header({ chat }) {
  return (
    <header className="chat-header">
      <div className="chat-title">{chat?.name || 'Select a chat'}</div>
    </header>
  );
}
