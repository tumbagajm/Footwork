import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const UpdateProduct = ({ product, fetchData }) => {
    const [productId, setProductId] = useState("");
    // const { productId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    // useState for modal to open/close
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {
        setShowEdit(true);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setProductId(data.data._id);
            setName(data.data.name);
            setDescription(data.data.description);
            setPrice(data.data.price);
        });
    };

    const closeEdit = () => {
        setShowEdit(false);
        setName("");
        setDescription("");
        setPrice("");
    };

    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: name,
            description: description,
            price: price,
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.message === "Product has been updated") {
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product Successfully Updated",
                });

                closeEdit();
                fetchData();

            } else {
                Swal.fire({
                    title: "Oh no!!",
                    icon: "error",
                    text: "Please try again!",
                });

                closeEdit();
                fetchData();
            }
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={(e) => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit">
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateProduct;