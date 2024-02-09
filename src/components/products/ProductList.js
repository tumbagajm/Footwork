import ProductCard from './ProductCard';
import { useEffect, useState, } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const url = process.env.REACT_APP_API_URL;
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
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();

        // Cleanup function (optional)
        return () => {
            // Cleanup code here if needed
        };
    }, []) // Empty dependency array means this effect runs only once after the initial render


    return (
        <>
            {products}
            {/* <ProductCard productsData={products} /> */}
        </>
    )
}

export default ProductList