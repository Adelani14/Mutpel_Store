import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Helpcenter from "../../components/Helpcenter";

const PaymentFailed = () => {
    const location = useLocation();

    const message =
        location.state?.message ||
        "Unfortunately, we couldn't verify your payment.";

    return (
        <>
            <Helpcenter />
            <Header />

            <main className="py-5">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-lg-8">

                            {/* Top Card */}
                            <div className="card border-0 shadow rounded-4 mb-4">
                                <div className="card-body text-center p-5">

                                    <div
                                        className="bg-danger bg-opacity-10 rounded-circle d-inline-flex justify-content-center align-items-center mb-4"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                        }}
                                    >
                                        <i
                                            className="bi bi-x-circle-fill text-danger"
                                            style={{
                                                fontSize: "3.5rem",
                                            }}
                                        ></i>
                                    </div>

                                    <h2 className="fw-bold text-danger mb-3">
                                        Payment Verification Failed
                                    </h2>

                                    <p className="text-muted mb-0">
                                        We were unable to confirm your payment.
                                        <br />
                                        If money was deducted from your account,
                                        don't worry. Our team can verify it using
                                        your payment reference.
                                    </p>

                                </div>
                            </div>

                            {/* Error Message */}
                            <div className="card border-0 shadow rounded-4 mb-4">
                                <div className="card-body">

                                    <h5 className="mb-3">
                                        <i className="bi bi-exclamation-circle text-danger me-2"></i>
                                        Reason
                                    </h5>

                                    <div className="alert alert-danger mb-0">
                                        {message}
                                    </div>

                                </div>
                            </div>

                            {/* What to do */}
                            <div className="card border-0 bg-light rounded-4 mb-4">
                                <div className="card-body">

                                    <h5 className="fw-semibold mb-4">
                                        <i className="bi bi-lightbulb me-2 text-primary"></i>
                                        What You Can Do
                                    </h5>

                                    <div className="d-flex mb-4">

                                        <div className="me-3">

                                            <div
                                                className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    1
                                                </span>

                                            </div>

                                        </div>

                                        <div>

                                            <h6 className="mb-1">
                                                Check your Internet Connection
                                            </h6>

                                            <small className="text-muted">
                                                A poor connection may interrupt payment verification.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex mb-4">

                                        <div className="me-3">

                                            <div
                                                className="bg-warning rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    2
                                                </span>

                                            </div>

                                        </div>

                                        <div>

                                            <h6 className="mb-1">
                                                Try Again
                                            </h6>

                                            <small className="text-muted">
                                                Return to checkout and complete the payment again.
                                            </small>

                                        </div>

                                    </div>

                                    <div className="d-flex">

                                        <div className="me-3">

                                            <div
                                                className="bg-success rounded-circle d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-white fw-bold">
                                                    3
                                                </span>

                                            </div>

                                        </div>

                                        <div>

                                            <h6 className="mb-1">
                                                Contact Support
                                            </h6>

                                            <small className="text-muted">
                                                If your account was debited but your order wasn't created,
                                                contact us and we'll resolve it quickly.
                                            </small>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Buttons */}

                            <div className="d-grid gap-3 d-md-flex justify-content-center">

                                <Link
                                    to="/checkout"
                                    className="btn btn-danger btn-lg"
                                >
                                    <i className="bi bi-arrow-repeat me-2"></i>
                                    Try Payment Again
                                </Link>

                                <Link
                                    to="/productlisting"
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Back to Home
                                </Link>

                            </div>

                            {/* Support */}

                            <div className="text-center mt-5">

                                <small className="text-muted">

                                    Need help?

                                    <br />

                                    Contact our customer support team and we'll assist you immediately.

                                </small>

                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
};

export default PaymentFailed;