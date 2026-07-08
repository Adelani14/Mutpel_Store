import Axios from "../utils/axiosInstance.js";
import { useState, useEffect } from "react";
const Footer = () => {
    const [email, setEmail] = useState("");

    const getUsername = async () => {
        try {
            const res = await Axios.get("/api/users/Username");

            setEmail(res.data?.email || "");

        } catch (error) {
            console.log(error);
        }
    };
    return (

        <>
            <footer className="footer-section bg-light py-5 mt-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: '44px', height: '44px' }}>
                                    <i className="bi bi-basket-fill"></i>
                                </div>
                                <h2 className="h5 mb-0 text-primary">Mutpel</h2>
                            </div>
                            <p className="text-muted">Your premium multi-category store delivering quality accessories, kitchenware, and apparel across Nigeria.</p>
                        </div>
                        <div className="col-md-2">
                            <h3 className="h6 text-dark">Shop Categories</h3>
                            <ul className="list-unstyled mt-3 mb-0 text-muted small">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Phone Accessories</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Kitchen Utensils</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Footwear</a></li>
                                <li><a href="#" className="text-muted text-decoration-none">Baby & Kids</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h3 className="h6 text-dark">Customer Service</h3>
                            <ul className="list-unstyled mt-3 mb-0 text-muted small">
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Track Your Order</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Shipping & Returns</a></li>
                                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">FAQs</a></li>
                                <li><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3 className="h6 text-dark">Join Our Newsletter</h3>
                            <p className="text-muted small">Get the latest deals and products in your inbox.</p>
                            <form className="d-flex gap-2 flex-column flex-sm-row">
                                <input type="email" className="form-control"  placeholder="Enter email address" readOnly value={email} />
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