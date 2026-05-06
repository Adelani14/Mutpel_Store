import Helpcenter from "../components/helpcenter";
import Header from "../components/Header";

const Cart = () => {
    return (
        <>
            <Helpcenter />
            <Header />
               

                <main className="py-5">
                    <div className="container">
                        <div className="row g-4 align-items-center mb-4">
                            <div className="col-lg-8">
                                <div className="page-hero p-4 rounded-4 bg-white shadow-sm">
                                    <h1 className="h3 mb-2">Your Selection</h1>
                                    <p className="text-muted mb-0">Review your curated items before moving to checkout.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <a href="checkout2.html" className="btn btn-primary btn-lg">Proceed to Checkout</a>
                            </div>
                        </div>

                        <div className="row g-4">
                            <div className="col-lg-8">
                                <div className="card rounded-4 border-0 shadow-sm p-4">
                                    <div className="cart-item-card p-4 rounded-4 mb-4">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-sm-4">
                                                <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80" className="img-fluid rounded-4" alt="Sculptural Glass Vessel" />
                                            </div>
                                            <div className="col-sm-5">
                                                <span className="badge bg-primary-subtle text-primary mb-2">Lifestyle Archival</span>
                                                <h2 className="h5 mb-2">Sculptural Glass Vessel</h2>
                                                <p className="text-muted mb-3">Hand-blown borosilicate glass with a matte-frosted finish. Limited edition series.</p>
                                                <a href="#" className="text-danger small fw-semibold"><i className="bi bi-trash me-1"></i>Remove Item</a>
                                            </div>
                                            <div className="col-sm-3 text-sm-end">
                                                <div className="quantity-control d-inline-flex align-items-center rounded-pill border border-secondary-subtle px-2 py-1">
                                                    <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-dash"></i></button>
                                                    <span className="px-3 fw-semibold">01</span>
                                                    <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-plus"></i></button>
                                                </div>
                                                <p className="h5 fw-bold text-primary mt-3 mb-0">$420.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cart-item-card p-4 rounded-4 mb-4">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-sm-4">
                                                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=640&q=80" className="img-fluid rounded-4" alt="Raw Linen Editorial Shirt" />
                                            </div>
                                            <div className="col-sm-5">
                                                <span className="badge bg-primary-subtle text-primary mb-2">Core Apparel</span>
                                                <h2 className="h5 mb-2">Raw Linen Editorial Shirt</h2>
                                                <p className="text-muted mb-3">Unbleached organic European linen with oversized silhouette and shell buttons.</p>
                                                <a href="#" className="text-danger small fw-semibold"><i className="bi bi-trash me-1"></i>Remove Item</a>
                                            </div>
                                            <div className="col-sm-3 text-sm-end">
                                                <div className="quantity-control d-inline-flex align-items-center rounded-pill border border-secondary-subtle px-2 py-1">
                                                    <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-dash"></i></button>
                                                    <span className="px-3 fw-semibold">02</span>
                                                    <button className="btn btn-sm btn-outline-secondary"><i className="bi bi-plus"></i></button>
                                                </div>
                                                <p className="h5 fw-bold text-primary mt-3 mb-0">$370.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="promo-card rounded-4 overflow-hidden mt-3">
                                        <div className="row g-0">
                                            <div className="col-md-7 p-4 bg-primary text-white">
                                                <h3 className="h5 mb-3">Complete the Look</h3>
                                                <p className="mb-4 opacity-75">Our curators recommend the ‘Monolith’ incense burner to accompany your glass vessel.</p>
                                                <button className="btn btn-warning btn-sm">Add for $85</button>
                                            </div>
                                            <div className="col-md-5 promo-visual"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card rounded-4 border-0 shadow-sm p-4 h-100">
                                    <h2 className="h6 mb-4">Order Summary</h2>
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                        <div>
                                            <h3 className="h6 mb-1">Sculptural Glass Vessel</h3>
                                            <p className="text-muted mb-0">Natural Linen / Large</p>
                                            <p className="fw-semibold mt-2 mb-0">$420.00</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                        <div>
                                            <h3 className="h6 mb-1">Curator’s Journal Set</h3>
                                            <p className="text-muted mb-0">Hand-bound / 3-Pack</p>
                                            <p className="fw-semibold mt-2 mb-0">$370.00</p>
                                        </div>
                                    </div>
                                    <div className="border-top pt-3 mt-3">
                                        <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal</span><span>$790.00</span></div>
                                        <div className="d-flex justify-content-between mb-2"><span className="text-muted">Estimated Tax</span><span>$63.20</span></div>
                                        <div className="d-flex justify-content-between mb-4"><span className="text-muted">Shipping</span><span className="text-success fw-semibold">Free Express</span></div>
                                        <div className="d-flex justify-content-between align-items-center fw-semibold fs-5"><span>Total</span><span>$853.20</span></div>
                                    </div>
                                    <a href="checkout2.html" className="btn btn-primary btn-lg w-100 mt-4">Proceed to Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

        </>

    );
};

export default Cart;