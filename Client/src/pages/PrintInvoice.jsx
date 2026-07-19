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
                className="container bg-white shadow-sm rounded-4 p-5 my-4"
                style={{
                    maxWidth: "850px",
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

                

                {/* ================= Header ================= */}

                <div className="border-bottom pb-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center">

                        <div className="d-flex align-items-center">

                            <img
                                src="/icons/logo.png"
                                alt="Mutpel Household"
                                className="bg-primary rounded"
                                style={{
                                    width: 70,
                                    height: 70,
                                    objectFit: "contain"
                                }}
                            />

                            <div className="ms-3">

                                <h2 className="fw-bold text-primary mb-0">
                                    MUTPEL HOUSEHOLD
                                </h2>

                                <small className="text-muted">
                                    Sales Invoice
                                </small>

                            </div>

                        </div>

                        <div className="text-end">

                            <h3 className="fw-bold mb-2">
                                INVOICE
                            </h3>

                            <p className="mb-1">
                                <strong>#</strong> INV-{order._id.slice(-6).toUpperCase()}
                            </p>

                            <p className="mb-1">
                                {new Date(order.createdAt).toLocaleDateString("en-NG", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>

                            <span
                                className={`badge ${order.paymentStatus === "paid"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                    }`}
                            >
                                {order.paymentStatus.toUpperCase()}
                            </span>

                        </div>

                    </div>
                </div>

                {/* ================= Customer ================= */}

                <div className="row mb-5">

                    <div className="col-md-8">

                        <h6 className="text-uppercase fw-bold text-secondary mb-3">
                            Bill To
                        </h6>

                        <h5 className="fw-semibold mb-1">
                            {order.shippingAddress.fullName}
                        </h5>

                        <p className="mb-1">
                            {order.shippingAddress.phone}
                        </p>

                        <p className="mb-1">
                            {order.shippingAddress.email}
                        </p>

                        <p className="mb-0">
                            {order.shippingAddress.address}
                            <br />
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}
                        </p>

                    </div>

                    <div className="col-md-4 text-md-end mt-4 mt-md-0">

                        <div className="mb-3">

                            <small className="text-muted d-block">
                                Payment
                            </small>

                            <strong>
                                {order.paymentMethod}
                            </strong>

                        </div>

                        <div>

                            <small className="text-muted d-block">
                                Delivery
                            </small>

                            <strong>
                                {order.deliveryMethod}
                            </strong>

                        </div>

                    </div>

                </div>

                {/* ================= Items ================= */}

                <h5 className="fw-bold mb-3">
                    Order Items
                </h5>

                <div className="table-responsive mb-5">

                    <table className="table align-middle">

                        <thead className="table-light">

                            <tr>

                                <th>Item</th>

                                <th className="text-center">
                                    Qty
                                </th>

                                <th className="text-end">
                                    Price
                                </th>

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
                                                className="border rounded me-3"
                                                style={{
                                                    width: 55,
                                                    height: 55,
                                                    objectFit: "cover"
                                                }}
                                            />

                                            <div>

                                                <div className="fw-semibold">
                                                    {item.title}
                                                </div>

                                                {(item.size || item.color) && (

                                                    <small className="text-muted">

                                                        {item.size && `Size: ${item.size}`}

                                                        {item.size && item.color && " • "}

                                                        {item.color && `Color: ${item.color}`}

                                                    </small>

                                                )}

                                            </div>

                                        </div>

                                    </td>

                                    <td className="text-center">
                                        {item.quantity}
                                    </td>

                                    <td className="text-end">
                                        ₦{item.price.toLocaleString()}
                                    </td>

                                    <td className="text-end fw-semibold">
                                        ₦{item.subtotal.toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
                {/* ================= Summary ================= */}

                <div className="row justify-content-end">

                    <div className="col-md-5">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-0">

                                <table className="table mb-0">

                                    <tbody>

                                        <tr>

                                            <td>Subtotal</td>

                                            <td className="text-end">
                                                ₦{order.itemsPrice.toLocaleString()}
                                            </td>

                                        </tr>

                                        <tr>

                                            <td>Shipping</td>

                                            <td className="text-end">
                                                ₦{order.shippingFee.toLocaleString()}
                                            </td>

                                        </tr>

                                        {order.discount > 0 && (

                                            <tr>

                                                <td>Discount</td>

                                                <td className="text-end text-success">
                                                    -₦{order.discount.toLocaleString()}
                                                </td>

                                            </tr>

                                        )}

                                        <tr className="table-primary">

                                            <th className="py-3 fs-5">
                                                Total
                                            </th>

                                            <th className="text-end py-3 fs-5">
                                                ₦{order.totalAmount.toLocaleString()}
                                            </th>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= Footer ================= */}

                <div className="border-top mt-5 pt-4">

                    <div className="row align-items-center">

                        <div className="col-md-6">

                            <h5 className="fw-bold text-primary mb-2">
                                Thank You!
                            </h5>

                            <p className="text-muted mb-0">
                                Thank you for shopping with <strong>Mutpel Household</strong>.
                                We appreciate your business and look forward to serving you again.
                            </p>

                        </div>

                        <div className="col-md-6 text-md-end mt-4 mt-md-0">

                            <small className="text-muted d-block">
                                This invoice serves as proof of payment.
                            </small>

                            <small className="text-muted">
                                Generated on{" "}
                                {new Date().toLocaleDateString("en-NG", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </small>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default PrintInvoice;