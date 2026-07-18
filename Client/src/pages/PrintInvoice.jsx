import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/axiosInstance";

const PrintInvoice = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const response = await Axios.get(`/api/orders/${id}`);
            setOrder(response.data.order);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        document.title = `Invoice ${order?._id?.slice(-6) || ""}`;
    }, [order]);

    useEffect(() => {
        if (!loading && order) {
            setTimeout(() => {
                window.print();
            }, 600);
        }
    }, [loading, order]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Preparing Invoice...</p>
            </div>
        );
    }
    return (
        <>
            <div
                className="container py-5"
                style={{
                    maxWidth: "900px",
                    background: "#fff",
                }}
            >

                {/* Print Buttons */}

                <div className="d-flex justify-content-end gap-2 mb-4 no-print">

                    <button
                        className="btn btn-primary"
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer me-2"></i>
                        Print Invoice
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => window.history.back()}
                    >
                        Back
                    </button>

                </div>

                {/* Company */}

                <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">

                    <div className="d-flex align-items-center">

                        <img
                            src="/mutpellogo.png"
                            alt="Mutpel"
                            style={{
                                width: "75px"
                            }}
                        />

                        <div className="ms-3">

                            <h2 className="fw-bold text-primary mb-1">
                                MUTPEL HOUSEHOLD
                            </h2>

                            <p className="text-muted mb-0">
                                Sales Invoice
                            </p>

                        </div>

                    </div>

                    <div className="text-end">

                        <h4 className="fw-bold">
                            Invoice
                        </h4>

                        <small className="text-muted">
                            INV-{order._id.slice(-6).toUpperCase()}
                        </small>

                    </div>

                </div>

                {/* Invoice Info */}

                <div className="row mb-5">

                    <div className="col-md-6">

                        <h6 className="fw-bold">
                            Bill To
                        </h6>

                        <p className="mb-1">
                            {order.shippingAddress.fullName}
                        </p>

                        <p className="mb-1">
                            {order.shippingAddress.email}
                        </p>

                        <p className="mb-1">
                            {order.shippingAddress.phone}
                        </p>

                        <p className="mb-1">
                            {order.shippingAddress.address}
                        </p>

                        <p className="mb-1">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>

                    </div>

                    <div className="col-md-6 text-md-end">

                        <p className="mb-1">

                            <strong>Date:</strong>{" "}

                            {new Date(order.createdAt).toLocaleDateString("en-NG", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}

                        </p>

                        <p className="mb-1">

                            <strong>Payment:</strong>{" "}

                            {order.paymentMethod}

                        </p>

                        <p className="mb-1">

                            <strong>Status:</strong>{" "}

                            {order.paymentStatus}

                        </p>

                        <p className="mb-1">

                            <strong>Paid On:</strong>{" "}

                            {new Date(order.paidAt).toLocaleDateString("en-NG", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}

                        </p>

                        <div className="col-md-3">

                            <small className="text-muted">
                                Payment Method
                            </small>

                            <h6>
                                {order.paymentMethod}
                            </h6>

                        </div>

                        <div className="col-md-3">

                            <small className="text-muted">
                                Payment Status
                            </small>

                            <h6 className="text-success">
                                {order.paymentStatus}
                            </h6>

                        </div>

                        <div className="col-md-3">

                            <small className="text-muted">
                                Delivery
                            </small>

                            <h6>
                                {order.deliveryMethod}
                            </h6>

                        </div>

                        <div className="col-md-3">

                            <small className="text-muted">
                                Order Status
                            </small>

                            <h6>
                                {order.orderStatus}
                            </h6>

                        </div>

                    </div>

                </div>

                {/* Shipping */}

                <div className="mb-5">

                    <h6 className="fw-bold mb-3">
                        Shipping Address
                    </h6>

                    <p className="mb-1">
                        {order.shippingAddress.address}
                    </p>

                    <p className="mb-1">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                    </p>

                    <p className="mb-0">
                        {order.deliveryMethod}
                    </p>

                </div>

                {/* Order Items */}

                <div className="mb-5">

                    <h5 className="fw-bold mb-3">
                        Order Items
                    </h5>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>Item</th>

                                    <th>Price</th>

                                    <th>Qty</th>

                                    <th className="text-end">
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {order.orderItems.map((item) => (

                                    <tr key={item.product}>

                                        <td>

                                            <div className="d-flex align-items-center">

                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="rounded border me-3"
                                                    style={{
                                                        width: "70px",
                                                        height: "70px",
                                                        objectFit: "cover"
                                                    }}
                                                />

                                                <div>

                                                    <h6 className="mb-1">
                                                        {item.title}
                                                    </h6>

                                                    {item.size && (
                                                        <small className="text-muted d-block">
                                                            Size: {item.size}
                                                        </small>
                                                    )}

                                                    {item.color && (
                                                        <small className="text-muted">
                                                            Color: {item.color}
                                                        </small>
                                                    )}

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            ₦{item.price.toLocaleString()}

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td className="text-end fw-bold">

                                            ₦{item.subtotal.toLocaleString()}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Order Summary */}

                <div className="row justify-content-end mb-5">

                    <div className="col-md-5">

                        <table className="table">

                            <tbody>

                                <tr>

                                    <td>Items Total</td>

                                    <td className="text-end">

                                        ₦{order.itemsPrice.toLocaleString()}

                                    </td>

                                </tr>

                                <tr>

                                    <td>Shipping Fee</td>

                                    <td className="text-end">

                                        ₦{order.shippingFee.toLocaleString()}

                                    </td>

                                </tr>

                                <tr>

                                    <td>Discount</td>

                                    <td className="text-end text-success">

                                        -₦{order.discount.toLocaleString()}

                                    </td>

                                </tr>

                                <tr className="table-primary">

                                    <th>Total Paid</th>

                                    <th className="text-end">

                                        ₦{order.totalAmount.toLocaleString()}

                                    </th>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Payment Information */}

                <div className="card border-0 bg-light rounded-4 mb-4">

                    <div className="card-body">

                        <h5 className="fw-bold mb-3">

                            Payment Information

                        </h5>

                        <div className="row">

                            <div className="col-md-4">

                                <small className="text-muted">
                                    Payment Method
                                </small>

                                <h6>
                                    {order.paymentMethod}
                                </h6>

                            </div>

                            <div className="col-md-4">

                                <small className="text-muted">
                                    Payment Status
                                </small>

                                <h6 className="text-success">
                                    {order.paymentStatus}
                                </h6>

                            </div>

                            <div className="col-md-4">

                                <small className="text-muted">
                                    Order Status
                                </small>

                                <h6>

                                    {order.orderStatus}

                                </h6>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="text-center mt-5 pt-4 border-top">

                    <h4 className="fw-bold text-primary mb-3">
                        Thank You For Your Purchase!
                    </h4>

                    <p className="text-muted">

                        Your payment has been received successfully.
                        We appreciate your trust in
                        <strong> Mutpel Household</strong>.

                    </p>

                    <p className="text-muted">

                        If you have any questions regarding your order,
                        kindly contact our customer support.

                    </p>

                    <hr />

                    <small className="text-secondary">

                        This invoice was automatically generated by
                        Mutpel Household.

                    </small>

                </div>
            </div>
        </>
    )
}
export default PrintInvoice;