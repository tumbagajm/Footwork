import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import ResetPassword from "../components/profile/ResetPassword";
import UpdateProfile from "../components/profile/UpdateProfile";
import UpdateProfilePicture from "../components/profile/UpdateProfilePicture";
import Loading from '../components/Loading';
import { faL } from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
    document.title = "Profile";
    const { user } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({});
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state


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
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUserDetails(data);
                setIsLoading(false);
            } else {
                console.error('Error fetching user details:', data.error || 'Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    console.log(userDetails.image)
    return (
        (user.token === null) ?
            (<Navigate to="/login" />)
            : 
            (isLoading) ?
            ( <Loading /> )
            :
            (<>

            <Container>
                <Row className="pb-5">
                    <Col>
                        <h1>My Profile</h1>
                    </Col>
                </Row>
                <Row className="p-5 mb-3 d-flex border rounded-4">
                    <Col lg={4} className="mb-4">
                        {
                            userDetails.image === null || userDetails.image === undefined ?
                            <img src={"https://cdn.vectorstock.com/i/1000x1000/52/84/default-placeholder-profile-icon-vector-14065284.webp"} width={200} height={200} className="p-2 border border-1 img-fluid rounded-circle" alt="profile-image" />
                            :
                            <img src={userDetails.image} width={200} height={200} className="p-2  border border-1 rounded-circle" alt="profile-image" />
                        }
                    </Col>
                    <Col lg={8}>
                        <Row className="mb-5 justify-content-between"> 
                            <Col>
                                <p className="text-secondary">First Name</p>
                                <h4>{userDetails.firstName}</h4>
                            </Col>
                            <Col>
                                <p className="text-secondary">Last Name</p>
                                <h4>{userDetails.lastName}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-secondary">Email Address</p>
                                <h4>{userDetails.email}</h4>
                            </Col>
                            <Col>
                                <p className="text-secondary">Mobile Number</p>
                                <h4>{userDetails.mobileNo}</h4>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="p-5 mb-3 d-flex border rounded-4">
                    <Col md={6} className="mb-4">
                        <UpdateProfile fetchData={fetchUserDetails} />
                    </Col>
                    <Col md={6}>
                        <ResetPassword />
                    </Col>
                </Row>
                
                <Row> 
                    <Col lg={6} className='p-5 mb-3 d-flex border rounded-4'>
                        <UpdateProfilePicture fetchData={fetchUserDetails}/>
                    </Col>
                </Row>
            </Container>
            
            <Container className='d-none'>
                <Row>
                    <Col className="p-5 bg-primary text-white">
                        <h1 className="my-5">Profile</h1>
                        <img src = {userDetails.image}/>
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
                <Row className="pt-4 mt-4">
                    <Col>
                        <UpdateProfilePicture fetchData={fetchUserDetails}/>
                    </Col>
                </Row>
            </Container>
            </>)
    )
}