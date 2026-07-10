import { NavLink } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import { useState, useEffect } from "react";


function MobileBottomNav() {
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
                <NavLink to="/productlisting" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-house "></i>
                    <small>Home</small>
                </NavLink>

                <NavLink to="/categories" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-grid "></i>
                    <small>Categories</small>
                </NavLink>


                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <div className="cart-icon">
                        <i className="bi bi-cart4 "></i>

                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    </div>

                    <small>Cart</small>
                </NavLink>

                <NavLink to="/wishlist" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-heart "></i>
                    <small>Wishlist</small>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-person "></i>
                    <small>Account</small>
                </NavLink>

            </nav>
        </>
    );
}

export default MobileBottomNav;