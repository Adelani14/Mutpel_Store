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
                    <aside className="col-12 col-lg-3">
                        <div className="sidebar-card p-3">
                            <div className="profile-title">My Jumia Account</div>
                            <ul className="profile-nav list-unstyled mt-3 mb-0">
                                <li className="nav-item">Orders</li>
                                <li className="nav-item">Inbox</li>
                                <li className="nav-item">Pending Reviews</li>
                                <li className="nav-item">Voucher</li>
                                <li className="nav-item">Wishlist</li>
                                <li className="nav-item">Followed Sellers</li>
                                <li className="nav-item">Recently Viewed</li>
                            </ul>
                        </div>
                    </aside>

                    <main className="col-12 col-lg-9">
                        <h2 className="mb-4">Account Overview</h2>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="account-card">
                                    <div className="card-title">Account Details</div>
                                    <div className="card-body">
                                        <div className="name">ABDULSEMIU SODEEQ ADELANI</div>
                                        <div className="email text-muted">princeadelani27@gmail.com</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="account-card">
                                    <div className="card-title">Address Book
                                        <span className="edit-icon" title="Edit">✎</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="address-label">Your default shipping address:</div>
                                        <div className="address-line">ABDULSEMIU SODEEQ ADELANI</div>
                                        <div className="address-line">Power line Obatedo</div>
                                        <div className="address-line">iwo osun state</div>
                                        <div className="address-line">Iwo, Osun</div>
                                        <div className="address-line">+234 9160031012 / +234 8143021370</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="account-card">
                                    <div className="card-title">Jumia Store Credit</div>
                                    <div className="card-body">
                                        <div className="store-credit">Jumia store credit balance: ₦ 0</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="account-card">
                                    <div className="card-title">Newsletter Preferences</div>
                                    <div className="card-body">
                                        <div className="muted">Manage your email communications to stay updated with the latest news and offers.</div>
                                        <div className="mt-3"><a className="edit-link" href="#">Edit Newsletter preferences</a></div>
                                    </div>
                                </div>
                            </div>

                            <button className="nav-link rounded-4 mt-5 text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Sign Out</button>

                        </div>
                    </main>
                </div>
            </div>
            <MobileBottomNav />
        </>
    );
};

export default Profile;