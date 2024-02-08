import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function UserView({ productsData }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => {
            console.log(product);
            return (
                <ProductCard productProp={product} key={product._id} />
            );
        });
        setProducts(productsArr);
    }, [productsData]);


    return (
        <>
            {products}
        </>
    );
}
