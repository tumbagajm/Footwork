import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ContactPage() {
  document.title = "Contact";
  
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mb-4">
          <h1 className="mb-4">Contact Us</h1>
          <p>
            Have questions or feedback? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <p>
            <strong className="text-uppercase">Address:</strong> 123 Shoe Street, Cityville, State, Zip
          </p>
          <p>
            <strong className="text-uppercase">Email:</strong> info@footwork.com
          </p>
          <p>
            <strong className="text-uppercase">Phone:</strong> 123-456-7890
          </p>
        </Col>
        <Col md={6}>
          <Form className="d-flex flex-column gap-3"> 
            <Form.Group controlId="formName">
              <Form.Label className="text-uppercase">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-uppercase">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="text-uppercase">Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
            </Form.Group>

            <Button variant="dark" type="submit" className="text-uppercase">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;
