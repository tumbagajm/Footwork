import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import { Container } from "react-bootstrap";

const ProductPage = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    let target = "";
    if(user.isAdmin){
        target = "all";
    }

    const fetchData = () => {
        // get all active courses
        fetch(`${process.env.REACT_APP_API_URL}/products/${target}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
            {
                user.isAdmin ?
                <AdminView productsData={products} fetchData={fetchData} />
                :
                <UserView productsData={products} fetchData={fetchData} />
            }
        </>
    );
}

export default ProductPage;