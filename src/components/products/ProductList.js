import ProductCard from './ProductCard';
import { useEffect, useState, } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import Loading from '../Loading';

const ProductList = ({productsData, fetchData}) => {
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
    
    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []); 

    const productList = productsData.map(product => {
                            return (
                                <Col md={4}>
                                    <ProductCard productProp={product} key={product._id} />
                                </Col>
                            );
                        });
    return (
        <>
            {isLoading ? ( // Check loading state, if true, show loading animation
            <Loading />
            ) : (
                <>
                {productList.length > 0 ? (
                    <>{productList}</>
                ) : (
                    <Loading/>
                )}
            </>
            )}
        </>
    )
}

export default ProductList