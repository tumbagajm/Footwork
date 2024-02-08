import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

const AppNavBar = () => {

    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand as={NavLink} to="/"> ZUITT Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/"><FontAwesomeIcon icon="fa-solid fa-house" /></Nav.Link>
                        
                        {/* Conditional Rendering if user is logged in */}
                        {user.id !== null ? (
                            user.isAdmin ? (
                                <>
                                    <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/products">
                                            Admin Dashboard
                                        </NavDropdown.Item>
                                        <Nav.Link as={NavLink} to="/addProduct">
                                            Add Product
                                        </Nav.Link>

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
                                    <Nav.Link as={NavLink} to="/cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></Nav.Link>
                                    <NavDropdown title={<FontAwesomeIcon icon="fa-solid fa-user" />} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/Profile">
                                            Profile
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item as={Link} to="/logout" className = "text-danger">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
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