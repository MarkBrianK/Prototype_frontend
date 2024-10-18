// src/Components/Chat.js
import React, { useEffect, useState, useRef } from 'react';
import createChatChannel from '../channels/chat_channel';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const userId = localStorage.getItem('user_id');
    const chatChannelRef = useRef(null);

    useEffect(() => {
        chatChannelRef.current = createChatChannel(userId, (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            if (chatChannelRef.current) {
                chatChannelRef.current.unsubscribe(); // Unsubscribe on cleanup
            }
        };
    }, [userId]);

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;

        if (chatChannelRef.current) {
            chatChannelRef.current.speak(messageInput); // Send message using the current reference
        }
        setMessageInput(''); // Clear input field
    };

    return (
        <Container className="mt-4">
            <h2>Chat Room</h2>
            <ListGroup className="mb-3" id="messages">
                {messages.map((msg, index) => (
                    <ListGroup.Item key={index}>
                        <strong>{msg.user_id}:</strong> {msg.message}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                />
            </Form.Group>
            <Button onClick={handleSendMessage} variant="primary">Send</Button>
        </Container>
    );
};

export default Chat;
