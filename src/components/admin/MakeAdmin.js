import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function MakeAdmin({ userId, updateUserList }) {
    const [showModal, setShowModal] = useState(false);

    const makeAdmin = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(userId);
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
                updateUserList();
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error making user admin:', error);
                // Display error alert
                Swal.fire({
                    title: 'Oops...',
                    icon: 'error',
                    text: 'Error making user admin!',
                });
            });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
                Make Admin
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Make User Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to make this user an admin?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={makeAdmin}>
                        Make Admin
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
