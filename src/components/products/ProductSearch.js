import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { Row, Container } from "react-bootstrap";

const ProductSearch = ({ fetchData, productsData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [productCount, setProductCount] = useState(0);
    

    useEffect(() => {
        
        const getProductCount = () => {
            if(searchQuery){
                setProductCount(searchResults.length);
            }else{
                setProductCount(productsData.length);
            }
        }

        getProductCount()

    })

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setSearchQuery(event.target.value);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName: searchQuery })
            });
            const data = await response.json();
            if (data.length > 0) {
                setSearchResults(data);
                setProductCount(data.length);
            }
            else{
                setProductCount(0);
            }
        } catch (error) {
            console.error('Error searching for products:', error);
        }
    };

    return (
        <>
            <Container>
                <Row className="py-3">
                    <h1 className="d-block fw-medium d-flex align-items-center gap-2">Product List <span className="fs-2">{`(${productCount})`}</span></h1>
                    <h5 className="d-block fw-medium text-secondary">Walk in Confidence, Stride in Style</h5>
                    <div>
                        <form className="form-block my-2 d-flex gap-2">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </form>
                        <Row className="py-3">
                            <ProductList productsData={searchQuery == '' ? productsData : searchResults} fetchData={fetchData} />
                        </Row>
                    </div>
                </Row>
            </Container>
        </>

    );
};

export default ProductSearch;
