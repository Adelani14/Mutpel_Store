import Axios from '../utils/axiosInstance.js'
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";



const AdminOrderPage = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");




    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await Axios.get("/api/orders");

            setOrders(response.data.orders || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);



    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        order => order.orderStatus === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        order => order.orderStatus === "Delivered"
    ).length;

    const totalRevenue = orders
        .filter(order => order.paymentStatus === "Paid")
        .reduce((sum, order) => sum + order.totalAmount, 0);


    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

            const keyword = search.toLowerCase();

            const matchesSearch =
                order.paymentReference?.toLowerCase().includes(keyword) ||

                order.user?.fullName?.toLowerCase().includes(keyword) ||

                order.user?.email?.toLowerCase().includes(keyword);

            const matchesFilter =
                filter === "All" ||
                order.orderStatus === filter;

            return matchesSearch && matchesFilter;

        });

    }, [orders, search, filter]);



    return (
        <>
            <main className="py-4">

                <div className="container-fluid">

                    {/* Header */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">

                            <div>

                                <h2 className="fw-bold mb-2">
                                    Orders Management
                                </h2>

                                <p className="text-muted mb-0">
                                    View and manage every customer order.
                                </p>

                            </div>

                            <button
                                className="btn btn-primary mt-3 mt-lg-0"
                                onClick={fetchOrders}
                            >
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Refresh Orders
                            </button>

                        </div>

                    </div>

                    {/* Statistics */}

                    <div className="row g-3 mb-4">

                        <div className="col-md-6 col-xl-3">

                            <div className="card border-0 shadow rounded-4 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <small className="text-muted">
                                                Total Orders
                                            </small>

                                            <h2 className="fw-bold mt-2">
                                                {totalOrders}
                                            </h2>

                                        </div>

                                        <div
                                            className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            <i className="bi bi-bag-check text-primary fs-3"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 col-xl-3">

                            <div className="card border-0 shadow rounded-4 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <small className="text-muted">
                                                Pending
                                            </small>

                                            <h2 className="fw-bold mt-2">
                                                {pendingOrders}
                                            </h2>

                                        </div>

                                        <div
                                            className="rounded-circle bg-warning bg-opacity-10 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            <i className="bi bi-clock-history text-warning fs-3"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 col-xl-3">

                            <div className="card border-0 shadow rounded-4 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <small className="text-muted">
                                                Delivered
                                            </small>

                                            <h2 className="fw-bold mt-2">
                                                {deliveredOrders}
                                            </h2>

                                        </div>

                                        <div
                                            className="rounded-circle bg-success bg-opacity-10 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            <i className="bi bi-check-circle text-success fs-3"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 col-xl-3">

                            <div className="card border-0 shadow rounded-4 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <small className="text-muted">
                                                Revenue
                                            </small>

                                            <h4 className="fw-bold mt-2 text-primary">
                                                ₦{totalRevenue.toLocaleString()}
                                            </h4>

                                        </div>

                                        <div
                                            className="rounded-circle bg-info bg-opacity-10 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            <i className="bi bi-cash-stack text-info fs-3"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search & Filter */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body">

                            <div className="row g-3">

                                <div className="col-lg-7">

                                    <div className="input-group">

                                        <span className="input-group-text bg-white">
                                            <i className="bi bi-search"></i>
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by customer or payment reference..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />

                                    </div>

                                </div>

                                <div className="col-lg-5">

                                    <select
                                        className="form-select"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="All">All Orders</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Loading */}

                    {loading ? (

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body text-center py-5">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="text-muted mt-3 mb-0">
                                    Loading orders...
                                </p>

                            </div>

                        </div>

                    ) : filteredOrders.length === 0 ? (

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-inbox display-1 text-secondary"
                                ></i>

                                <h4 className="mt-3">
                                    No Orders Found
                                </h4>

                                <p className="text-muted mb-0">
                                    No customer orders match your search.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-header bg-white d-flex justify-content-between align-items-center">

                                <h5 className="mb-0">
                                    Customer Orders
                                </h5>

                                <span className="badge bg-primary">
                                    {filteredOrders.length} Orders
                                </span>

                            </div>

                            <div className="card-body p-0">

                                <div className="table-responsive">


                                    <table className="table table-hover align-middle mb-0">

                                        <thead>

                                            <tr>
                                                <th>#</th>
                                                <th>Customer</th>

                                                <th>Reference</th>

                                                <th>Total</th>

                                                <th>Payment</th>

                                                <th>Status</th>

                                                <th>Date</th>

                                                <th></th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {filteredOrders.map((order, index) => (

                                                <tr key={order._id}>
                                                    <td>{index + 1}</td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {order.user?.fullName}
                                                        </div>

                                                        <small className="text-muted">
                                                            {order.user?.email}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <span
                                                            style={{
                                                                fontSize: ".85rem"
                                                            }}
                                                        >
                                                            {order.paymentReference.slice(0, 10)}...
                                                        </span>

                                                    </td>

                                                    <td className="fw-bold text-primary">

                                                        ₦
                                                        {order.totalAmount.toLocaleString()}

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${order.paymentStatus === "Paid"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                                }`}
                                                        >
                                                            {order.paymentStatus}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${order.orderStatus === "Pending"
                                                                ? "bg-warning text-dark"
                                                                : order.orderStatus === "Confirmed"
                                                                    ? "bg-primary"
                                                                    : order.orderStatus === "Processing"
                                                                        ? "bg-info text-dark"
                                                                        : order.orderStatus === "Shipped"
                                                                            ? "bg-secondary"
                                                                            : order.orderStatus === "Delivered"
                                                                                ? "bg-success"
                                                                                : "bg-danger"
                                                                }`}
                                                        >
                                                            {order.orderStatus}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        {new Date(order.createdAt).toLocaleDateString("en-NG", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}

                                                    </td>

                                                    <td>

                                                        <Link
                                                            to={`/orders/${order._id}`}
                                                            className="btn btn-sm btn-primary rounded-pill"
                                                        >
                                                            <i className="bi bi-eye me-1"></i>
                                                            View
                                                        </Link>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>


                    )}

                </div>
            </main>
        </>
    )
}

export default AdminOrderPage;