import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AppNavBar = () => {

    const { user } = useContext(UserContext);

    return (
        <Navbar id="navbar" expand="lg" className="bg-body-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fs-1 fw-bold d-lg-none">
                    Foot<span>Work.</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex justify-content-between align-items-center w-100">
                        <Navbar.Brand as={NavLink} to="/" className="fs-1 fw-bold d-none d-lg-block">
                            Foot<span>Work.</span>
                        </Navbar.Brand>
                        <div className="d-flex gap-3 fs-5">
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
                            {/* <Nav.Link as={NavLink} to="/"><FontAwesomeIcon icon="fa-solid fa-house" /></Nav.Link> */}
                        </div>
                        
                        {/* Conditional Rendering if user is logged in */}
                        {user.id !== null ? (
                            user.isAdmin ? (
                                <>
                                    <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/products">
                                            Admin Dashboard
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item as={Link} to="/logout" className = "text-danger">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) 
                            : 
                            (
                                <>
                                    <div className="d-flex gap-3">
                                        <Nav.Link as={NavLink} to="/cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></Nav.Link>
                                        <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />} id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/profile">
                                                Profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/order">
                                                Orders
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />

                                            <NavDropdown.Item as={Link} to="/logout" className = "text-danger">
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </>
                            )
                        ) 
                        : 
                        (
                            <>  
                                <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/register">
                                        Register
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={NavLink} to="/login">
                                        Login
                                    </NavDropdown.Item>
                                </NavDropdown>
                                
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default AppNavBar;