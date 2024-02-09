import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductList from "./products/ProductList";

export default function UserView({ productsData }) {

    return (
        <>
            <Container>
                <Row>
                    <ProductList />
                </Row>
            </Container>
        </>
    );
}
