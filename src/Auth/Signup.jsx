import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate(); // Initialize the navigate function

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePasswordConfirmChange = (e) => setPasswordConfirm(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                name,
                username,
                email,
                password,
                password_confirm: passwordConfirm,
                mobile_number: mobileNumber,
            };

            const response = await axios.post(
                "http://127.0.0.1:3000/users",
                { user: userData },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                console.log("Sign up successful");
                navigate("/signin"); // Redirect to the sign-in page
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="John Doe Smith"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="JohnDoe"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder="example@gmail.com"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="mobile_number">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                        placeholder="0712345678"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" // Change to type="password" for better security
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="passwordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password" // Change to type="password" for better security
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        placeholder="Confirm Password"
                        required
                    />
                </Form.Group>
                <button variant="primary" type="submit">
                    Sign Up
                </button>

            </Form>
        </div>
    );
}

export default SignUp;
