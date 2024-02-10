import React, { useState, useEffect } from 'react';
import Loading from "../Loading";

const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        // Fetch cart data for the logged-in user
        const fetchCartData = async () => {
            try {
                // Replace this with your actual API endpoint to fetch the cart data
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

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            <ul>
                {cart.cartItems.map((item) => (
                    <li key={item._id}>
                        {item.productId.images.length > 0 ? (
                            <img src={item.productId.images[0]} alt={item.productId.name} style={{ maxWidth: '100px' }} />
                        ) : (
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="Default Image" style={{ maxWidth: '100px' }} />
                        )}
                        <p>Product Name:{item.productId.name}</p>
                        <p>Product ID: {item.productId._id}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ${item.subtotal}</p>
                    </li>
                ))}
            </ul>
            <p>Total Price: ${cart.totalPrice}</p>
        </div>
    );
};

export default Cart;
