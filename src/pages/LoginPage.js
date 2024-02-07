import { Form, Button, Container } from "react-bootstrap";



const LoginPage = () => {
  
  return (
    <Container className="my-3 p-3 p-md-5 w-50">
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>

      </Form>
    </Container>
  )
}

export default LoginPage;