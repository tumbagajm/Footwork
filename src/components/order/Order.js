import React, { useState, useEffect } from 'react';

const UserOrders = () => {
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace '/api/user/orders' with your actual API endpoint
        const fetchUserOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching user orders');
                }

                const data = await response.json();
                console.log(data);
                setUserOrders(data.data);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []); // Empty dependency array to run the effect only once on component mount

    return (
        <div>
            <h2>User Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : userOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {userOrders.map((order) => (
                        <li key={order._id}>
                            <p>Order ID: {order._id}</p>
                            <p>Total Price: {order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p>Ordered On: {new Date(order.orderedOn).toLocaleString()}</p>
                            <ul>
                                {order.productsOrdered.map((product) => (
                                    <li key={product._id}>
                                        <p>Product Name: {product.productId.name}</p>
                                        <p>Quantity: {product.quantity}</p>
                                        <p>Subtotal: {product.subtotal}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrders;
