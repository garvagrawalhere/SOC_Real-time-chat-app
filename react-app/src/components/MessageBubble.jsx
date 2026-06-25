import React from 'react';
import './MessageBubble.css';

export default function MessageBubble({ message }) {
	const cls = message.me ? 'message me' : 'message them';
	return (
		<div className={cls}>
			<div className="bubble">{message.text}</div>
			<div className="time">{message.time}</div>
		</div>
	);
}
