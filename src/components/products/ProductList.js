import ProductCard from './ProductCard';
import { useEffect, useState, } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const url = `${process.env.REACT_APP_API_URL}/products/`;
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

    }, []); // Empty dependency array means this effect runs only once after the initial render

    console.log(products);

    const productList = products.map(product => {
                            return (
                                <Col md={4}>
                                    <ProductCard productProp={product} key={product._id} />
                                </Col>
                            );
                        });

    return (
        <>
            { productList }
        </>
    )
}

export default ProductList