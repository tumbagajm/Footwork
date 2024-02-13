import React, { useState, useEffect } from 'react';
import Loading from "../Loading";
import { Col } from 'react-bootstrap';
import RemoveFromCart from "./RemoveFromCart";
import Checkout from "./Checkout"; 
import { Link } from 'react-router-dom';

const Cart = () => {
    document.title = "Cart";
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/get-cart`, {
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

    if (!cart) {
        return <Loading/>;
    }

    console.log(cart);

    return (
        <>  
            {
                cart.cartItems.length === 0 ?
                <p className="text-center">No products found. <i class="fa-regular fa-face-frown"></i></p>
                :
                <>
                    <Col lg={7}>
                        <ul className="d-flex flex-column gap-5 list-unstyled">
                            {cart.cartItems.map((item) => (
                                <li key={item._id} className="d-flex p-2 gap-5 border-bottom">
                                    {item.productId.images.length > 0 ? (
                                        <img src={item.productId.images[0]} alt={item.productId.name} style={{ maxWidth: '100px' }} />
                                    ) : (
                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="Default Image" style={{ maxWidth: '100px' }} />
                                    )}
                                    <div>
                                        <p>Product Name:{item.productId.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Subtotal: &#8369;{item.subtotal}</p>
                                    </div>
                                    <div className="ms-auto">
                                        <RemoveFromCart cartId={item.productId._id}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                            <Checkout />
                            <Link to="/products" type="button" className="p-3 btn btn-outline-dark">Continue Shopping</Link>
                        </div>
                    </Col>
                </>
            }
        </>
    );
};

export default Cart;
