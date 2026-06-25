import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './app-layout.css';
import personPlaceholder from './person_placeholder.png';

function App() {
	const [contacts] = useState([
		{ id: 1, name: 'Alice', avatar: personPlaceholder, lastMessage: 'Hey' },
		{ id: 2, name: 'Bob', avatar: personPlaceholder, lastMessage: 'Hi' }
	]);

	const [active, setActive] = useState(contacts[0]);
	const [messages, setMessages] = useState([
		{ id: 1, text: 'Hello', me: false, time: '10:00' },
		{ id: 2, text: 'Hi!', me: true, time: '10:01' }
	]);

	const handleSend = (text) => {
		const m = { id: Date.now(), text, me: true, time: new Date().toLocaleTimeString() };
		setMessages(prev => [...prev, m]);
	};

	return (
		<div className="app-root">
			<Sidebar contacts={contacts} onSelect={setActive} />
			<div className="chat-area">
				<Header chat={active} />
				<ChatWindow messages={messages} />
				<MessageInput onSend={handleSend} />
			</div>
		</div>
	);
}

export default App;
