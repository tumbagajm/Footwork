import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductList from "../products/ProductList";

const ProductSection = () => {
  return (
    <>
        <Container className="py-5">
            <Row className="py-5">
                <h2 className="d-block display-4 text-center fw-medium">Our Collection</h2>
            </Row>
            <Row className="py-5">
                <ProductList />
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