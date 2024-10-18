import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('user_id');

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/signin');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Welcome to MyApp</Card.Title>
                            <Card.Text>
                                MyApp is a platform designed to help you manage your tasks and documents efficiently.
                                You can upload documents, track your tasks, and stay organized all in one place.
                            </Card.Text>
                            <div>
                                {!isLoggedIn ? (
                                    <>
                                        <Link to="/signin">
                                            <Button variant="primary" className="m-2">Sign In</Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button variant="secondary" className="m-2">Sign Up</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/taskmanager">
                                            <Button variant="info" className="m-2">Go to Task Manager</Button>
                                        </Link>
                                        <Link to="/documents">
                                            <Button variant="success" className="m-2">Go to Documents</Button>
                                        </Link>
                                        <Button variant="danger" onClick={handleLogout} className="m-2">
                                            Logout
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
