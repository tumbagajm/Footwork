import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";

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

    </>
  );
}

export default ProductPage;