import { Table, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArchiveProduct from "../products/ArchiveProduct";
import ActivateProduct from "../products/ActivateProduct";
import UpdateProduct from "../products/UpdateProduct";
import UserList from './UserList';
import AdminOrderView from './AdminOrderView';
import AddProduct from './AddProduct';
import Loading from "../Loading";

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
                        <>
                            <Container>
                                <Row>
                                    <Col>
                                        <h1 className="mb-5"> Admin Dashboard</h1>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active text-dark" id="products-tab" data-bs-toggle="tab" data-bs-target="#products-tab-pane" type="button" role="tab" aria-controls="products-tab-pane" aria-selected="true">Products</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link text-dark" id="users-tab" data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane" aria-selected="false">Users</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link text-dark" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders-tab-pane" type="button" role="tab" aria-controls="orders-tab-pane" aria-selected="false">Orders</button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row>


                                    <Col>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active" id="products-tab-pane" role="tabpanel" aria-labelledby="products-tab" tabindex="0">
                                                <div className="p-3">
                                                <AddProduct fetchData={fetchData}/>
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
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="users-tab-pane" role="tabpanel" aria-labelledby="users-tab" tabindex="0">
                                                <UserList />
                                            </div>
                                            <div class="tab-pane fade" id="orders-tab-pane" role="tabpanel" aria-labelledby="orders-tab" tabindex="0">
                                                <AdminOrderView />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                            <Container className="mt-5 pt-5 d-none">
                                <h1> Admin Dashboard</h1>
                                <h2>Products</h2>
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
                                <h1>Users</h1>
                                <UserList />

                            </Container>
                        </>
                    )
            }
        </>
    );
}

export default AdminView