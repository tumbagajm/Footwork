import { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import shoe from "../images/shoe1.jpg"

export default function Login() {
  document.title = "Login"
  const { user, setUser } = useContext(UserContext);

  // State hooks to store values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State management to enable and disable register button
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Validation for submit button
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  const authenticate = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.access) {
          // Storing the token of the authenticated user in the browser's local storage.
          localStorage.setItem("token", data.access);
          // setUser(data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login Successful",
            text: "Wellcome to FootWork.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something went wrong!",
            text: data.error,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        // error;
        alert("failed");
      });
  };

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {

        setUser({
          id: data._id,
          email: data.email,
          isAdmin: data.isAdmin,
        });
      });
  };

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Row className="my-3 border rounded-3 shadow">
        <Col lg={6} className="p-0  d-flex justify-content-center align-items-center">
          <div className="p-5 d-flex flex-column justify-content-center gap-3">
              <h1 className="fw-bold">Login</h1>
              {/* <div className="p-5 bg-light rounded-4 border">
                <p>You can login with 3 different user types:</p>
                <div className="pb-3 d-flex flex-column">
                  <p>Email: <span className="text-dark fw-bold">admin@email.com</span></p>
                  <p>Password: <span className="text-dark fw-bold">admin123</span></p>
                </div>
                <div className="d-flex flex-column">
                  <p>Email: <span className="text-dark fw-bold">customer@mail.com</span></p>
                  <p>Password: <span className="text-dark fw-bold">customer123</span></p>
                </div>
              </div> */}
              <Form onSubmit={(e) => authenticate(e)}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required value={email}onChange={(e) => setEmail(e.target.value) }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value) }/>
                </Form.Group>
          			<div className="d-flex flex-column">
                {
                  isActive ? 
                  ( <Button variant="success" type="submit">Login</Button>) 
                  : 
                  ( <Button variant="secondary" type="submit" disabled>Login</Button>)
                }
                </div>
              </Form>
              <p className="text-secondary">
                Do you have an account? 
                <span className="text-primary">
                  <Link to="/register" className="text-decoration-none"> Create an account</Link>
                </span>
              </p>
          </div>
        </Col>
        <Col lg={6} className="p-0 d-none d-lg-block h-50">
          <img src={shoe} alt="login-img" className="img_box rounded-3" />
        </Col>
      </Row>
    </Container>
  );
}
