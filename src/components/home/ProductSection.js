import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";
import Loading from "../Loading";

const ProductSection = () => {
    const [products, setProducts] = useState([]);  // Default to an empty array
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    const url = `${process.env.REACT_APP_API_BASE_URL}/products/`;
    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                if (Array.isArray(data)) {  // Check if the response is an array
                    setProducts(data);
                } else {
                    setProducts([]);  // Ensure it's an empty array if not an array
                    console.error("Data is not an array", data);
                }
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();

        // Cleanup function (optional)
        return () => {
            // Cleanup code if needed
        };
    }, []);  // Empty dependency array means this effect runs only once after the initial render

    // Ensure productList is generated only if products is an array
    const productList = Array.isArray(products) && products.length > 0
        ? products.slice(0, 6).map(product => {
            return (
                <Col md={4} key={product._id}>
                    <ProductCard productProp={product} />
                </Col>
            );
        })
        : null;

    return (
        <>
            <Container className="py-5">
                <Row className="py-5">
                    <h2 className="d-block display-4 text-center fw-bold">Our Collection</h2>
                </Row>
                <Row className="py-5">
                    {
                        isLoading ? <Loading /> : productList || <p>No products available.</p>  // Display message if products are empty
                    }
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Link to="/products" className="text-decoration-none text-dark">
                            See more <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductSection;
