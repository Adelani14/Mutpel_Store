import { NavLink } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import { useState, useEffect } from "react";


function AdminMobileBottomNav() {
    const [cartCount, setCartCount] = useState(0);
    const fetchCartCount = async () => {
        try {
            const res = await Axios.get("/api/cart/getCartCount")

            setCartCount(res.data?.count || 0);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchCartCount();
    }, []);





    return (
        <>
            <nav className="mobile-bottom-nav d-md-none">
                <NavLink to="/admindashboard" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-house fs-5"></i>
                    <small>Home</small>
                </NavLink>

                <NavLink to="/categories" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-basket2 fs-5"></i>
                    <small>Orders</small>
                </NavLink>




                <NavLink to="/newproduct" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-plus fs-5"></i>
                    <small>New</small>
                </NavLink>

                <NavLink
                    to="/productlisting"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <i className="bi bi-shop fs-5"></i>

                    <small>Store</small>
                </NavLink>

                <NavLink to="/allproducts" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-box-seam fs-5"></i>
                    <small>Products</small>
                </NavLink>

            </nav>
        </>
    );
}

export default AdminMobileBottomNav;