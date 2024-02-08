import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArchiveProduct from "./ArchiveProduct";
import ActivateProduct from "./ActivateProduct";

const AdminView = ({ productsData, fetchData }) => {
    const [products, setProducts] = useState([]);

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
                        {/* <Editproduct product={product._id} fetchData={fetchData} /> */}
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
    }, [productsData, fetchData]);

    return (
        <>
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
        </>
    );
}

export default AdminView