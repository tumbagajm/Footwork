import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateProfilePicture = ({fetchData}) =>{
    const [image, setImage] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);


    const convertToBase64 = (e) => {
        const file = e.target.files[0]; // Get the first file
    
        if (file) {
            const reader = new FileReader();
    
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                setImage(reader.result); // Set the result directly to the image state
            };
    
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        }
    };

    const removeImage = () => {
        setImage(''); // Set the image state to an empty string
    };

    const handleUpdateProfilePicture = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-profile-picture`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ image }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data.message || 'Profile picture updated successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: data.error || 'Profile picture update failed',
                });
            }
            setImage("");
            fetchData(token);
        } catch (error) {
            console.error('Error updating profile:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating the profile.',
            });
        }
    };

    return (
        <>
            <Container className="mb-5">
                <h2>Update Profile Picture</h2>
                <Form onSubmit={e=>{handleUpdateProfilePicture(e)}} className="d-flex flex-column gap-3 align-items-start">
                {image && (
                            <Form.Group className="d-flex flex-column gap-4">
                                <Form.Label>Selected Image:</Form.Label>
                                <img src={image} className="img-fluid rounded-4" width="300" alt="Selected Image"/>
                                <Button variant="danger" type="button" onClick={removeImage}>Remove</Button>
                            </Form.Group>
                )}
                    <Form.Group>
                        <Form.Label>Choose Image:</Form.Label>
                        <Form.Control
                            id="custom-file"
                            type="file"
                            label="Choose Image"
                            accept="image/*"
                            onChange={(e) => convertToBase64(e)}
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">Update Profile picture</Button>
                </Form>
            </Container>
        </>
    );
}

export default UpdateProfilePicture;