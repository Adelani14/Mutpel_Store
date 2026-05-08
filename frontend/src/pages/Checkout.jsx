import Helpcenter from "../components/Helpcenter";
import Header from "../components/Header";


const Checkout = () => {
    return (
        <>
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
                                    <div className="col-md-6"><label className="form-label">Full Name</label><input className="form-control" type="text" placeholder="Julianne Moore" /></div>
                                    <div className="col-md-6"><label className="form-label">Phone Number</label><input className="form-control" type="tel" placeholder="+234 800 000 0000" /></div>
                                    <div className="col-12"><label className="form-label">Street Address</label><input className="form-control" type="text" placeholder="128 Editorial Way, Victoria Island" /></div>
                                    <div className="col-md-4"><label className="form-label">City</label><input className="form-control" type="text" placeholder="Lagos" /></div>
                                    <div className="col-md-4"><label className="form-label">State</label><select className="form-select"><option selected>Lagos State</option><option>Rivers State</option><option>Abuja</option></select></div>
                                    {/* <div className="col-md-4"><label className="form-label">Postal Code</label><input className="form-control" type="text" placeholder="100001" /></div> */}
                                </div>
                            </div>

                            <div className="card rounded-4 border-0 shadow-sm p-4">
                                <h2 className="h6 text-uppercase text-primary mb-4">2 Payment Method</h2>
                                <div className="payment-method-card active mb-3 p-3 rounded-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="paystack" checked />
                                            <label className="form-check-label fw-semibold" for="paystack">Paystack</label>
                                        </div>
                                        <p className="text-muted small mb-0">Pay securely with Cards, Bank Transfer, or USSD</p>
                                    </div>
                                    <img src="https://res.cloudinary.com/dn7lrgxvl/image/upload/v1777754080/paystack_x481sw.png" className="rounded-2" alt="Paystack" style={{ width: "30px", height: "30px" }} />
                                </div>
                                <div className="payment-method-card disabled p-3 rounded-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" disabled />
                                            <label className="form-check-label fw-semibold" for="paypal">PayPal</label>
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
                                <div className="order-summary-line d-flex align-items-center gap-3 mb-3">
                                    <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                    <div>
                                        <h3 className="h6 mb-1">The Archivist Tote</h3>
                                        <p className="text-muted small mb-0">Natural Linen / Large</p>
                                    </div>
                                    <div className="ms-auto fw-semibold">₦45,000.00</div>
                                </div>
                                <div className="order-summary-line d-flex align-items-center gap-3 mb-4">
                                    <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                    <div>
                                        <h3 className="h6 mb-1">Curator’s Journal Set</h3>
                                        <p className="text-muted small mb-0">Hand-bound / 3-Pack</p>
                                    </div>
                                    <div className="ms-auto fw-semibold">₦18,500.00</div>
                                </div>
                                <div className="border-top pt-3 mt-3">
                                    <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>₦63,500.00</span></div>
                                    <div className="d-flex justify-content-between mb-2"><span>Shipping</span><span>₦2,500.00</span></div>
                                    <div className="d-flex justify-content-between mb-3"><span>Tax (VAT)</span><span>₦4,762.50</span></div>
                                    <div className="d-flex justify-content-between align-items-center fw-semibold fs-5"><span>Total</span><span>₦70,762.50</span></div>
                                </div>
                                <button className="btn btn-primary btn-lg w-100 mt-4">Place Order via Paystack</button>
                                <p className="text-muted small mt-3">By placing your order, you agree to our Terms of Service and Privacy Policy. Secure 256-bit SSL encrypted payment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>
    );
};

export default Checkout;