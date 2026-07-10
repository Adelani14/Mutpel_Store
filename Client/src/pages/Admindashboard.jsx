
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
        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalOrders: 0,
        totalRevenue: 0,
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
    const limit = 5;

    const fetchProducts = async (currentPage) => {
        try {
            const response = await Axios.get(`/api/products?page=${currentPage}&limit=${limit}`)

            // const data = await response.json();

            setProducts(response.data);

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
            <header className="bg-white shadow-sm sticky-top" style={{ zIndex: 1100 }}>
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white"
                                style={{ width: '44px', height: '44px', cursor: 'pointer' }}
                                onClick={toggleSidebar}
                            >
                                <i className="bi bi-basket-fill fs-5"></i>
                            </div>
                            <div><h1 className="h5 mb-0 text-primary">Mutpel Admin</h1></div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-outline-secondary btn-sm">Filter</button>
                            <button className="btn btn-primary btn-sm"><a href="/NewProduct" className="text-white text-decoration-none">New Product</a></button>
                        </div>
                    </div>
                </div>
            </header>

            {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <main className="py-5 bg-light">
                <div className="container-fluid px-3">
                    <div className="d-flex ">

                        <div className={`sidebar ${sidebarOpen ? 'open' : ''} `}>
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav  flex-column nav-pills " aria-orientation="vertical">
                                    <a className="nav-link active rounded-4 mb-2" href="#"><i className="bi bi-speedometer2 me-2"></i>Dashboard</a>
                                    <a className="nav-link rounded-4 mb-2" href="/Allproducts"><i className="bi bi-box-seam me-2"></i>Products</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-basket2 me-2"></i>Orders</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-people me-2"></i>Users</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-graph-up me-2"></i>Reports</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-gear me-2"></i>Settings</a>
                                    <a className="nav-link rounded-4 mt-2" href="/Productlisting"><i className="bi bi-shop me-2"></i>Check Store</a>
                                    <button className="nav-link rounded-4 mt-5 text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Sign Out</button>
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
                            <div className="row g-3 mb-4 ">
                                <div className="col-md-3 product-card">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Total Revenue</p>
                                        <h2 className="h4 mb-0">₦{stats.totalRevenue?.toLocaleString()}</h2>
                                        <p className="text-success small mb-0">+12.4% vs last month</p>
                                    </div>
                                </div>
                                <div className="col-md-3 product-card">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Active Orders</p>
                                        <h2 className="h4 mb-0">{stats.totalOrders}</h2>
                                        <p className="text-success small mb-0">+8.7% from yesterday</p>
                                    </div>
                                </div>
                                <div className="col-md-3 product-card">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Active Products</p>
                                        <h2 className="h4 mb-0">{stats.totalProducts}</h2>
                                        <p className="text-danger small mb-0">-2.3% this week</p>
                                    </div>
                                </div>
                                <div className="col-md-3 product-card">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                        <p className="text-muted mb-2">Total Customers</p>
                                        <h2 className="h4 mb-0">{stats.totalUsers}</h2>
                                        <p className="text-success small mb-0">+4.5% growth</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row g-3 mb-4">
                                    <div className="col-lg-8">
                                        <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h2 className="h6 mb-0">Revenue & Order Volume</h2>
                                                <span className="text-muted small">Monthly growth trends for fiscal year 2024</span>
                                            </div>
                                            <div className="chart-placeholder bg-secondary-subtle rounded-4" style={{ minHeight: '280px' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                            <h2 className="h6 mb-3">Category Performance</h2>
                                            <div className="d-flex align-items-center mb-2"><span className="badge bg-primary me-2">Accessories</span><span className="text-muted">38%</span></div>
                                            <div className="d-flex align-items-center mb-2"><span className="badge bg-warning me-2">Kitchen</span><span className="text-muted">24%</span></div>
                                            <div className="d-flex align-items-center mb-2"><span className="badge bg-success me-2">Footwear</span><span className="text-muted">18%</span></div>
                                            <div className="d-flex align-items-center"><span className="badge bg-info text-dark me-2">Kids</span><span className="text-muted">20%</span></div>
                                            <div className="chart-placeholder bg-secondary-subtle rounded-4 mt-4" style={{ minHeight: '180px' }}></div>
                                        </div>
                                    </div>
                                </div> */}

                            {/* <div className="card overflow-hidden rounded-4 shadow-sm border-0 p-4 mb-4"> */}

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
                                            <tr key={product._id} style={{ cursor: 'pointer', }} onClick={() => window.location.href = `/product/${product._id}`}>
                                                < td > {product.title}</td>
                                                <td>{product.category.title}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stockCount} units</td>
                                                <td>
                                                    <button className="btn btn-outline-secondary btn-sm">Edit</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm"><i className="bi bi-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-5">
                                        <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                                            <h2 className="h6 mb-4">Quick Add</h2>
                                            <form className="row g-3">
                                                <div className="col-12"><label className="form-label">Product Name</label><input className="form-control" type="text" placeholder="e.g. Ergonomic Keyboard" /></div>
                                                <div className="col-12"><label className="form-label">Price (NGN)</label><input className="form-control" type="text" placeholder="₦" /></div>
                                                <div className="col-12"><label className="form-label">Category</label><select className="form-select"><option>Select category...</option><option>Electronics</option><option>Kitchen</option><option>Fashion</option></select></div>
                                                <div className="col-12"><label className="form-label">Brief Description</label><textarea className="form-control" rows="3"></textarea></div>
                                                <div className="col-12"><button className="btn btn-primary w-100">Add Product to Stock</button></div>
                                            </form>
                                        </div>
                                    </div> */}
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