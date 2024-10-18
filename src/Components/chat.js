import React, { useEffect, useState, useRef } from 'react';
import createChatChannel from '../channels/chat_channel';
import { Container, Form, Button, ListGroup, Card, Row, Col } from 'react-bootstrap';

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
            <Card>
                <Card.Header>
                    <h2 className="text-center">Chat Room</h2>
                </Card.Header>
                <Card.Body>
                    <ListGroup className="mb-3" id="messages">
                        {messages.map((msg, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <strong>{msg.user_id}:</strong>
                                <span>{msg.message}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col xs={9}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message..."
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Button onClick={handleSendMessage} variant="primary" className="w-100">Send</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Chat;
