import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

const RemoveFromCart = ({cartId}) => {
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const removeProductFromCart = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${cartId}/remove-from-cart`, {
            method: "PATCH",
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
            setShowRemoveModal(false); // Assuming you have setShowRemoveModal function
        });
    };
    
    return (
        <>
            <button type="button" className='btn' onClick={() => setShowRemoveModal(true)}>Remove</button>

            <Modal show={showRemoveModal} onHide={() =>setShowRemoveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Product from Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove this product from your cart?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowRemoveModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={removeProductFromCart}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveFromCart;