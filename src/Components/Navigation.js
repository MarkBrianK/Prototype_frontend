import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('user_id');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id'); 
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
      }}>
        <Navbar.Brand as={Link} to="/">My WorkSpace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
            <Nav.Link as={Link} to="/taskmanager">Task Manager</Nav.Link>
            <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
            <Nav.Link as={Link} to="/video-call">Video Call</Nav.Link>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            ) : (
              <Button variant="link" className="nav-link" style={{backgroundColor: "red", color:"white"}} onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
