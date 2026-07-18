import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "../utils/axiosInstance";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const reference = searchParams.get("reference");

                if (!reference) {
                    alert("Payment reference missing.");
                    return;
                }

                const response = await Axios.post("/api/payment/verify", {
                    reference,
                });



                alert(response.data.message);

                navigate("/order-success", {
                    state: {
                        order: response.data.order,
                    }
                })
            } catch (error) {
                console.log(error);

                alert(
                    error.response?.data?.message ||
                    "Payment verification failed."
                );
            }
        };

        verify();
    }, []);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body p-5 text-center">

                            <div
                                className="spinner-border text-primary mb-4"
                                style={{
                                    width: "4rem",
                                    height: "4rem"
                                }}
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <h2 className="fw-bold mb-3">
                                Verifying Your Payment
                            </h2>

                            <p className="text-muted mb-4">
                                Please wait while we securely confirm your payment
                                with Paystack. This usually takes only a few seconds.
                            </p>

                            <div className="alert alert-primary rounded-4">

                                <div className="d-flex align-items-center">

                                    <i className="bi bi-shield-lock-fill fs-3 me-3"></i>

                                    <div className="text-start">

                                        <h6 className="mb-1">
                                            Secure Verification
                                        </h6>

                                        <small>
                                            Do not close this page or refresh your browser until verification is complete.
                                        </small>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-4">

                                <div className="progress rounded-pill" style={{ height: "8px" }}>

                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        style={{ width: "100%" }}
                                    ></div>

                                </div>

                                <small className="text-muted d-block mt-3">
                                    Contacting Paystack...
                                </small>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;