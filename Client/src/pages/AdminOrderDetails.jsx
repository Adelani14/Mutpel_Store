import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "../utils/axiosInstance";
import AdminMobileBottomNav from '../components/AdminMobileBottomNav.jsx';

const AdminOrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("");

    const fetchOrder = async () => {

        try {

            setLoading(true);

            const response = await Axios.get(`/api/orders/${id}`);

            setOrder(response.data.order);

            setStatus(response.data.order.orderStatus);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrder();

    }, [id]);

    const updateStatus = async () => {

        try {

            await Axios.patch(

                `/api/orders/${id}/status`,

                {
                    orderStatus: status
                }

            );

            fetchOrder();

            alert("Order updated successfully.");

        } catch (error) {

            console.log(error);

            alert("Unable to update order.");

        }

    };

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">
                    Loading Order...
                </p>

            </div>

        );

    }

    return (

        <>

            <main className="py-4">

                <div className="container-fluid py-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold">

                                Order Details

                            </h2>

                            <p className="text-muted">

                                Manage customer order

                            </p>

                        </div>

                        <Link

                            to="/admin/orders"

                            className="btn btn-outline-secondary"

                        >

                            <i className="bi bi-arrow-left me-2"></i>

                            Back

                        </Link>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Customer Information

                            </h5>

                            <div className="row">

                                <div className="col-md-4">

                                    <small className="text-muted">

                                        Customer

                                    </small>

                                    <h6>

                                        {order.shippingAddress.fullName}

                                    </h6>

                                </div>

                                <div className="col-md-4">

                                    <small className="text-muted">

                                        Email

                                    </small>

                                    <h6>

                                        {order.user.email}

                                    </h6>

                                </div>

                                <div className="col-md-4">

                                    <small className="text-muted">

                                        Phone

                                    </small>

                                    <h6>

                                        {order.shippingAddress.phone}

                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Shipping Address

                            </h5>


                            <p className="mb-1">

                                {order.shippingAddress.address}

                            </p>

                            <p className="mb-1">

                                <span>City: {order.shippingAddress.city}</span>

                                {" "}

                                <span>State: {order.shippingAddress.state}</span>

                            </p>

                            {/* <p className="mb-0">

                                {order.shippingAddress.email}

                            </p> */}

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Payment

                            </h5>

                            <div className="row">

                                <div className="col-md-3">

                                    <small className="text-muted">

                                        Method

                                    </small>

                                    <h6>

                                        {order.paymentMethod}

                                    </h6>

                                </div>

                                <div className="col-md-3">

                                    <small className="text-muted me-1">

                                        Status

                                    </small>

                                    <span className="badge bg-success">

                                        {order.paymentStatus}

                                    </span>

                                </div>

                                <div className="col-md-3">

                                    <small className="text-muted">

                                        Amount

                                    </small>

                                    <h5 className="text-primary">

                                        ₦{order.totalAmount.toLocaleString()}

                                    </h5>

                                </div>

                                <div className="col-md-3">

                                    <small className="text-muted">

                                        Reference

                                    </small>

                                    <div>

                                        {order.paymentReference}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Ordered Products

                            </h5>

                            {order.orderItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="d-flex align-items-center border rounded-4 p-3 mb-3"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="rounded-3 border"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="ms-3 flex-grow-1">

                                        <h6 className="fw-bold mb-1">
                                            {item.title}
                                        </h6>

                                        <small className="text-muted">
                                            Quantity: {item.quantity}
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

                                    <div className="text-end">

                                        <small className="text-muted">
                                            Unit Price
                                        </small>

                                        <h6>
                                            ₦{item.price.toLocaleString()}
                                        </h6>

                                        <small className="text-muted">
                                            Total
                                        </small>

                                        <h5 className="text-primary fw-bold">
                                            ₦{item.subtotal.toLocaleString()}
                                        </h5>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Order Summary

                            </h5>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Items Price</span>

                                <strong>
                                    ₦{order.itemsPrice.toLocaleString()}
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Shipping Fee</span>

                                <strong>
                                    ₦{order.shippingFee.toLocaleString()}
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Discount</span>

                                <strong className="text-success">

                                    - ₦{order.discount.toLocaleString()}

                                </strong>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">

                                <h5>Total Paid</h5>

                                <h4 className="text-primary">

                                    ₦{order.totalAmount.toLocaleString()}

                                </h4>

                            </div>

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Order Management

                            </h5>

                            <div className="row align-items-end">

                                <div className="col-md-8">

                                    <label className="form-label fw-semibold">

                                        Order Status

                                    </label>

                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Confirmed">
                                            Confirmed
                                        </option>

                                        <option value="Processing">
                                            Processing
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-4 mt-3 mt-md-0">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={updateStatus}
                                    >
                                        <i className="bi bi-check2-circle me-2"></i>

                                        Update Status
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="mb-4">

                                Order Progress

                            </h5>

                            {[
                                "Pending",
                                "Confirmed",
                                "Processing",
                                "Shipped",
                                "Delivered"
                            ].map((step, index) => {

                                const completed =
                                    [
                                        "Pending",
                                        "Confirmed",
                                        "Processing",
                                        "Shipped",
                                        "Delivered",
                                    ].indexOf(order.orderStatus) >= index;

                                return (

                                    <div
                                        key={step}
                                        className="d-flex align-items-start mb-4"
                                    >

                                        <div
                                            className={`rounded-circle d-flex justify-content-center align-items-center me-3 ${completed
                                                ? "bg-success"
                                                : "bg-light border"
                                                }`}
                                            style={{
                                                width: "42px",
                                                height: "42px"
                                            }}
                                        >

                                            {completed ? (
                                                <i className="bi bi-check text-white"></i>
                                            ) : (
                                                <span className="fw-bold">
                                                    {index + 1}
                                                </span>
                                            )}

                                        </div>

                                        <div>

                                            <h6 className="mb-1">
                                                {step}
                                            </h6>

                                            <small className="text-muted">

                                                {step === "Pending" &&
                                                    "Customer has placed the order."}

                                                {step === "Confirmed" &&
                                                    "Admin has confirmed the order."}

                                                {step === "Processing" &&
                                                    "Products are being prepared."}

                                                {step === "Shipped" &&
                                                    "Order has left the store."}

                                                {step === "Delivered" &&
                                                    "Customer has received the order."}

                                            </small>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap gap-3 mb-5">

                        <button
                            className="btn btn-success"
                            onClick={updateStatus}
                        >
                            <i className="bi bi-save me-2"></i>

                            Save Changes
                        </button>

                        <Link
                            to={`/admin/orders/${order._id}/invoice`}
                            className="btn btn-dark"
                        >
                            <i className="bi bi-printer me-2"></i>
                            Print Invoice
                        </Link>

                        <Link
                            to="/admin/orders"
                            className="btn btn-outline-secondary"
                        >
                            <i className="bi bi-arrow-left me-2"></i>

                            Back to Orders
                        </Link>

                    </div>

                </div>

            </main>


            <AdminMobileBottomNav />

        </>

    );

};

export default AdminOrderDetails;