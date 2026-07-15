
import React from 'react';
import { useState, useEffect } from 'react';
import Helpcenter from '../components/Helpcenter';
import Axios from "../utils/axiosInstance.js";
import { Link, NavLink } from 'react-router-dom';
import AdminMobileBottomNav from '../components/AdminMobileBottomNav.jsx';
const Admindashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,

        revenueToday: 0,
        revenueThisMonth: 0,
        revenueThisYear: 0,
        totalRevenue: 0,

        averageOrderValue: 0,
        productsSold: 0,

        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0,
    });




    const fetchDashboardStats = async () => {
        try {
            const response = await Axios.get("/api/dashboardstats/stats")

            // const data = await response.json();

            // console.log(data);

            setStats(response.data);

        } catch (error) {
            console.error(error);
        }
    };




    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchProducts = async (currentPage) => {
        try {
            const response = await Axios.get(`/api/products?page=${currentPage}&limit=${limit}`)

            // const data = await response.json();

            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

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
    const [firstName, setFirstName] = useState("");
    const getUsername = async () => {
        try {
            const res = await Axios.get("/api/users/Username");

            setFirstName(res.data?.user?.firstname || "");
        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;
        setLoading(true)

        try {

            await Axios.delete(`/api/products/${id}`);

            setProducts(prev =>
                prev.filter(product => product._id !== id)
            );

            alert("Product deleted successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to delete product.");

        } finally {
            setLoading(false);
        }

    };



    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchDashboardStats(),
                    getUsername(),
                    fetchProducts(page),
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);




    return (
        <>
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        zIndex: 9999,
                    }}
                >
                    <div className="position-relative d-inline-flex justify-content-center align-items-center">
                        <i
                            className="bi bi-basket-fill text-primary"
                            style={{ fontSize: "2.5rem" }}
                        ></i>

                        <div
                            className="spinner-border spinner-border-sm text-light position-absolute"
                            style={{
                                width: "1.3rem",
                                height: "1.3rem",
                            }}
                        ></div>
                    </div>
                </div>
            )}
            <Helpcenter />
            <header className="bg-white shadow-sm sticky-top" style={{ height: "80px", zIndex: 1100 }}>
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="brand-icon rounded-3 d-flex d-xl-none align-items-center justify-content-center bg-primary text-white"
                                onClick={toggleSidebar}
                            >
                                <img
                                    src="/icons/logo.png"
                                    alt="Mutpel Logo"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                            <div><h1 className="h5 mb-0 text-primary">Mutpel Household</h1></div>
                        </div>
                        <div className="d-flex align-items-center gap-3 d-none d-md-flex">
                            <button className="btn btn-outline-secondary btn-sm">Filter</button>
                            <button className="btn btn-primary btn-sm"><a href="/NewProduct" className="text-white text-decoration-none">New Product</a></button>
                        </div>

                        <div className="dropdown d-block d-md-none">
                            <button
                                className="btn btn-link text-primary"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-person fs-4"></i>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link to="/productlisting" className="dropdown-item"><i className="bi bi-house me-2"></i>Home</Link></li>
                                <li><Link to="/categories" className="dropdown-item"><i className="bi bi-list me-2"></i>Categories</Link></li>
                                <li><Link to="/wishlist" className="dropdown-item"><i className="bi bi-heart me-2"></i>Wishlist</Link></li>
                                <li><Link to="/cart" className="dropdown-item"><i className="bi bi-cart me-2"></i>Cart</Link></li>
                                <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person me-2"></i>Account</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header >

            {sidebarOpen && (
                <div className="overlay d-none d-md-block d-xl-none" onClick={toggleSidebar}></div>
            )}

            <main className="pt-3 pb-5 bg-light">
                <div className="container-fluid px-3">
                    <div className="d-block d-xl-flex">
                        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav  flex-column nav-pills " aria-orientation="vertical">
                                    <div className="border-bottom pb-3 mb-3">
                                        <h5 className="mb-1">Admin Panel</h5>
                                    </div>
                                    <a className="nav-link active rounded-4 mb-2" href="#"><i className="bi bi-speedometer2 me-2"></i>Dashboard</a>
                                    <a className="nav-link rounded-4 mb-2" href="/Allproducts"><i className="bi bi-box-seam me-2"></i>Products</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-basket2 me-2"></i>Orders</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-people me-2"></i>Users</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-graph-up me-2"></i>Reports</a>
                                    <a className="nav-link rounded-4 mt-2" href="/Productlisting"><i className="bi bi-shop me-2"></i>Check Store</a>
                                    <a className="nav-link rounded-4 mt-5 text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Sign Out</a>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-xl-10 offset-xl-2"> */}
                        <div className="main-content flex-grow-1">
                            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
                                <div>
                                    <h1 className="h4 mb-1">Dashboard Overview</h1>
                                    <p className="text-muted mb-0">Welcome back, {firstName}. Here’s what’s happening with Mutpel today.</p>
                                </div>

                            </div>

                            {/* ================= BUSINESS OVERVIEW ================= */}
                            <div className="row g-3 mb-4">

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Total Orders</p>
                                        <h2 className="h4 mb-0">{stats.totalOrders}</h2>
                                        <small className="text-muted">All-time orders</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Pending Orders</p>
                                        <h2 className="h4 mb-0">{stats.pendingOrders}</h2>
                                        <small className="text-warning">Awaiting processing</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Completed Orders</p>
                                        <h2 className="h4 mb-0">{stats.completedOrders}</h2>
                                        <small className="text-success">Successfully delivered</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Total Customers</p>
                                        <h2 className="h4 mb-0">{stats.totalUsers}</h2>
                                        <small className="text-muted">Registered customers</small>
                                    </div>
                                </div>

                            </div>

                            {/* ================= REVENUE ================= */}

                            <div className="row g-3 mb-4">

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Revenue Today</p>
                                        <h2 className="h4 mb-0">₦{stats.revenueToday?.toLocaleString()}</h2>
                                        <small className="text-success">Today's earnings</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Revenue This Month</p>
                                        <h2 className="h4 mb-0">₦{stats.revenueThisMonth?.toLocaleString()}</h2>
                                        <small className="text-primary">Current month</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Revenue This Year</p>
                                        <h2 className="h4 mb-0">₦{stats.revenueThisYear?.toLocaleString()}</h2>
                                        <small className="text-info">Current year</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Lifetime Revenue</p>
                                        <h2 className="h4 mb-0">₦{stats.totalRevenue?.toLocaleString()}</h2>
                                        <small className="text-success">All-time earnings</small>
                                    </div>
                                </div>

                            </div>

                            {/* ================= STORE PERFORMANCE ================= */}

                            <div className="row g-3 mb-5">

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Products Sold</p>
                                        <h2 className="h4 mb-0">{stats.productsSold}</h2>
                                        <small className="text-muted">Units sold</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Average Order Value</p>
                                        <h2 className="h4 mb-0">₦{stats.averageOrderValue?.toLocaleString()}</h2>
                                        <small className="text-muted">Per order</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Active Products</p>
                                        <h2 className="h4 mb-0">{stats.totalProducts}</h2>
                                        <small className="text-muted">Available products</small>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-3">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Categories</p>
                                        <h2 className="h4 mb-0">{stats.totalCategories}</h2>
                                        <small className="text-muted">Product categories</small>
                                    </div>
                                </div>

                            </div>



                            <div className="admin-card  mb-4" style={{ minWidth: 0 }}>

                                <div className="p-2 border-bottom d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="h6 mb-0">Recent Orders</h2>
                                    <div className='d-flex gap-2'>
                                        <button className="btn btn-outline-secondary btn-sm">Filter</button>
                                        <a href="#" className="btn btn-primary btn-sm">View All Orders</a>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#ORD-823</td><td>Clarine Adebayo</td><td>2026-05-12</td><td>₦25,500</td><td><span className="badge bg-success">Delivered</span></td><td>
                                                    <select>

                                                        <option value="Pending">Pending</option>
                                                        <option value="Progress">Delivered</option>
                                                        <option value="Resolved">Cancelled</option>

                                                    </select>
                                                </td><td><button className="btn btn-sm"><i className="bi bi-trash" ></i></button></td></tr>
                                            <tr><td>#ORD-821</td><td>Chioma Okoro</td><td>2026-05-11</td><td>₦21,200</td><td><span className="badge bg-warning">Pending</span></td><td>
                                                <select>

                                                    <option value="Pending">Pending</option>
                                                    <option value="Progress">Delivered</option>
                                                    <option value="Resolved">Cancelled</option>

                                                </select>
                                            </td><td><button className="btn btn-sm"><i className="bi bi-trash" ></i></button></td>
                                            </tr>
                                            <tr><td>#ORD-818</td><td>Ibrahim Musa</td><td>2026-05-10</td><td>₦30,000</td><td><span className="badge bg-info text-dark">Processing</span></td><td>
                                                <select>

                                                    <option value="Pending">Pending</option>
                                                    <option value="Progress">Delivered</option>
                                                    <option value="Resolved">Cancelled</option>

                                                </select>
                                            </td><td><button className="btn btn-sm"><i className="bi bi-trash" ></i></button></td></tr>
                                            <tr><td>#ORD-814</td><td>Fatima Yusuf</td><td>2026-05-09</td><td>₦25,000</td><td><span className="badge bg-success">Delivered</span></td><td>
                                                <select>

                                                    <option value="Pending">Pending</option>
                                                    <option value="Progress">Delivered</option>
                                                    <option value="Resolved">Cancelled</option>

                                                </select>
                                            </td><td><button className="btn btn-sm"><i className="bi bi-trash" ></i></button></td></tr>
                                            <tr><td>#ORD-809</td><td>Emeka Nwosu</td><td>2026-05-08</td><td>₦18,200</td><td><span className="badge bg-danger">Cancelled</span></td><td>
                                                <select>

                                                    <option value="Pending">Pending</option>
                                                    <option value="Progress">Delivered</option>
                                                    <option value="Resolved">Cancelled</option>

                                                </select>
                                            </td><td><button className="btn btn-sm"><i className="bi bi-trash" ></i></button></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="admin-card  mt-5" style={{ minWidth: 0 }}>

                                <div className='d-flex justify-content-between'>
                                    <h2 className="h6 mb-4">Product Management</h2>
                                    <div > <a href="/AllProducts" className="text-primary" >View All products</a></div>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th>Product</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Actions</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>{products.map((product) => (
                                            <tr key={product._id} style={{ cursor: 'pointer', }} onClick={() => window.location.href = `/productdetail/${product._id}`}>
                                                < td > {product.title}</td>
                                                <td>{product.category.title}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stockCount} units</td>
                                                <td>
                                                    <Link
                                                        to={`/editProduct/${product._id}`}
                                                        className="btn btn-warning flex-fill"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger flex-fill"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(product._id);
                                                        }}><i className="bi bi-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main >
            <footer className="mt-5 text-center text-muted small mb-4 py-4">
                © 2026 Mutpel. All rights reserved.
            </footer>
            <AdminMobileBottomNav />

        </>
    );
};
export default Admindashboard;