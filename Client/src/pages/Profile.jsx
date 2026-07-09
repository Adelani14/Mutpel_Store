import React from "react";
import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";


const Profile = () => {

    const logout = async () => {
        try {
            await Axios.post("/api/users/logout");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className="container my-5">
                <div className="row g-4">
                    <ul className="list-group shadow-sm rounded-4">

                        <li className="list-group-item">
                            <i className="bi bi-box me-2"></i>
                            Orders
                        </li>

                        <li className="list-group-item">
                            <i className="bi bi-heart me-2"></i>
                            Wishlist
                        </li>

                        <li className="list-group-item">
                            <i className="bi bi-credit-card me-2"></i>
                            Payments
                        </li>

                        <li className="list-group-item">
                            <i className="bi bi-geo-alt me-2"></i>
                            Addresses
                        </li>

                        <li className="list-group-item">
                            <i className="bi bi-star me-2"></i>
                            Reviews
                        </li>

                    </ul>

                    <main className="col-12 col-lg-9">

                        <div className="card border-0 shadow rounded-4 mb-4">
                            <div className="card-body p-4 d-flex align-items-center">

                                <div
                                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                    style={{ width: 75, height: 75 }}
                                >
                                    <i className="bi bi-person-fill fs-2"></i>
                                </div>

                                <div className="ms-3">
                                    <h3 className="mb-1 fw-bold">
                                        ABDULSEMIU SODEEQ ADELANI
                                    </h3>

                                    <p className="text-muted mb-0">
                                        princeadelani27@gmail.com
                                    </p>
                                </div>

                            </div>
                        </div>


                        <div className="row g-4">

                            <div className="col-12 col-md-6">
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                <i className="bi bi-person me-2 text-primary"></i>
                                                Account Details
                                            </h5>

                                            <i className="bi bi-pencil"></i>
                                        </div>

                                        <hr />

                                        <h6 className="fw-bold">
                                            ABDULSEMIU SODEEQ ADELANI
                                        </h6>

                                        <p className="text-muted mb-0">
                                            princeadelani27@gmail.com
                                        </p>

                                    </div>
                                </div>
                            </div>


                            <div className="col-12 col-md-6">
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                <i className="bi bi-geo-alt me-2 text-primary"></i>
                                                Address Book
                                            </h5>

                                            <i className="bi bi-pencil"></i>
                                        </div>

                                        <hr />

                                        <p className="mb-1">
                                            Power Line Obatedo
                                        </p>

                                        <p className="mb-1">
                                            Iwo, Osun State
                                        </p>

                                        <p className="mb-0">
                                            +234 9160031012
                                        </p>

                                    </div>
                                </div>
                            </div>


                            <div className="col-12 col-md-6">
                                <div className="card border-0 shadow-sm rounded-4">
                                    <div className="card-body">

                                        <h5>
                                            <i className="bi bi-wallet2 me-2 text-primary"></i>
                                            Store Credit
                                        </h5>

                                        <hr />

                                        <h3 className="text-success fw-bold">
                                            ₦0.00
                                        </h3>

                                    </div>
                                </div>
                            </div>


                            <div className="col-12 col-md-6">
                                <div className="card border-0 shadow-sm rounded-4">
                                    <div className="card-body">

                                        <h5>
                                            <i className="bi bi-envelope me-2 text-primary"></i>
                                            Newsletter
                                        </h5>

                                        <hr />

                                        <p className="text-muted">
                                            Stay updated with our latest offers and discounts.
                                        </p>

                                        <button className="btn btn-outline-primary btn-sm">
                                            Manage
                                        </button>

                                    </div>
                                </div>
                            </div>


                            <div className="col-12">

                                <button
                                    onClick={logout}
                                    className="btn btn-danger rounded-pill px-5 py-2"
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Sign Out
                                </button>

                            </div>

                        </div>

                    </main>
                </div>
            </div>
            <MobileBottomNav />
        </>
    );
};

export default Profile;