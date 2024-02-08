import { Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const AdminView = ({productsData, fetchData}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const productArr = productsData.map((course) => {
    return (
      <tr key={course._id}>
        <td>{course._id}</td>
        <td>{course.name}</td>
        <td>{course.description}</td>
        <td>{course.price}</td>
        <td className={course.isActive ? "text-success" : "text-danger"}>
          {course.isActive ? "Available" : "Unavailable"}
        </td>
        <td>
          {/* <EditCourse course={course._id} fetchData={fetchData} /> */}
        </td>
        <td>
          {/* <ArchiveCourse course={course} fetchData={fetchData} /> */}
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