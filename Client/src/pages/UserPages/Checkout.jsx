import Helpcenter from "../../components/Helpcenter.jsx";
import Header from "../../components/Header.jsx";
import { useState, useEffect } from "react";
import Axios from "../../utils/axiosInstance.js";
import { Link } from "react-router-dom";


const Checkout = () => {

    const [products, setProducts] = useState([]);

    const [fullName, setFullName] = useState("");
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const [selectedState, setSelectedState] = useState("");
    const [selectedLga, setSelectedLga] = useState("");

    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [loading, setLoading] = useState(true);

    const isIwo =
        selectedState === "Osun" &&
        selectedLga === "Iwo";


    const fetchStates = async () => {
        try {
            const response = await Axios.get("/api/allState/states");

            setStates(response.data?.states || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePlaceOrder = async () => {
        try {

            // Basic validation
            if (!phone) {
                return alert("Please enter your phone number.");
            }

            if (!selectedState) {
                return alert("Please select your state.");
            }

            if (!selectedLga) {
                return alert("Please select your LGA.");
            }

            if (
                (deliveryMethod === "home" ||
                    deliveryMethod === "interstate") &&
                !address
            ) {
                return alert("Please enter your address.");
            }

            // Build shipping address
            const shippingAddress = {
                fullName,
                email,
                phone,
                address,
                city: selectedLga,
                state: selectedState,
            };


            let method = "Home Delivery";

            if (deliveryMethod === "pickup") {
                method = "Pickup";
            }

            if (deliveryMethod === "interstate") {
                method = "Interstate Delivery";
            }

            const response = await Axios.post(
                "/api/payment/initialize",
                {
                    email,
                    amount: grandTotal,
                    shippingAddress,

                    deliveryMethod: method,

                    shippingFee,
                    discount: 0,
                }
            );

            // Redirect to Paystack
            window.location.href =
                response.data.data.authorization_url;

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to initialize payment."
            );
        }
    };



    const handleStateChange = async (e) => {
        const state = e.target.value;

        setSelectedState(state);
        setSelectedLga("");

        try {
            const response = await Axios.get(`/api/allState/lgas/${state}`)

            setLgas(response.data?.lgas?.lgas || []);
        } catch (error) {
            console.log(error);
        }
    };


    const getUsername = async () => {
        try {
            const res = await Axios.get("/api/users/Username");

            setFullName(res.data?.user?.fullName || "");
            setEmail(res.data.user.email);
        } catch (error) {
            console.log(error);
        }
    };



    const fetchCart = async () => {
        try {
            const response = await Axios.get("/api/cart/getCart");

            setProducts(response.data?.cart?.items || []);

        }
        catch (error) {
            console.log(error)
        }
    }

    const totalPrice = products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const shippingFee = (() => {
        if (selectedState === "Osun" && selectedLga === "Iwo") {
            return deliveryMethod === "home" ? 1000 : 0;
        }

        return 0;
    })();

    const grandTotal = totalPrice + shippingFee;


    useEffect(() => {
        if (!selectedState || !selectedLga) return;

        if (selectedState === "Osun" && selectedLga === "Iwo") {
            return;
        }

        setDeliveryMethod("interstate");
    }, [selectedState, selectedLga]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchStates(),
                    getUsername(),
                    fetchCart(),
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <>
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        zIndex: 9999,
                    }}
                >
                    <div className="position-relative d-inline-flex justify-content-center align-items-center">
                        <i
                            className="bi bi-basket-fill text-primary"
                            style={{ fontSize: "2.5rem" }}
                        ></i>

                        <div
                            className="spinner-border spinner-border-sm text-light position-absolute"
                            style={{
                                width: "1.3rem",
                                height: "1.3rem",
                            }}
                        ></div>
                    </div>
                </div>
            )}
            <Helpcenter />
            <Header />


            <main className="py-5">
                <div className="container">
                    <div className="card rounded-4 border-0 shadow-sm mb-5">
                        <div className="card-body p-4">
                            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                                <div>
                                    <h1 className="h4 mb-2">Checkout</h1>
                                    <p className="text-muted mb-0">Secure checkout for your latest selection.</p>
                                </div>
                                <div className="badge rounded-pill bg-primary-subtle text-primary py-2 px-3">SECURE CHECKOUT</div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-7">
                            <div className="card rounded-4 border-0 shadow-sm p-4 mb-4">
                                <h2 className="h6 text-uppercase text-primary mb-4">1 Shipping Information</h2>
                                <div className="row g-3">
                                    <div className="col-md-6"><label className="form-label">Full Name</label><input className="form-control" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
                                    <div className="col-md-6"><label className="form-label">Phone Number</label>
                                        <input
                                            className="form-control"
                                            type="tel"
                                            placeholder="08000000000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">State</label>
                                        <select
                                            className="w-100"
                                            style={{ height: "50px" }}
                                            value={selectedState}
                                            onChange={handleStateChange}
                                        >
                                            <option value="">Select State</option>

                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City</label>
                                        <select
                                            className="w-100"
                                            style={{ height: "50px" }}
                                            value={selectedLga}
                                            onChange={(e) => setSelectedLga(e.target.value)}
                                        >
                                            <option value="">Select LGA</option>

                                            {lgas.map((lga) => (
                                                <option key={lga} value={lga}>
                                                    {lga}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    {!isIwo && selectedState && selectedLga && (
                                        <div className="alert alert-info mt-3 rounded-3">
                                            <i className="bi bi-truck me-2"></i>

                                            Orders outside <strong>Iwo, Osun State </strong> 
                                            are delivered through trusted interstate transport
                                            companies. We'll contact you after payment to
                                            arrange delivery.
                                        </div>
                                    )}

                                    {isIwo && (
                                        <div className="mt-2 form-control ">
                                            <label className="me-3">
                                                <input
                                                    type="radio"
                                                    value="pickup"
                                                    name="deliveryMethod"
                                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                                />
                                                Pick Up From Store
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    value="home"
                                                    name="deliveryMethod"
                                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                                />
                                                Home Delivery (+ ₦1000)
                                            </label>
                                        </div>
                                    )}
                                    {(deliveryMethod === "home" ||
                                        deliveryMethod === "interstate") && (
                                            <div >
                                                <input
                                                    type="text"
                                                    className="mt-2 form-control"
                                                    placeholder="Enter Home Address"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="card rounded-4 border-0 shadow-sm p-4">
                                <h2 className="h6 text-uppercase text-primary mb-4">2 Payment Method</h2>
                                <div className="payment-method-card active mb-3 p-3 rounded-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="paystack" defaultChecked />
                                            <label className="form-check-label fw-semibold" htmlFor="paystack">PayStack</label>
                                        </div>
                                        <p className="text-muted small mb-0">Pay securely with Cards, Bank Transfer, or USSD</p>
                                    </div>
                                    <img src="https://res.cloudinary.com/dn7lrgxvl/image/upload/v1777754080/paystack_x481sw.png" className="rounded-2" alt="Paystack" style={{ width: "30px", height: "30px" }} />
                                </div>
                                <div className="payment-method-card disabled p-3 rounded-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" disabled />
                                            <label className="form-check-label fw-semibold" htmlFor="paypal">PayPal</label>
                                        </div>
                                        <p className="text-muted small mb-0">International payments (Coming soon)</p>
                                    </div>
                                    <i className="bi bi-credit-card-2-front text-secondary fs-3"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="card rounded-4 border-0 shadow-sm p-4 h-100">
                                <h2 className="h6 mb-4">Order Summary</h2>
                                {products.map((item) => (
                                    <div key={item._id} className="order-summary-line d-flex align-items-center gap-3 mb-3 border-1 border-bottom">
                                        <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                        <div>
                                            <h3 className="h6 mb-1">{item.product?.title}</h3>


                                            <small className="text-muted mb-0">Quantity: <b>{item.quantity}</b></small>
                                            <div>
                                                {item.size?.length > 0 && (
                                                    <small className="text-muted mb-0">Size: <b>{item.size}</b></small>
                                                )}
                                            </div>
                                            <div>
                                                {item.color?.length > 0 && (
                                                    <small className="text-muted mb-0">Color: <b>{item.color}</b></small>
                                                )}
                                            </div>
                                        </div>

                                        <div className="ms-auto fw-semibold text-danger">₦{item.product.price * item.quantity}</div>
                                    </div>
                                ))}

                                <div className=" pt-3 mt-3">
                                    <div className="d-flex justify-content-between text-muted mb-2"><span>Subtotal</span><span>₦{totalPrice}</span></div>
                                    {shippingFee > 0 && (

                                        <div className="d-flex justify-content-between text-muted mb-2"><span>Shipping</span><span className="text-success fw-semibold">₦{shippingFee}</span></div>
                                    )}
                                    <div className="d-flex justify-content-between align-items-center fw-semibold fs-5"><span>Total</span><span>₦{grandTotal}</span></div>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg w-100 mt-4"
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order via Paystack
                                </button>                                <p className="text-muted small mt-3">By placing your order, you agree to our Terms of Service and Privacy Policy. Secure 256-bit SSL encrypted payment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="container mb-5">
                <Link to="/productlisting"> <i className="bi bi-arrow-left mb-3"></i> Go back & continue shopping</Link>
            </div>

        </>
    );
};

export default Checkout;