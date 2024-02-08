import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

const ProductPage = () => {
    document.title = "Products";

    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [target, setTarget] = useState("all");

    console.log(user)

    // let target = ""
    // if(user.isAdmin){
    //     // setTarget("all");
    //     target = "all"
    //     document.title = "Admin Dashboard";
    // }
    

    const fetchData = () => {
        // get all active courses
        fetch(`${process.env.REACT_APP_API_URL}/products/${target}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
        if(user.isAdmin){
            setTarget("all");
        }
        fetchData();
    }, []);

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