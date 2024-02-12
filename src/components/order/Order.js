import { useState, useEffect, useContext } from "react";
// import AdminOrderView from "../components/AdminOrderView";
import UserOrderView from "./UserOrderView";
import UserContext from "../../UserContext"; 
import AdminOrderView from "../admin/AdminOrderView";
import { Navigate } from "react-router-dom";

const OrderPage = () => {
    document.title = "Orders";
    const { user } = useContext(UserContext);

    return (
        <>
            {user.isAdmin ? (
                <Navigate to="/products"/>
            ) : (
                <UserOrderView/>
            )}
        </>
    );
};

export default OrderPage;