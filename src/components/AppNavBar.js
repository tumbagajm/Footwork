import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const AppNavBar = () => {

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
        <Container>
            <Navbar.Brand as={NavLink} to="/"> ZUITT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}


export default AppNavBar;