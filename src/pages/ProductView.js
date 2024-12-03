import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

export default function ProductView() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsloading] = useState(true);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    // retrieve the product id in the params/url -> :productId
    const { productId } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then((res) => res.json())
            .then((data) => {
                setName(data.data.name);
                setDescription(data.data.description);
                setPrice(data.data.price);
                setImages(data.data.images);
                setIsloading(false);
            });
    });
    const handleQuantityChange = (e) => {
        const parsedValue = parseInt(e.target.value) || 1;
        const newQuantity = Math.min(10, Math.max(1, parsedValue));
        setQuantity(newQuantity);
    };


    const purchase = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/add-to-cart`, {
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
                if (data.isSuccess) {
                    Swal.fire({
                        title: "Added to cart",
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
            {
                isLoading ? (
                    <Loading />
                )
                :
                (
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
                                            {
                                                images.length === 0 ? 
                                                <img src={"https://placehold.co/400x400"} className="product_img rounded-4" />
                                                :
                                                <img src={images[0]} className="product_img rounded-4" />
                                            }
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

                                            <h6>Product Details:</h6>
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
                                                    <button type="button" className="btn btn-dark py-2 px-5 fs-6" onClick={purchase}>Add to cart</button>
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
                )
            }

            
        </>
    );
}
