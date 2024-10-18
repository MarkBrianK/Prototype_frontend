import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./Auth/Signin";
import SignUp from "./Auth/Signup";
import Home from "./Components/Home";
import TaskMeetingCalendar from "./Components/TaskMeetingCalendar";
import DocumentPage from "./Components/Document";
import Navigation from "./Components/Navigation";
import Chat from "./Components/chat";
import VideoCall from "./Components/VideoCall";

function App() {
    const isLoggedIn = !!localStorage.getItem('user_id');

    return (
        <Router>
            <div>
                {isLoggedIn && <Navigation />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/documents" element={isLoggedIn ? <DocumentPage /> : <Navigate to="/signin" />} />
                    <Route path="/taskmanager" element={isLoggedIn ? <TaskMeetingCalendar /> : <Navigate to="/signin" />} />
                    <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/signin" />} />
                    <Route path="/video-call" element={isLoggedIn ? <VideoCall /> : <Navigate to="/signin" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
