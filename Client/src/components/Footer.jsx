import Axios from "../utils/axiosInstance.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    const [email, setEmail] = useState("");

    const getUsername = async () => {
        try {
            const res = await Axios.get("/api/users/Username");

            setEmail(res.data?.user?.email || "");

        } catch (error) {
            console.log(error);
        }
    };
    

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        setEmail(user.email);
    }
}, []);
    return (

        <>
            <footer className="footer-section bg-light mb-5 py-5 mt-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: '44px', height: '44px' }}>
                                    <img
                                        src="/icons/logo.png"
                                        alt="Mutpel Logo"
                                        style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                    />                                </div>
                                <h2 className="h5 mb-0 text-primary">Mutpel</h2>
                            </div>
                            <p className="text-muted">Your premium multi-category store delivering quality accessories, kitchenware, and apparel across Nigeria.</p>
                        </div>
                        <div className="col-md-2">
                            <h3 className="h6 text-dark">Shop Categories</h3>
                            <ul className="list-unstyled mt-3 mb-0 text-muted small">
                                <li className="mb-2"><Link to="/phone-accessories" className="text-muted text-decoration-none">Phone Accessories</Link></li>
                                <li className="mb-2"><Link to="/kitchen-utensils" className="text-muted text-decoration-none">Kitchen Utensils</Link></li>
                                <li className="mb-2"><Link to="/footwear" className="text-muted text-decoration-none">Footwear</Link></li>
                                <li><Link to="/baby-kids" className="text-muted text-decoration-none">Baby & Kids</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h3 className="h6 text-dark">Customer Service</h3>
                            <ul className="list-unstyled mt-3 mb-0 text-muted small">
                                <li className="mb-2"><Link to="/track-order" className="text-muted text-decoration-none">Track Your Order</Link></li>
                                <li className="mb-2"><Link to="/shipping-returns" className="text-muted text-decoration-none">Shipping & Returns</Link></li>
                                <li className="mb-2"><Link to="/faqs" className="text-muted text-decoration-none">FAQs</Link></li>
                                <li><Link to="/privacy-policy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3 className="h6 text-dark">Join Our Newsletter</h3>
                            <p className="text-muted small">Get the latest deals and products in your inbox.</p>
                            <form className="d-flex gap-2 flex-column flex-sm-row">

                                <div className="col-md-6"><label className="form-label">Email Address</label><input className="form-control" type="email" value={email} placeholder="Enter your email" /></div>
                                <button className="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top small text-muted">
                        <span>© 2024 Mutpel. All rights reserved. Prices in NGN.</span>
                        <span>Paystack Secured · Visa / Mastercard</span>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;