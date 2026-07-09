import React from 'react';
import './Sidebar.css';
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";



export default function Sidebar({ contacts, onSelect }) {
  const { user } = useAuth();
  return (
    

    <aside className="sidebar">
      <div>
     <img src={user.photoURL} alt="profile" width="50" />
     <h3>{user.displayName}</h3>
    </div>
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
      <button onClick={() => signOut(auth)}> Logout </button>

    </aside>
  );
}