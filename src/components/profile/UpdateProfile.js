import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateProfile = ({fetchData}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ firstName, lastName, mobileNo }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data.message || 'Profile updated successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: data.error || 'Profile update failed',
                });
            }
            setFirstName("");
            setLastName("");
            setMobileNo("");
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
            <Container className="mt-5">
                <h2>Update Profile</h2>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleUpdateProfile}>
                    Update Profile
                </button>
            </Container>
        </>
    );
};

export default UpdateProfile;
