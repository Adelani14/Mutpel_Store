import { useState } from "react";
import publicAxios from "../utils/publicAxios.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await publicAxios.post(
                `/api/users/forgot-password`,
                {
                    email
                }
            );
            setMessage(response.data.message);
            setEmail("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                    <div className="text-center mb-8">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Forgot Password?
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Enter your email and we'll send you a link
                            to reset your password.
                        </p>

                    </div>

                    {message && (
                        <div className="mb-5 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-5 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}
export default ForgotPassword;
