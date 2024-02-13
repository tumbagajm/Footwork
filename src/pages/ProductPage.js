import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/admin/AdminView";
import UserView from "../components/products/UserView";

const ProductPage = () => {

    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    // console.log(user)

    const target = user.isAdmin ? "all" : "";
    document.title = user.isAdmin ? "Admin Dashboard" : "Products";
    

    const fetchData = () => {
        // get all active courses
        fetch(`${process.env.REACT_APP_API_URL}/products/${target}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.length > 0){
                const productArr = data.map((product) => {
                    return product;
                });
                setProducts(productArr);
            }
            else{
                console.log("No products found.");
            }
            
        });
    };
    useEffect(() => {
        fetchData();
    }, [target]);

    return (
        <>
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