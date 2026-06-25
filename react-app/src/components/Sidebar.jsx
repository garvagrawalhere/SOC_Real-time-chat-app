import React from 'react';
import './Sidebar.css';

export default function Sidebar({ contacts, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Chats</div>
      <ul className="contacts-list">
        {contacts.map(c => (
          <li key={c.id} onClick={() => onSelect(c)} className="contact-item">
            <img src={c.avatar} alt="" className="avatar"/>
            
            <div className="contact-meta">
              <div className="name">{c.name}</div>
              <div className="last">{c.lastMessage}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}