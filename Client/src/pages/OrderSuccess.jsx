import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Helpcenter from "../components/Helpcenter";

const OrderSuccess = () => {
    const location = useLocation();

    const order = location.state?.order;

    return (
        <>
            <Helpcenter />
            <Header />

            <main className="py-5">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-lg-8">

                            {/* Success Card */}
                            <div className="card border-0 shadow rounded-4 mb-4">
                                <div className="card-body p-5 text-center">

                                    <div
                                        className="bg-success bg-opacity-10 rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                                        style={{
                                            width: "90px",
                                            height: "90px"
                                        }}
                                    >
                                        <i
                                            className="bi bi-check-circle-fill text-success"
                                            style={{
                                                fontSize: "3.5rem"
                                            }}
                                        ></i>
                                    </div>

                                    <h2 className="fw-bold mb-2">
                                        🎉 Thank You,
                                        {" "}
                                        {order?.shippingAddress?.fullName}!
                                    </h2>

                                    <h4 className="text-success mb-3">
                                        Order Placed Successfully
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Your payment has been received successfully.
                                        <br />
                                        Our team will begin processing your order shortly.
                                    </p>

                                </div>
                            </div>

                            {/* Status Cards */}

                            <div className="card border-0 shadow rounded-4 mb-4">
                                <div className="card-body">

                                    <div className="row g-3">

                                        <div className="col-md-4">
                                            <div className="border rounded-4 p-3 text-center h-100">

                                                <i className="bi bi-wallet2 text-success fs-1"></i>

                                                <h6 className="mt-3">
                                                    Payment
                                                </h6>

                                                <span className="badge rounded-pill bg-success px-3 py-2">
                                                    Paid
                                                </span>

                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="border rounded-4 p-3 text-center h-100">

                                                <i className="bi bi-box-seam text-primary fs-1"></i>

                                                <h6 className="mt-3">
                                                    Order
                                                </h6>

                                                <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
                                                    Pending Confirmation
                                                </span>

                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="border rounded-4 p-3 text-center h-100">

                                                <i className="bi bi-truck text-info fs-1"></i>

                                                <h6 className="mt-3">
                                                    Delivery
                                                </h6>

                                                <span className="badge rounded-pill bg-info text-dark px-3 py-2">
                                                    {order?.deliveryMethod}
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Order Details */}

                            <div className="card border-0 shadow rounded-4 mb-4">

                                <div className="card-body">

                                    <h5 className="fw-bold mb-4">
                                        Order Information
                                    </h5>

                                    <div className="row">

                                        <div className="col-md-6 mb-4">

                                            <small className="text-muted">
                                                <i className="bi bi-hash me-2 text-primary"></i>

                                                Order Number
                                            </small>

                                            <h6 className="fw-bold">
                                                #{order?._id?.slice(-8).toUpperCase()}
                                            </h6>

                                        </div>

                                        <div className="col-md-6 mb-4">

                                            <small className="text-muted">
                                                <i className="bi bi-credit-card me-2 text-primary"></i>

                                                Payment Reference
                                            </small>

                                            <h6 className="fw-bold">
                                                {order?.paymentReference}
                                            </h6>

                                        </div>

                                        <div className="col-md-6 mb-4">

                                            <small className="text-muted">
                                                <i className="bi bi-cash-stack me-2 text-primary"></i>

                                                Amount Paid
                                            </small>

                                            <h5 className="text-success fw-bold">
                                                ₦{order?.totalAmount?.toLocaleString()}
                                            </h5>

                                        </div>

                                        <div className="col-md-6 mb-4">

                                            <small className="text-muted">
                                                <i className="bi bi-truck me-2 text-primary"></i>

                                                Delivery Method
                                            </small>

                                            <h6 className="fw-bold">
                                                {order?.deliveryMethod}
                                            </h6>

                                        </div>

                                        <div className="col-12">

                                            <small className="text-muted">
                                                <i className="bi bi-geo-alt me-2 text-primary"></i>

                                                Delivery Address
                                            </small>

                                            <h6 className="mb-1">
                                                {order?.shippingAddress?.address}
                                            </h6>

                                            <small className="text-muted">
                                                {order?.shippingAddress?.city},
                                                {" "}
                                                {order?.shippingAddress?.state}
                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Estimated Delivery */}

                            <div className="alert alert-info rounded-4 mb-4">

                                <i className="bi bi-clock-history me-2"></i>

                                <strong>Estimated Delivery:</strong>

                                {order?.deliveryMethod === "Pickup" &&
                                    " Within 24 hours after confirmation."}

                                {order?.deliveryMethod === "Home Delivery" &&
                                    " 1 - 3 business days."}

                                {order?.deliveryMethod === "Interstate Delivery" &&
                                    " 3 - 7 business days depending on your location."}

                            </div>

                            {/* Email */}

                            <div className="alert alert-success rounded-4 mb-4">

                                <i className="bi bi-envelope-check me-2"></i>

                                A confirmation email will be sent to

                                <strong>
                                    {" "}
                                    {order?.shippingAddress?.email}
                                </strong>

                            </div>

                            {/* Timeline */}

                            <div className="card border-0 bg-light rounded-4">

                                <div className="card-body">

                                    <h5 className="fw-bold mb-4">
                                        <i className="bi bi-list-check me-2 text-primary"></i>

                                        What Happens Next?
                                    </h5>

                                    <div className="d-flex mb-4">

                                        <div className="me-3">

                                            <div
                                                className="bg-success rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <i className="bi bi-check-lg text-white"></i>
                                            </div>

                                        </div>

                                        <div>

                                            <h6>Payment Received</h6>

                                            <small className="text-muted">
                                                We've successfully received your payment.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-4">

                                        <div className="me-3">

                                            <div
                                                className="bg-warning rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    2
                                                </span>
                                            </div>

                                        </div>

                                        <div>

                                            <h6>Order Confirmation</h6>

                                            <small className="text-muted">
                                                Our team will review and confirm your order.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-4">

                                        <div className="me-3">

                                            <div
                                                className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    3
                                                </span>
                                            </div>

                                        </div>

                                        <div>

                                            <h6>Processing</h6>

                                            <small className="text-muted">
                                                Your order will be packaged carefully.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex">

                                        <div className="me-3">

                                            <div
                                                className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    4
                                                </span>
                                            </div>

                                        </div>

                                        <div>

                                            <h6>

                                                {order?.deliveryMethod === "Pickup"
                                                    ? "Ready For Pickup"
                                                    : "Delivery"}

                                            </h6>

                                            <small className="text-muted">

                                                {order?.deliveryMethod === "Pickup" &&
                                                    "We'll notify you once your order is ready for pickup."}

                                                {order?.deliveryMethod === "Home Delivery" &&
                                                    "Your order will be delivered to your selected address."}

                                                {order?.deliveryMethod === "Interstate Delivery" &&
                                                    "We'll contact you before dispatching through our transport partner."}

                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Buttons */}

                            <div className="d-grid gap-3 d-md-flex justify-content-center mt-5">

                                <Link
                                    to="/orders"
                                    className="btn btn-primary btn-lg"
                                >
                                    <i className="bi bi-box-seam me-2"></i>

                                    Track My Orders
                                </Link>

                                <Link
                                    to="/productlisting"
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Continue Shopping
                                </Link>

                                <Link
                                    to="/"
                                    className="btn btn-outline-primary btn-lg"
                                >
                                    <i className="bi bi-headset me-2"></i>

                                    Contact Support
                                </Link>

                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
};

export default OrderSuccess;