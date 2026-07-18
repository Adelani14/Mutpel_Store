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

                navigate("/orders");
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
        <div className="container py-5 text-center">
            <h2>Verifying your payment...</h2>
            <p>Please wait.</p>
        </div>
    );
};

export default PaymentSuccess;