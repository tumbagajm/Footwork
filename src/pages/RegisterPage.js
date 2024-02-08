import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const { user } = useContext(UserContext) || {};

    // State hooks to store values from input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // state management to enable and disable register button
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if ((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    },[firstName, lastName, email, mobileNo, confirmPassword, password]);

    function registerUser(e) {
		// Prevents page redirection via form submission
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
			.then(res => res.json())
			.then(data => {

				if (data.message) {
					setFirstName("");
					setLastName("");
					setEmail("");
					setMobileNo("");
					setPassword("");
					setConfirmPassword("");

					Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: data.message,
                    });
				} else{
					Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: data.error,
                    });
				}
			})
	}
    return (
        (user.id !== null) ?
			<Navigate to="/products" />
			:
			<>
				<Container className="my-3 p-5 w-50">
					<h1 className="my-3">Registration</h1>
					<Form onSubmit={e => registerUser(e)}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" placeholder="Enter First Name" required value={firstName} onChange={e => { setFirstName(e.target.value) }} />

							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Last Name" required value={lastName} onChange={e => { setLastName(e.target.value) }} />

							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" required value={email} onChange={e => { setEmail(e.target.value) }} />

							<Form.Label>Mobile Number</Form.Label>
							<Form.Control type="number" placeholder="Enter 11 Digit No." required value={mobileNo} onChange={e => { setMobileNo(e.target.value) }} />

							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Enter Password" required value={password} onChange={e => { setPassword(e.target.value) }} />

							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }} />

						</Form.Group>
						{/*Conditional Rendering -> shorthand if and else*/}
						{
							isActive ?
								<Button variant="primary" type="submit">
									Register
								</Button>
								:
								<Button variant="primary" type="submit" disabled>
									Register
								</Button>
						}
					</Form>
				</Container>
			</>
    )
}

export default RegisterPage