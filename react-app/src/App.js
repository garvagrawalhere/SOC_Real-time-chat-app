import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";
import RoomList from './pages/RoomList';
import ChatRoom from './pages/ChatRoom';

function App() {
	return (
		<div className="App">
			<Router>
				<ProtectedRoute>
					<Routes>
						<Route path="/" element={<RoomList />} />
						<Route path="/room/:roomId" element={<ChatRoom />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</ProtectedRoute>
			</Router>
		</div>
	);
}
		
export default App;
