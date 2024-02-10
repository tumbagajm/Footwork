import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductList from "./products/ProductList";

export default function UserView({ productsData }) {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const getProductCount = () => {
            setProductCount(productsData.length);
        }

        getProductCount()

    }, [productsData])

    return (
        <>
            <Container>
                <Row className="py-3">
                    <h1 className="d-block fw-medium d-flex align-items-center gap-2">Product List <span className="fs-2">{`(${productCount})`}</span></h1> 
                    <h5 className="d-block fw-medium text-secondary">Walk in Confidence, Stride in Style</h5>
                </Row>
                <Row className="py-3">
                    <ProductList />
                </Row>
            </Container>
        </>
    );
}
