import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductList from "./ProductList";

export default function UserView({ productsData }) {
    document.title = "Products"
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
                    <form className="form-block my-2 d-flex gap-2">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </Row>
                <Row className="py-3">
                    <ProductList />
                </Row>
            </Container>
        </>
    );
}
