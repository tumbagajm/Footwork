import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import ProductList from "../products/ProductList";
import ProductCard from "../products/ProductCard";
import Loading from "../Loading";

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state

    const url = `${process.env.REACT_APP_API_BASE_URL}/products/`;
    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setProducts(data)
                setIsLoading(false); // Set loading to false once data is fetched

            } catch(error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();

        // Cleanup function (optional)
        return () => {
            // Cleanup code here if needed
        };

    }, []); // Empty dependency array means this effect runs only once after the initial render

    const productList = products.slice(0, 6).map(product => {
        return (
            <Col md={4} key={product._id}>
                <ProductCard productProp={product} />
            </Col>
        );
    });

    return (
        <>
            <Container className="py-5">
                <Row className="py-5">
                    <h2 className="d-block display-4 text-center fw-bold">Our Collection</h2>
                </Row>
                <Row className="py-5">
                    {
                        isLoading ?
                        <Loading /> 
                        :
                        productList
                    }
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Link to="/products" className="text-decoration-none text-dark">See more <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Link>
                    </Col>
                </Row>
            </Container>
        </>
  )
}

export default ProductSection;