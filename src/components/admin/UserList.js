import React, { useState, useEffect } from 'react';
import MakeAdmin from "./MakeAdmin";
import { Container, Row, Col, Table } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/get-all-users`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUsers(data.data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []); // Empty dependency array to run the effect only once

    const updateUserList = () => {
        // Fetch updated user data after making someone an admin
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/get-all-users`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data.data.users);
            })
            .catch(error => {
                console.error('Error fetching updated users:', error);
            });
    };

    return (
        <>
            <ul className="d-none">
                {users.map(user => (
                    <li key={user._id}>
                        <strong>Name:</strong> {user.firstName} {user.lastName}<br />
                        <strong>Email:</strong> {user.email}<br />
                        <strong>Mobile No:</strong> {user.mobileNo}<br />
                        {user.isAdmin ? (
                            <span>Admin</span>
                        ) : (
                            <MakeAdmin userId={user._id} updateUserList = {updateUserList}/>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>

            <Container className="mt-3">
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Role</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.firstName + " " + user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobileNo}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <p>Admin</p>
                                            ) : (
                                                <MakeAdmin userId={user._id} updateUserList = {updateUserList}/>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserList;
