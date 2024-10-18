import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTasks, FaFileAlt, FaMoneyBillWave, FaChartLine, FaProjectDiagram, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('user_id');

    const handleGetStarted = () => {
        if (!isLoggedIn) {

            navigate('/signin');
        } else {

            alert("User is already logged in");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <Card.Title className="display-4">Welcome to My WorkSpace</Card.Title>
                            <Card.Text className="lead">
                                My WorkSpace is a platform designed to help you manage your tasks and documents efficiently.
                                You can upload documents, track your tasks, and stay organized all in one place.
                            </Card.Text>
                            <div className="mt-4">
                                <h5>Key Features</h5>
                                <Row>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaClipboardList size={50} className="text-primary mb-3" />
                                                <Card.Title>Sites and Stores</Card.Title>
                                                <Card.Text>Manage your online presence and storefronts.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaTasks size={50} className="text-primary mb-3" />
                                                <Card.Title>Tasks</Card.Title>
                                                <Card.Text>Stay on top of your to-do list and deadlines.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaProjectDiagram size={50} className="text-primary mb-3" />
                                                <Card.Title>Projects</Card.Title>
                                                <Card.Text>Manage and collaborate on projects efficiently.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaMoneyBillWave size={50} className="text-primary mb-3" />
                                                <Card.Title>Online Payments</Card.Title>
                                                <Card.Text>Seamless integration for managing payments.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaChartLine size={50} className="text-primary mb-3" />
                                                <Card.Title>Sales Automation</Card.Title>
                                                <Card.Text>Automate your sales process for better efficiency.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={4} className="mb-3">
                                        <Card className="text-center">
                                            <Card.Body>
                                                <FaFileAlt size={50} className="text-primary mb-3" />
                                                <Card.Title>Estimates & Invoices</Card.Title>
                                                <Card.Text>Create and manage your invoices easily.</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <Button variant="primary" className="mt-4" onClick={handleGetStarted}>
                                Get Started
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
