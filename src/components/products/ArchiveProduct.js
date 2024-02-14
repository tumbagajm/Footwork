import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ArchiveProduct({ productId, fetchData }) {
    const [showArchive, setShowArchive] = useState(false);

    const archiveProduct = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
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
                setShowArchive(false);
                fetchData();
            });
    };

    return (
        <>
            <Button variant="danger" size="sm" onClick={() => setShowArchive(true)}>
                Archive
            </Button>

            <Modal show={showArchive} onHide={() => setShowArchive(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to archive this product?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowArchive(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={archiveProduct}>
                        Archive
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
