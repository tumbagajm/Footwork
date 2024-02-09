import { Container, Row, Col } from "react-bootstrap";
import ProductList from "../products/ProductList";

const ProductSection = () => {
  return (
    <>
        <Container>
            <Row className="mb-5">
                <h2 className="d-block display-4 text-center">Our Collection</h2>
            </Row>
            <Row>
                <ProductList />
            </Row>
        </Container>
    </>
  )
}

export default ProductSection;