import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from "sweetalert2";

const CheckoutButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormSubmit = (e) => {
        // Handle form submission logic here
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: data.message
                    });
                } else {
                    Swal.fire({
                        title: 'Oh, no!',
                        icon: 'error',
                        text: data.error
                    });
                }
                setShowModal(false);
            });
    };

    return (
        <div>
            <button
                type="button"
                className="p-3 btn btn-dark"
                onClick={handleButtonClick}
            >
                Checkout
            </button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        {/* Add your checkout form fields here */}
                        <Form.Group controlId="formCardInfo">
                            <Form.Label>Card Information</Form.Label>
                            <Form.Control type="text" placeholder="Card Number" />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Shipping Address" />
                        </Form.Group>
                        {/* Add more form fields as needed */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CheckoutButton;
