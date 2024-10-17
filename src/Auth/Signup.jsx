import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

function SignUp() {

    const [name, setName] = useState([])
    const [username, setUsername] = useState([])
    const [mobileNumber, setMobileNumber] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [passwordConfirm, setPasswordConfirm] = useState([])


    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    };

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };
    const handleMobileNumberChange = (e) => {
        const newMobileNumber = e.target.value;
        setMobileNumber(newMobileNumber);
    };
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };
    const handlePasswordConfirmChange = (e) => {
        const newPasswordConfirm = e.target.value;
        setPasswordConfirm(newPasswordConfirm);

    };
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
                console.log("sign up succcessful")

            }
        } catch (error) {
            console.error("error:", error)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={handleNameChange}

                        placeholder="John Doe Smith"
                        required
                    />

                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label >Username</Form.Label>
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

                        value={password}
                        onChange={handlePasswordChange}

                        placeholder="Enter your password"
                        required
                    />


                </Form.Group>
                <Form.Group controlId="passwordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control

                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}

                        placeholder="Confirm Password"
                        required
                    />

                    </Form.Group>
                <button
                    variant="primary"
                    type="submit"

                >
                    Sign Up

                </button>
            </Form>

        </div>
    )
}
export default SignUp
