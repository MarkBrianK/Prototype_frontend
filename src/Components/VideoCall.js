import React, { useState } from 'react';
import { connect, createLocalVideoTrack } from 'twilio-video';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const VideoCall = () => {
    const [roomName, setRoomName] = useState('');
    const [videoTracks, setVideoTracks] = useState([]);
    const userId = localStorage.getItem('user_id');  // Get user ID from local storage

    const joinRoom = async () => {
        try {
            // Make a POST request to the backend with user ID
            const response = await fetch('http://127.0.0.1:3000/video_calls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),  // Send user ID in the request body
            });

            // Parse the JSON response and extract the token
            const { token } = await response.json();
            console.log("Twilio Token:", token);

            // Create a local video track
            const localVideoTrack = await createLocalVideoTrack();

            // Connect to the Twilio video room using the token
            const room = await connect(token, {
                name: roomName,
                tracks: [localVideoTrack],
            });

            // Add the local video track to the state
            setVideoTracks((prevTracks) => [...prevTracks, localVideoTrack]);

            // Handle remote participants joining
            room.on('participantConnected', (participant) => {
                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        setVideoTracks((prevTracks) => [...prevTracks, track]);
                    }
                });

                // Listen for additional tracks from the participant
                participant.on('trackSubscribed', (track) => {
                    setVideoTracks((prevTracks) => [...prevTracks, track]);
                });
            });
        } catch (error) {
            console.error("Error joining room:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Video Call Room</h2>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name..."
                />
            </Form.Group>
            <Button onClick={joinRoom} variant="primary">Join Room</Button>

            <Row className="mt-3">
                {videoTracks.map((track, index) => (
                    <Col key={index} md={4}>
                        <div
                            ref={(ref) => track.attach(ref)}
                            className="video-track"
                            style={{ border: '1px solid #ccc', height: '200px', marginBottom: '10px' }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default VideoCall;
