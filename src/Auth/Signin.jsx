import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();



        try {


            const response = await axios.post(
                'http://127.0.0.1:3000/users/sign_in',
                { email, password },
                { withCredentials: true }
            );

            if (response && response.data && response.data.success)
                console.log("sign in successful")


        } catch (error) {
            console.error(error);

        } finally {

        }
    };


    return (
        <div >



            <div className="p-4 rounded">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="example@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label >Password</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div>
                            <input
                                className="m-1"
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label className="mt-1 text-secondary">Show Password</label>
                        </div>
                    </Form.Group>


                    : <Button
                        type="submit"


                    >
                        Sign In
                    </Button>


                </Form>
            </div>
        </div>

    );
};

export default SignInForm;
