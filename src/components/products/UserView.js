import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

export default function UserView({ productsData, fetchData }) {
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
            <ProductSearch fetchData= {fetchData} productsData = {productsData}/>
        </>
    );
}
