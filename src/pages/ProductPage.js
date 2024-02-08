import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";

const ProductPage = () => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  const fetchData = () => {
    // get all active courses
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const productArr = data.map((product) => {
          return product;
        });

        setProducts(productArr);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <AdminView productsData={products} fetchData={fetchData} />

    </>
  );
}

export default ProductPage;