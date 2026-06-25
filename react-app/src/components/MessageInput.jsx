import React, { useState } from 'react';
import './MessageInput.css';

export default function MessageInput({ onSend }) {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const t = text.trim();
		if (!t) return;
		onSend(t);
		setText('');
	};

	return (
		<form className="message-input" onSubmit={handleSubmit}>
			<input
				className="message-input-field"
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder="Type a message"
			/>
			<button className="send-btn" type="submit">Send</button>
		</form>
	);
}
