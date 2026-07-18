import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import Header from "../components/Header.jsx";
import Helpcenter from "../components/Helpcenter.jsx";

const Orderspage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const fetchOrders = async () => {
        try {
            const response = await Axios.get("/api/orders/my-orders");

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

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {

            const matchesStatus =
                filter === "All" ||
                order.orderStatus === filter;

            const matchesSearch =
                order.paymentReference
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [orders, filter, search]);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (o) => o.orderStatus === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        (o) => o.orderStatus === "Delivered"
    ).length;

    return (
        <>
            <Helpcenter />
            <Header />

            <main className="py-5">

                <div className="container">

                    {/* Header */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body">

                            <h2 className="fw-bold mb-2">
                                My Orders
                            </h2>

                            <p className="text-muted mb-0">
                                View and track all your orders in one place.
                            </p>

                        </div>

                    </div>


                    <div className="row g-3 mb-4">

                        <div className="col-md-4">

                            <div className="card border-0 shadow rounded-4">

                                <div className="card-body text-center">

                                    <i className="bi bi-bag-check fs-2 text-primary"></i>

                                    <h3 className="fw-bold mt-3">
                                        {totalOrders}
                                    </h3>

                                    <small className="text-muted">
                                        Total Orders
                                    </small>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card border-0 shadow rounded-4">

                                <div className="card-body text-center">

                                    <i className="bi bi-clock-history fs-2 text-warning"></i>

                                    <h3 className="fw-bold mt-3">
                                        {pendingOrders}
                                    </h3>

                                    <small className="text-muted">
                                        Pending
                                    </small>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card border-0 shadow rounded-4">

                                <div className="card-body text-center">

                                    <i className="bi bi-check-circle fs-2 text-success"></i>

                                    <h3 className="fw-bold mt-3">
                                        {deliveredOrders}
                                    </h3>

                                    <small className="text-muted">
                                        Delivered
                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by payment reference..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-4">

                        {[
                            "All",
                            "Pending",
                            "Confirmed",
                            "Processing",
                            "Shipped",
                            "Delivered",
                            "Cancelled",
                        ].map((status) => (

                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`btn rounded-pill ${filter === status
                                    ? "btn-primary"
                                    : "btn-outline-secondary"
                                    }`}
                            >
                                {status}
                            </button>

                        ))}

                    </div>



                    {/* Loading */}

                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p className="text-muted mt-3">
                                Loading your orders...
                            </p>

                        </div>

                    ) : filteredOrders.length === 0 ? (

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body text-center py-5">

                                <i
                                    className="bi bi-bag-x text-secondary"
                                    style={{ fontSize: "5rem" }}
                                ></i>

                                <h3 className="mt-4">
                                    No Orders Found
                                </h3>

                                <p className="text-muted">

                                    {search || filter !== "All"
                                        ? "No orders match your search."
                                        : "You haven't placed any orders yet."}

                                </p>

                                <Link
                                    to="/productlisting"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    Start Shopping
                                </Link>

                            </div>

                        </div>

                    ) : (

                        filteredOrders.map((order) => (

                            <div
                                key={order._id}
                                className="card border-0 shadow rounded-4 mb-4"
                            >

                                <div className="card-body p-4">

                                    {/* Header */}

                                    <div className="d-flex justify-content-between align-items-start flex-wrap">

                                        <div>

                                            <h5 className="fw-bold mb-1">

                                                Order #

                                                {order.paymentReference
                                                    ?.toUpperCase()}

                                            </h5>

                                            <small className="text-muted">

                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString(
                                                    "en-NG",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )}

                                            </small>

                                        </div>

                                        <div className="text-end">

                                            <span
                                                className={`badge px-3 py-2 ${order.paymentStatus === "Paid"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                    }`}
                                            >

                                                {order.paymentStatus}

                                            </span>

                                            <br />

                                            <span
                                                className={`badge mt-2 px-3 py-2 ${order.orderStatus === "Pending"
                                                    ? "bg-warning text-dark"
                                                    : order.orderStatus === "Processing"
                                                        ? "bg-info text-dark"
                                                        : order.orderStatus === "Shipped"
                                                            ? "bg-primary"
                                                            : order.orderStatus === "Delivered"
                                                                ? "bg-success"
                                                                : "bg-secondary"
                                                    }`}
                                            >

                                                {order.orderStatus}

                                            </span>

                                        </div>

                                    </div>

                                    <hr />

                                    {order.orderItems.slice(0, 2).map((item) => (

                                        <div
                                            key={item.product}
                                            className="d-flex align-items-center mb-3"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="rounded-3 border"
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            <div className="ms-3">

                                                <h6 className="mb-1">

                                                    {item.title}

                                                </h6>

                                                <small className="text-muted">

                                                    Qty: {item.quantity}

                                                </small>

                                                {item.size && (

                                                    <div>

                                                        <small className="text-muted">

                                                            Size: {item.size}

                                                        </small>

                                                    </div>

                                                )}

                                                {item.color && (

                                                    <div>

                                                        <small className="text-muted">

                                                            Color: {item.color}

                                                        </small>

                                                    </div>

                                                )}

                                            </div>

                                            <div className="ms-auto fw-bold text-primary">

                                                ₦
                                                {item.subtotal.toLocaleString()}

                                            </div>

                                        </div>

                                    ))}

                                    {order.orderItems.length > 2 && (

                                        <small className="text-primary">

                                            + {order.orderItems.length - 2} more item(s)

                                        </small>

                                    )}

                                    <hr />

                                    <div className="row">

                                        <div className="col-md-4 mb-3">

                                            <small className="text-muted">

                                                Delivery Method

                                            </small>

                                            <h6>

                                                {order.deliveryMethod}

                                            </h6>

                                        </div>

                                        <div className="col-md-4 mb-3">

                                            <small className="text-muted">

                                                Payment Reference

                                            </small>

                                            <h6
                                                style={{
                                                    fontSize: ".9rem",
                                                }}
                                            >

                                                {order.paymentReference}

                                            </h6>

                                        </div>

                                        <div className="col-md-4 mb-3 text-md-end">

                                            <small className="text-muted">

                                                Total Paid

                                            </small>

                                            <h4 className="text-primary fw-bold">

                                                ₦
                                                {order.totalAmount.toLocaleString()}

                                            </h4>

                                        </div>

                                    </div>



                                    <div className="d-flex flex-wrap gap-2 mt-3">

                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="btn btn-primary rounded-pill"
                                        >

                                            <i className="bi bi-eye me-2"></i>

                                            View Details

                                        </Link>

                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="btn btn-outline-secondary rounded-pill"
                                        >

                                            <i className="bi bi-truck me-2"></i>

                                            Track Order

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </main>

        </>

    );

};

export default Orderspage;

