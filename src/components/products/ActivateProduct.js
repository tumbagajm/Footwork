import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ActivateProduct({ productId, fetchData }) {
    const [showActivate, setShowActivate] = useState(false);

    const activateProduct = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
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
                setShowActivate(false);
                fetchData();
            });
    };

    return (
        <>
            <Button variant="success" size="sm" onClick={() => setShowActivate(true)}>
                Activate
            </Button>

            <Modal show={showActivate} onHide={() => setShowActivate(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Activate Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Activate this product?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowActivate(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={activateProduct}>
                        Activate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
