import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './app-layout.css';
import personPlaceholder from './person_placeholder.png';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [contacts] = useState([
		{ id: 1, name: 'Alice', avatar: personPlaceholder, lastMessage: 'Hey' },
		{ id: 2, name: 'Bob', avatar: personPlaceholder, lastMessage: 'Hi' }
	]);

	const [active, setActive] = useState(contacts[0]);
	const roomId = 'room1'; // Hardcode for now, will be dynamic later

	return (
		<ProtectedRoute>
			<div className="app-root">
				<Sidebar contacts={contacts} onSelect={setActive} />
				<div className="chat-area">
					<Header chat={active} />
					<ChatWindow roomId={roomId} />
					<MessageInput roomId={roomId} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
		
export default App;
