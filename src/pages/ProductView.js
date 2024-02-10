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
    const [quantity, setQuantity] = useState(1);
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
    const handleQuantityChange = (e) => {
        const parsedValue = parseInt(e.target.value) || 1;
        const newQuantity = Math.min(10, Math.max(1, parsedValue));
        setQuantity(newQuantity);
    };


    const purchase = () => {
        fetch(`${process.env.REACT_APP_API_URL}/carts/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
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
        <>
            {/* <Container className="mt-5">
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
                                    <>
                                        <label htmlFor="quantity">Quantity:</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max="10"
                                            step="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                        />
                                        <Button variant="primary" onClick={() => purchase(productId)}>
                                            {<FontAwesomeIcon icon={faCartPlus} />}
                                        </Button>
                                    </>

                                ) : (
                                    <>
                                        <Link className="btn-danger btn" to="/login">
                                            Login to Purchase
                                        </Link>
                                    </>

                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container> */}

            <Container className="mt-5">
                <Row>
                    <Col>
                        <div className="product_card p-4 d-flex flex-column gap-3 gap-md-4 rounded-4 shadow">
                            <Row>
                                <h2 className="fw-semibold">Product Overview</h2>
                                {/* <Card.Subtitle className="mb-2 text-muted">Product Overviews with image gallery and expandable details</Card.Subtitle> */}
                            </Row>
                            <Row>
                                <Col lg={6} className="mb-4">
                                    <img src={"https://placehold.co/400x400"} className="product_img rounded-4" />
                                </Col>
                                <Col lg={6} className="mb-4 d-flex flex-column gap-4">
                                    <div>
                                        <h2 className="fw-semibold">{name}</h2>
                                        <p className="mb-4 primary">
                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                        </p>
                                        <h3 className="fw-light">&#8369;{price}</h3>
                                    </div>
                                    <p className="text-secondary">{description}</p>

                                    <div class="form-group row">
                                        <div class="col-4 ">
                                            <label className="mb-2" for="quantity">Quantity</label>
                                            <input
                                            className="form-control"
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max="10"
                                            step="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            />
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col d-flex gap-3 align-items-center">
                                            <button type="button" className="btn btn-dark py-2 px-5 fs-6">Add to cart</button>
                                            <span type="button">
                                                <FontAwesomeIcon icon="fa-solid fa-heart" className="fs-3"/>
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
