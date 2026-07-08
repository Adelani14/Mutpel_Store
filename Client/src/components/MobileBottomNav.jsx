import { NavLink } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import { useState, useEffect } from "react";
import {
    House,
    Grid,
    Person,
    Cart3,
} from "react-bootstrap-icons";

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
                <NavLink to="/" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <House size={22} />
                    <small>Home</small>
                </NavLink>

                <NavLink to="/categories" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <Grid size={22} />
                    <small>Categories</small>
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <Person size={22} />
                    <small>Profile</small>
                </NavLink>

                <NavLink to="/cart" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <Cart3 size={22} />
                    <small>Cart</small>

                    {/* Optional cart badge */}
                    <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                        {cartCount}
                    </span>
                </NavLink>

            </nav>
        </>
    );
}

export default MobileBottomNav;