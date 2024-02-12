import React, { useState, useEffect } from 'react';
import MakeAdmin from "./MakeAdmin";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch(`${process.env.REACT_APP_API_URL}/users/get-all-users`, {
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
        fetch(`${process.env.REACT_APP_API_URL}/users/get-all-users`, {
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
        <div>
            <ul>
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
        </div>
    );
};

export default UserList;
