import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import Header from "../components/Header";
import Helpcenter from "../components/Helpcenter";

const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrder = async () => {
        try {
            const response = await Axios.get(`/api/orders/${id}`);

            setOrder(response.data.order);
        } catch (err) {
            console.log(err);

            setError(
                err.response?.data?.message ||
                "Unable to load order."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark";

            case "Confirmed":
                return "bg-info text-dark";

            case "Processing":
                return "bg-primary";

            case "Shipped":
                return "bg-secondary";

            case "Delivered":
                return "bg-success";

            case "Cancelled":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    const timelineSteps = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
    ];

    const currentStep =
        timelineSteps.indexOf(order?.orderStatus);

    if (loading) {
        return (
            <>
                <Helpcenter />
                <Header />

                <div className="container py-5">

                    <div className="text-center">

                        <div
                            className="spinner-border text-primary"
                            style={{
                                width: "4rem",
                                height: "4rem",
                            }}
                        ></div>

                        <h3 className="mt-4">
                            Loading Order...
                        </h3>

                        <p className="text-muted">
                            Please wait while we retrieve your order.
                        </p>

                    </div>

                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Helpcenter />
                <Header />

                <div className="container py-5">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body text-center py-5">

                            <i
                                className="bi bi-exclamation-triangle text-danger"
                                style={{
                                    fontSize: "5rem",
                                }}
                            ></i>

                            <h2 className="mt-4">
                                Something went wrong
                            </h2>

                            <p className="text-muted">
                                {error}
                            </p>

                            <Link
                                to="/orders"
                                className="btn btn-primary rounded-pill px-4"
                            >
                                Back to Orders
                            </Link>

                        </div>

                    </div>

                </div>
            </>
        );
    }

    return (
        <>
            <Helpcenter />
            <Header />

            <main className="py-5">

                <div className="container">

                    <Link
                        to="/orders"
                        className="text-decoration-none"
                    >
                        <i className="bi bi-arrow-left me-2"></i>

                        Back to Orders
                    </Link>

                    <div className="card border-0 shadow rounded-4 mt-4 mb-4">

                        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

                            <div>

                                <small className="text-muted">
                                    Order Reference
                                </small>

                                <h2 className="fw-bold">
                                    #{order.paymentReference}
                                </h2>

                                <p className="text-muted mb-0">

                                    Placed on{" "}

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

                                </p>

                            </div>

                            <div className="text-end">

                                <span
                                    className={`badge px-4 py-3 fs-6 ${getStatusClass(
                                        order.orderStatus
                                    )}`}
                                >
                                    {order.orderStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Payment Information */}

                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">
                                <i className="bi bi-credit-card me-2 text-primary"></i>
                                Payment Information
                            </h4>

                            <div className="row">

                                <div className="col-md-4 mb-3">

                                    <small className="text-muted">
                                        Payment Status
                                    </small>

                                    <h6>
                                        <span className="badge bg-success">
                                            {order.paymentStatus}
                                        </span>
                                    </h6>

                                </div>

                                <div className="col-md-4 mb-3">

                                    <small className="text-muted">
                                        Payment Method
                                    </small>

                                    <h6>
                                        {order.paymentMethod}
                                    </h6>

                                </div>

                                <div className="col-md-4 mb-3">

                                    <small className="text-muted">
                                        Payment Reference
                                    </small>

                                    <h6
                                        style={{
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {order.paymentReference}
                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Shipping Address */}

                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">
                                <i className="bi bi-geo-alt me-2 text-primary"></i>
                                Shipping Information
                            </h4>

                            <div className="row">

                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Customer
                                    </small>

                                    <h6>
                                        {order.shippingAddress.fullName}
                                    </h6>

                                    <p className="mb-1">
                                        {order.shippingAddress.phone}
                                    </p>

                                    <p className="mb-1">
                                        {order.shippingAddress.email}
                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <small className="text-muted">
                                        Delivery Address
                                    </small>

                                    <h6>
                                        {order.shippingAddress.address}
                                    </h6>

                                    <p className="mb-1">
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.state}
                                    </p>

                                    <span className="badge bg-primary mt-2">
                                        {order.deliveryMethod}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Ordered Items */}

                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">
                                <i className="bi bi-box-seam me-2 text-primary"></i>
                                Ordered Items
                            </h4>

                            {order.orderItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="d-flex align-items-center border-bottom py-3 flex-wrap"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="rounded-3 border"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div className="ms-3 flex-grow-1">

                                        <h5 className="mb-2">
                                            {item.title}
                                        </h5>

                                        <div className="text-muted">

                                            Quantity :
                                            <strong className="ms-1">
                                                {item.quantity}
                                            </strong>

                                        </div>

                                        {item.size && (

                                            <div className="text-muted">

                                                Size :
                                                <strong className="ms-1">
                                                    {item.size}
                                                </strong>

                                            </div>

                                        )}

                                        {item.color && (

                                            <div className="text-muted">

                                                Color :
                                                <strong className="ms-1">
                                                    {item.color}
                                                </strong>

                                            </div>

                                        )}

                                    </div>

                                    <div className="text-end">

                                        <h5 className="text-primary fw-bold mb-0">

                                            ₦
                                            {item.subtotal.toLocaleString()}

                                        </h5>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Order Summary */}

                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">

                                <i className="bi bi-receipt me-2 text-primary"></i>

                                Order Summary

                            </h4>

                            <div className="d-flex justify-content-between mb-3">

                                <span className="text-muted">
                                    Items Total
                                </span>

                                <strong>
                                    ₦{order.itemsPrice.toLocaleString()}
                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span className="text-muted">
                                    Shipping Fee
                                </span>

                                <strong>

                                    ₦{order.shippingFee.toLocaleString()}

                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span className="text-muted">
                                    Discount
                                </span>

                                <strong>

                                    ₦{order.discount.toLocaleString()}

                                </strong>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">

                                <h4>Total Paid</h4>

                                <h3 className="text-primary fw-bold">

                                    ₦{order.totalAmount.toLocaleString()}

                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* Order Timeline */}

                    <div className="card border-0 shadow rounded-4 mb-4">

                        <div className="card-body">

                            <h4 className="fw-bold mb-4">
                                <i className="bi bi-truck me-2 text-primary"></i>
                                Order Progress
                            </h4>

                            {timelineSteps.map((step, index) => {

                                const completed = index <= currentStep;

                                return (

                                    <div
                                        key={step}
                                        className="d-flex align-items-start mb-4"
                                    >

                                        <div className="me-3">

                                            <div
                                                className={`rounded-circle d-flex justify-content-center align-items-center ${completed
                                                    ? "bg-success"
                                                    : "bg-light border"
                                                    }`}
                                                style={{
                                                    width: "45px",
                                                    height: "45px",
                                                }}
                                            >

                                                {completed ? (

                                                    <i className="bi bi-check-lg text-white"></i>

                                                ) : (

                                                    <span className="fw-bold">
                                                        {index + 1}
                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                        <div>

                                            <h6 className="mb-1">
                                                {step}
                                            </h6>

                                            <small className="text-muted">

                                                {step === "Pending" &&
                                                    "We've received your order successfully."}

                                                {step === "Confirmed" &&
                                                    "Our team has confirmed your order."}

                                                {step === "Processing" &&
                                                    "Your items are currently being packaged."}

                                                {step === "Shipped" &&
                                                    "Your package is on its way."}

                                                {step === "Delivered" &&
                                                    "Your order has been delivered successfully."}

                                            </small>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                    {/* Delivery Notice */}

                    <div className="card border-0 bg-light rounded-4 mb-4">

                        <div className="card-body">

                            <h5 className="fw-bold mb-3">

                                <i className="bi bi-info-circle me-2 text-primary"></i>

                                Delivery Information

                            </h5>

                            {order.deliveryMethod === "Pickup" && (

                                <p className="mb-0 text-muted">

                                    We'll notify you once your order is ready for pickup at our store.

                                </p>

                            )}

                            {order.deliveryMethod === "Home Delivery" && (

                                <p className="mb-0 text-muted">

                                    Your order will be delivered to your provided address. Please keep your phone available so our delivery personnel can reach you.

                                </p>

                            )}

                            {order.deliveryMethod === "Interstate Delivery" && (

                                <p className="mb-0 text-muted">

                                    Our team will contact you after processing your order to arrange interstate delivery through our trusted transport partners.

                                </p>

                            )}

                        </div>

                    </div>

                    {/* Need Help */}

                    <div className="card border-0 shadow rounded-4 mb-5">

                        <div className="card-body text-center">

                            <i
                                className="bi bi-headset text-primary"
                                style={{
                                    fontSize: "3rem",
                                }}
                            ></i>

                            <h4 className="mt-3">
                                Need Help?
                            </h4>

                            <p className="text-muted">

                                If you have any questions regarding this order, our support team is always ready to help.

                            </p>

                            <Link
                                to="/contact"
                                className="btn btn-outline-primary rounded-pill px-4"
                            >

                                Contact Support

                            </Link>

                        </div>

                    </div>

                    {/* Bottom Buttons */}

                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">

                        <Link
                            to="/orders"
                            className="btn btn-outline-secondary btn-lg rounded-pill px-4"
                        >

                            <i className="bi bi-arrow-left me-2"></i>

                            Back to Orders

                        </Link>

                        <Link
                            to="/productlisting"
                            className="btn btn-primary btn-lg rounded-pill px-4"
                        >

                            <i className="bi bi-bag me-2"></i>

                            Continue Shopping

                        </Link>

                    </div>

                </div>

            </main>

        </>

    );
};

export default OrderDetails;