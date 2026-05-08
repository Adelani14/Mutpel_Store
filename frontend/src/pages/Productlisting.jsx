import Helpcenter from "../components/Helpcenter";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Productlisting = () => {
    return (
        <>
            <Helpcenter />
            <Header />

            <main className="py-3 bg-body">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <div className="card rounded-4 shadow-sm border-0 p-4">
                                <h2 className="h6 mb-4">Categories</h2>
                                <div className="list-group list-group-flush">
                                    <a href="#" className="list-group-item list-group-item-action rounded-4 active">All Categories</a>
                                    <a href="#" className="list-group-item list-group-item-action rounded-4">Kitchen</a>
                                    <a href="#" className="list-group-item list-group-item-action rounded-4">Electronics</a>
                                    <a href="#" className="list-group-item list-group-item-action rounded-4">Footwear</a>
                                    <a href="#" className="list-group-item list-group-item-action rounded-4">Home</a>
                                    <a href="#" className="list-group-item list-group-item-action rounded-4">Accessories</a>
                                </div>
                                <div className="mt-5">
                                    <h2 className="h6 mb-3">Price Range</h2>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price1" /><label className="form-check-label" for="price1">Under ₦20,000</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price2" /><label className="form-check-label" for="price2">₦20,000 - ₦50,000</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price3" /><label className="form-check-label" for="price3">₦50,000 - ₦100,000</label></div>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" id="price4" /><label className="form-check-label" for="price4">Above ₦100,000</label></div>
                                </div>
                                {/* <div className="mt-5">
                                        <h2 className="h6 mb-3">Popular Brands</h2>
                                        <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="brand1" /><label className="form-check-label" for="brand1">Apple</label></div>
                                        <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="brand2" /><label className="form-check-label" for="brand2">Samsung</label></div>
                                        <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="brand3" /><label className="form-check-label" for="brand3">Nike</label></div>
                                        <div className="form-check"><input className="form-check-input" type="checkbox" id="brand4" /><label className="form-check-label" for="brand4">Mutpel</label></div>
                                    </div> */}
                                <div className="mt-5">
                                    <h2 className="h6 mb-3">Customer Rating</h2>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="rating1" /><label className="form-check-label" for="rating1">★★★★★ & up</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="rating2" /><label className="form-check-label" for="rating2">★★★★ & up</label></div>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" id="rating3" /><label className="form-check-label" for="rating3">★★★ & up</label></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                                <div>
                                    <p className="text-muted mb-1">Browse by products and deals</p>
                                    <h1 className="h4 mb-0">Products Marketplace</h1>
                                </div>
                                <div>
                                    <button className="btn btn-outline-secondary btn-sm">Sort by Latest</button>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-4 col-xl-3">
                                    <div className="card rounded-4 shadow-sm border-0 h-100">
                                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                                        <div className="card-body">
                                            <h3 className="h6">Samsung Galaxy Watch</h3>
                                            <p className="text-muted mb-2">₦82,000</p>
                                            <a href="product-details.html" className="btn btn-primary btn-sm">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <nav className="mt-5" aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled"><a className="page-link">Previous</a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>

                            <div className="card rounded-4 shadow-sm bg-primary text-white mt-5 border-0">
                                <div className="card-body row align-items-center g-3">
                                    <div className="col-md-8">
                                        <h3 className="h5 mb-2">Don't Miss Out on Weekly Hot Deals!</h3>
                                        <p className="mb-0 opacity-75">Subscribe to receive the latest product drops, curated collections, and exclusive discounts.</p>
                                    </div>
                                    <div className="col-md-4">
                                        <form className="d-flex gap-2">
                                            <input type="email" className="form-control bg-white bg-opacity-10 border-white text-white" placeholder="Enter email address" />
                                            <button className="btn btn-light">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>

    )
}
export default Productlisting;