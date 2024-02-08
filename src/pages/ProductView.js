import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function ProductView() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    // retrieve the product id in the params/url -> :productId
    const { productId } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then((res) => res.json())
            .then((data) => {
                setName(data.data.name);
                setDescription(data.data.description);
                setPrice(data.data.price);
            });
    });


    const purchase = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                purchasedProducts: [{ productId }],
                quantity: price,
            }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.message) {
                    Swal.fire({
                        title: "Successfully purchased",
                        icon: "success",
                        text: data.message,
                    });

                    navigate('/products');
                } else {
                    Swal.fire({
                        title: "Oh, no!",
                        icon: "error",
                        text: data.error,
                    });
                } 
            });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Card.Subtitle>Product Details</Card.Subtitle>
                            <Card.Text>Additional product details here.</Card.Text>
                            {user.id !== null ? (
                                <Button variant="primary" onClick={() => purchase(productId)}>
                                    {<FontAwesomeIcon icon={faCartPlus} />}
                                </Button>
                            ) : (
                                <Link className="btn-danger btn" to="/login">
                                    Login to Purchase
                                </Link>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
