import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Swal from "sweetalert2";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem("token"); 
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password updated successfully.',
                    text: response.message || 'Password updated successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Password reset failed!',
                    text: response.error || 'Password update failed',
                });
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <Container>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {message && <div className="alert alert-danger">{message}</div>}
                <button type="submit" className="btn btn-dark">
                    Reset Password
                </button>
            </form>
        </Container>
    );
};

export default ResetPassword;
