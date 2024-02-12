import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArchiveProduct from "./products/ArchiveProduct";
import ActivateProduct from "./products/ActivateProduct";
import UpdateProduct from "./products/UpdateProduct";
import Loading from "./Loading";

const AdminView = ({ productsData, fetchData }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state


    useEffect(() => {
        const productArr = productsData.map((product) => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td>
                        <UpdateProduct product={product._id} fetchData={fetchData} />
                    </td>
                    <td>
                        {
                            product.isActive ?
                                <ArchiveProduct productId={product._id} fetchData={fetchData} />
                                :
                                <ActivateProduct productId={product._id} fetchData={fetchData} />
                        }
                    </td>
                </tr>
            );
        });

        setProducts(productArr);
        setIsLoading(false);
    }, [productsData, fetchData]);

    return (
        <>
            {
                isLoading ?
                (<Loading />)
                :
                (
                    <Container>
                        <h1> Admin Dashboard</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>{products}</tbody>
                        </Table>
                    </Container>
                )
            }
        </>
    );
}

export default AdminView