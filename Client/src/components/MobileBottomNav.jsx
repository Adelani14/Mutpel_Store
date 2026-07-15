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
  if (localStorage.getItem("accessToken")) {
    fetchCartCount();
  }
}, []);





    return (
        <>
            <nav className="mobile-bottom-nav d-md-none">
                <NavLink to="/productlisting" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-house fs-5"></i>
                    <small>Home</small>
                </NavLink>

                <NavLink to="/categories" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-grid fs-5"></i>
                    <small>Categories</small>
                </NavLink>


                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <div className="cart-icon">
                        <i className="bi bi-cart4 fs-5"></i>

                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    </div>

                    <small>Cart</small>
                </NavLink>

                <NavLink to="/wishlist" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-heart fs-5"></i>
                    <small>Wishlist</small>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-person fs-5"></i>
                    <small>Account</small>
                </NavLink>

            </nav>
        </>
    );
}

export default MobileBottomNav;