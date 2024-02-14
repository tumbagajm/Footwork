import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const CheckoutButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [cart, setCart] = useState([]);


    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFormSubmit = (e) => {
        // Handle form submission logic here
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
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

    // Get cart
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/get-cart`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.ok) {
                    const cartData = await response.json();
                    setCart(cartData.data);
                } else {
                    console.error('Error fetching cart data');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [cart]);

    return (
        <div>
            <button
                type="button"
                className="p-3 btn btn-dark w-100"
                onClick={handleButtonClick}
            >
                Checkout
            </button>

            <Modal show={showModal} onHide={handleModalClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Checkout Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <h2 className="mb-2">Payment method</h2>
                        </Row>
                        <Row>
                            <Col lg={7}>
                                {/* Payment Method Information */}
                                <div className="p-4 mb-3 border rounded-4">
                                    <h4>Saved Card</h4>
                                    <div className="card_wrapper d-flex flex-column gap-2">
                                        <div className="card_box p-3 d-flex border rounded">
                                            <img className="me-3 p-1 border rounded" width="48" height="48" src="https://img.icons8.com/color/48/paypal.png" alt="paypal"/>
                                            <div>
                                                <h6>Paypal ending in 1234</h6>
                                                <p className="text-muted">Expiry 06/2024</p>
                                            </div>
                                            <input className="form-check-input ms-auto fs-4" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        </div>
                                        <div className="card_box p-3 d-flex border rounded">
                                            <img className="me-3 p-1 border rounded" width="50" height="50" src="https://img.icons8.com/ios/50/visa.png" alt="visa"/>
                                            <div>
                                                <h6>Visa ending in 1234</h6>
                                                <p className="text-muted">Expiry 06/2024</p>
                                            </div>
                                            <input className="form-check-input ms-auto fs-4" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        </div>
                                        <div className="card_box p-3 d-flex border rounded">
                                            <img className="me-3 p-1 border rounded" width="48" height="48" src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard"/>
                                            <div>
                                                <h6>Mastercard ending in 1234</h6>
                                                <p className="text-muted">Expiry 06/2024</p>
                                            </div>
                                            <input className="form-check-input ms-auto fs-4" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        </div>
                                        <div className="card_box p-3 border rounded">
                                            <div className="d-flex align-items-center justify-content-center gap-5">
                                                <button type="button" className="btn text-primary d-flex gap-3 align-items-center">
                                                    <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                                                    <p className="m-0">Add New Payment</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cancellation Policy */}
                                <div className="p-4 border rounded-4">
                                    <div className="d-flex flex-column">
                                        <h4 className="my-3">Cancellation Policy</h4>
                                        <p className="fw-medium">Free cancellation before 2 days.</p>
                                        <p className="text-muted">After that, the order is non-refundable <span className="text-decoration-underline fw-medium text-dark">Learn more</span></p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="d-flex flex-column gap-3 p-3 p-md-5 bg-light border rounded-4 sticky-top">
                                    <h2>Order Summary</h2>
                                    <div className="p-1 border-bottom"> 
                                        <div className="d-flex justify-content-between">
                                            <p>Subtotal</p>
                                            <p className="fw-bold">&#8369;{cart.totalPrice}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Shipping estimate</p>
                                            <p className="fw-bold">&#8369;0.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Tax estimate</p>
                                            <p className="fw-bold">&#8369;0.00</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <h2 className="fw-bold">Total</h2>
                                            <h2 className="fw-bold">&#8369;{cart.totalPrice}</h2>
                                        </div>
                                    </div>
                                    {/* <Checkout /> */}
                                    <Form onSubmit={handleFormSubmit}>
                                        <Button className="p-3 btn btn-dark w-100" variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>

                                    <Link to="/products" type="button" className="p-3 btn btn-outline-dark">Continue Shopping</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CheckoutButton;
