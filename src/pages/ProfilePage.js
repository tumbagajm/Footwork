import { useContext, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import ResetPassword from "../components/profile/ResetPassword";
import UpdateProfile from "../components/profile/UpdateProfile";


export default function Profile() {

    const { user } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
        // You can fetch the user's details or token here if needed
        // For simplicity, let's assume you have the user's details available, including the token
        // Replace this with actual logic to fetch user details or token
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        // Fetch user details
        fetchUserDetails(storedToken);
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUserDetails(data);
            } else {
                console.error('Error fetching user details:', data.error || 'Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };
    return (
        (user.token === null) ?
            <Navigate to="/login" />
            : <>
                <Row>
                    <Col className="p-5 bg-primary text-white">
                        <h1 className="my-5">Profile</h1>
                        <h2 className="mt-3">{userDetails.firstName} {userDetails.lastName}</h2>
                        <hr />
                        <h4>Contacts</h4>
                        <ul>
                            <li>Email: {userDetails.email || 'N/A'}</li>
                            <li>Mobile No: {userDetails.mobileNo || 'N/A'}</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="pt-4 mt-4">
                    <Col>
                        <ResetPassword />
                    </Col>
                </Row>
                <Row className="pt-4 mt-4">
                    <Col>
                        <UpdateProfile fetchData={fetchUserDetails}/>
                    </Col>
                </Row>
            </>
    )
}