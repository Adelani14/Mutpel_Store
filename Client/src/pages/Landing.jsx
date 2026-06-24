import Footer from "../components/Footer";
import Helpcenter from '../components/Helpcenter.jsx';
import { Link } from "react-router-dom";
const Landing = () => {
    return (
        <>
            <header className="bg-white shadow-sm sticky-top" style={{ zIndex: 1020 }}>
                <Helpcenter />
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <div className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: '44px', height: '44px' }}>
                                <i className="bi bi-basket-fill fs-5"></i>
                            </div>
                            <div>
                                <h1 className="h5 mb-0 text-primary">Mutpel Household</h1>
                            </div>
                        </div>
                        <form className="flex-grow-1 mx-3 d-none d-md-flex" style={{ minWidth: '300px' }}>
                            <div className="input-group shadow-sm rounded-pill overflow-hidden border border-1 border-secondary-subtle" >
                                <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span >
                                <input type="search" className="form-control border-0" placeholder="Search accessories, kitchen, shoes..." aria-label="Search" />
                                <button className="btn btn-primary rounded-end" type="submit">Search</button>
                            </div>
                        </form>
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-2">
                                <i className="bi bi-heart"></i>
                            </button>
                            <button className="btn btn-link text-secondary"><i className="bi bi-bell"></i></button>
                            <div className="vr d-none d-lg-block"></div>
                            <Link to="/login" className="text-secondary text-decoration-none">Login</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* <section className="hero-section py-5">
                        <div className="container">
                            <div className="bg-dark hero-card p-4 p-md-5 rounded-4 overflow-hidden position-relative shadow-lg">
                                <div className="row align-items-center gy-4">
                                    <div className="col-lg-7 text-white">
                                        <span className="badge bg-warning text-dark mb-3">BIG SEASON SALE</span>
                                        <h2 className="display-6 fw-bold">Upgrade Your Lifestyle With Mutpel Quality</h2>
                                        <p className="lead mt-3">Up to 40% OFF on premium phone accessories, kitchenware, and footwear. Limited time offer for the holiday season.</p>
                                        <div className="mt-4 d-flex flex-wrap gap-3">
                                            <a href="#" className="btn btn-primary btn-lg">Shop Now</a>
                                            <a href="#" className="btn btn-outline-light btn-lg">View Deals</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 text-center position-relative">
                                        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" className="img-fluid rounded-4 shadow" alt="Hero product image" />
                                        <div className="hero-nav position-absolute bottom-0 end-0 mb-3 me-3 d-flex gap-2">
                                            <button className="btn btn-white btn-sm rounded-circle shadow-sm"><i className="bi bi-chevron-left"></i></button>
                                            <button className="btn btn-white btn-sm rounded-circle shadow-sm"><i className="bi bi-chevron-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                <section className="hero-section py-5">
                    <div className="container">
                        <div
                            id="heroCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-inner">

                                {/* SLIDE 1 */}
                                <div className="carousel-item active">
                                    <div className="bg-dark hero-card p-4 p-md-5 rounded-4 overflow-hidden position-relative shadow-lg">
                                        <div className="row align-items-center gy-4">
                                            <div className="col-lg-7 text-white">
                                                <span className="badge bg-warning text-dark mb-3">BIG SEASON SALE</span>
                                                <h2 className="display-6 fw-bold">Upgrade Your Lifestyle With Mutpel Quality</h2>
                                                <p className="lead mt-3">Up to 40% OFF on premium phone accessories, kitchenware, and footwear.</p>
                                                <div className="mt-4 d-flex gap-3">
                                                    <a href="#" className="btn btn-primary btn-lg">Shop Now</a>
                                                    <a href="#" className="btn btn-outline-light btn-lg">View Deals</a>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 text-center">
                                                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
                                                    className="img-fluid rounded-4 shadow"
                                                    alt="Slide 1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SLIDE 2 */}
                                <div className="carousel-item">
                                    <div className="bg-dark hero-card p-4 p-md-5 rounded-4 overflow-hidden position-relative shadow-lg">
                                        <div className="row align-items-center gy-4">
                                            <div className="col-lg-7 text-white">
                                                <span className="badge bg-success mb-3">NEW ARRIVALS</span>
                                                <h2 className="display-6 fw-bold">Fresh Gadgets Just Landed</h2>
                                                <p className="lead mt-3">Discover the latest tech accessories and smart devices.</p>
                                                <div className="mt-4 d-flex gap-3">
                                                    <a href="#" className="btn btn-primary btn-lg">Explore</a>
                                                    <a href="#" className="btn btn-outline-light btn-lg">See More</a>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 text-center">
                                                <img src="https://images.unsplash.com/photo-1617625802912-cde586faf331?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
                                                    className="img-fluid rounded-4 shadow"
                                                    alt="Slide 2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SLIDE 3 */}
                                <div className="carousel-item">
                                    <div className="bg-dark hero-card p-4 p-md-5 rounded-4 overflow-hidden position-relative shadow-lg">
                                        <div className="row align-items-center gy-4">
                                            <div className="col-lg-7 text-white">
                                                <span className="badge bg-danger mb-3">LIMITED OFFER</span>
                                                <h2 className="display-6 fw-bold">Step Out in Style</h2>
                                                <p className="lead mt-3">Get trendy footwear and fashion items at amazing discounts.</p>
                                                <div className="mt-4 d-flex gap-3">
                                                    <a href="#" className="btn btn-primary btn-lg">Buy Now</a>
                                                    <a href="#" className="btn btn-outline-light btn-lg">Browse</a>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 text-center">
                                                <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
                                                    className="img-fluid rounded-4 shadow"
                                                    alt="Slide 3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* <button
                                    className="carousel-control-prev custom-control"
                                    type="button"
                                    data-bs-target="#heroCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon"></span>
                                </button>

                                <button
                                    className="carousel-control-next custom-control"
                                    type="button"
                                    data-bs-target="#heroCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon"></span>
                                </button> */}




                        </div>
                    </div>
                </section>

                <section className="categories-section py-5 bg-body">

                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                            <h2 className="h3 mb-1 fs-4 ">Shop by Categories</h2>
                            <p className="text-muted mb-0"><i className="bi bi-arrow-right text-primary"> view all categories</i></p>
                        </div>
                        <div className="row g-3 justify-content-center text-center">
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-phone-fill"></i></div>
                                    <p className="mb-0">Accessories</p>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-egg-fried"></i></div>
                                    <p className="mb-0">Kitchen</p>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-bag-heart-fill"></i></div>
                                    <p className="mb-0">Footwear</p>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-people-fill"></i></div>
                                    <p className="mb-0">Baby & Kids</p>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-tv-fill"></i></div>
                                    <p className="mb-0">Electronics</p>
                                </div>
                            </div>
                            <div className="col-6 col-sm-4 col-md-2">
                                <div className="category-item p-3 rounded-4 shadow-sm bg-white">
                                    <div className="icon-circle mx-auto mb-3"><i className="bi bi-shop-window"></i></div>
                                    <p className="mb-0">Home Decor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="top-deals-section py-5">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                            <div>
                                <h2 className="h3 mb-1">Top Deals <span className="fs-4"><i className="bi bi-fire"></i></span></h2>
                                <p className="text-muted mb-0">Grab them before they disappear! Flash sale active.</p>
                            </div>
                            <div className="btn-group shadow-sm">
                                <button className="btn btn-outline-secondary"><i className="bi bi-chevron-left"></i></button>
                                <button className="btn btn-outline-secondary"><i className="bi bi-chevron-right"></i></button>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-6 col-xl-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">20% OFF</div>
                                    {/* <div className="product-image rounded-4 bg-secondary-subtle mb-3"></div> */}
                                    <img src="https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFByZW1pdW0lMjBMZWF0aGVyJTIwTG9hZmVyc3xlbnwwfHwwfHx8MA%3D%3D" alt="" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Premium Leather Loafers</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold fs-5">₦28,500</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">15% OFF</div>
                                    <img src="https://plus.unsplash.com/premium_photo-1711350621900-a5df0c68458e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TXVsdGktRnVuY3Rpb24lMjBBaXIlMjBGcnllcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Multi-Function Air Fryer</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold fs-5">₦72,000</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">30% OFF</div>
                                    <img src="https://images.unsplash.com/photo-1633381638729-27f730955c23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBDaGFyZ2luZyUyMFBhZHxlbnwwfHwwfHx8MA%3D%3D" alt="" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Wireless Charging Pad</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold fs-5">₦12,800</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">10% OFF</div>
                                    <img src="https://media.istockphoto.com/id/1394456695/photo/a-woman-at-the-airport-holding-a-passport-with-a-boarding-pass.webp?a=1&b=1&s=612x612&w=0&k=20&c=MxEXkYc_okCfofghSel17XkniV8PG2dUvsJE8GmZcdo=" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Nylon Travel Backpack</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold fs-5">₦18,500</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="featured-section py-4 bg-body">
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
                            <div>
                                <h2 className="h3 mb-1">Featured Products</h2>
                                <p className="text-muted mb-0">Hand-picked quality items just for you.</p>
                            </div>
                            <div className="btn-group" role="group" aria-label="Featured filter">
                                <button type="button" className="btn btn-primary">all</button>
                                <button type="button" className="btn btn-outline-secondary">electronics</button>
                                <button type="button" className="btn btn-outline-secondary">fashion</button>
                                <button type="button" className="btn btn-outline-secondary">home</button>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://images.unsplash.com/photo-1717126763826-77696b14d5ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVyZ29ub21pYyUyMENoZWYncyUyMEtuaWZlfGVufDB8fDB8fHww" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Ergonomic Chef's Knife</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦15,400</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://images.unsplash.com/photo-1575471557361-2f39bee67211?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VWx0cmEtQmFzcyUyMFdpcmVsZXNzJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Ultra-Bass Wireless Earbuds</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦34,900</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://images.unsplash.com/photo-1584990348065-f4f7a2a3e90c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE5vbi1TdGljayUyMDEwcGMlMjBDb29rd2FyZSUyMFNldHxlbnwwfHwwfHx8MA%3D%3D" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Non-Stick 10pc Cookware Set</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦145,000</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://plus.unsplash.com/premium_photo-1663051101782-6770f06e893f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJyZWF0aGFibGUlMjBNZXNoJTIwU25lYWtlcnN8ZW58MHx8MHx8fDA%3D" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Breathable Mesh Sneakers</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦22,500</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://images.unsplash.com/photo-1636015856875-00ce4b89433d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEZhc3QlMjBDaGFyZ2luZyUyMFVTQi1DJTIwSHVifGVufDB8fDB8fHww" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Fast Charging USB-C Hub</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦9,800</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://plus.unsplash.com/premium_photo-1702498665285-d95e7c1bf9b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VG9kZGxlciUyMFNvZnQtQ290dG9uJTIwU2V0fGVufDB8fDB8fHww" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Toddler Soft-Cotton Set</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦12,000</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://plus.unsplash.com/premium_photo-1729104891765-73eb62330ef5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFN1ZWRlJTIwQW5rbGUlMjBCb290c3xlbnwwfHwwfHx8MA%3D%3D" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Suede Ankle Boots</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦45,000</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                    <img src="https://images.unsplash.com/photo-1676282827717-842a6257b39d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2lsaWNvbiUyMFNwYXR1bGElMjBTZXR8ZW58MHx8MHx8fDA%3D" className="product-img rounded-4 mb-3" alt="Backpack" />
                                    <h3 className="h6">Silicon Spatula Set</h3>
                                    <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                        <span className="text-muted">(124)</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-auto">
                                        <div className="fw-semibold">₦6,500</div>
                                        <a href="#" className="btn btn-primary btn-sm">Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <a href="#" className="btn btn-outline-primary btn-md">Load More Products</a>
                        </div>
                    </div>
                </section>

                <section className="benefits-section py-5">
                    <div className="container">
                        <div className="row g-3">
                            <div className="benefits-items col-md-6 col-lg-3">
                                <div className="benefit-card p-4 rounded-4 shadow-sm bg-white h-100 text-center">
                                    <div className="icon-circle mb-3 bg-primary text-white"><i className="bi bi-truck"></i></div>
                                    <h3 className="h6 fw-semibold">Free Shipping</h3>
                                    <p className="mb-0 text-muted">On orders over ₦150k</p>
                                </div>
                            </div>
                            <div className="benefits-items col-md-6 col-lg-3">
                                <div className="benefit-card p-4 rounded-4 shadow-sm bg-white h-100 text-center">
                                    <div className="icon-circle mb-3 bg-primary text-white"><i className="bi bi-shield-lock-fill"></i></div>
                                    <h3 className="h6 fw-semibold">Secured Payment</h3>
                                    <p className="mb-0 text-muted">Safe & encrypted transactions</p>
                                </div>
                            </div>
                            <div className="benefits-items col-md-6 col-lg-3">
                                <div className="benefit-card p-4 rounded-4 shadow-sm bg-white h-100 text-center">
                                    <div className="icon-circle mb-3 bg-primary text-white"><i className="bi bi-arrow-counterclockwise"></i></div>
                                    <h3 className="h6 fw-semibold">7 Days Return</h3>
                                    <p className="mb-0 text-muted">Hassle-free money back</p>
                                </div>
                            </div>
                            <div className="benefits-items col-md-6 col-lg-3">
                                <div className="benefit-card p-4 rounded-4 shadow-sm bg-white h-100 text-center">
                                    <div className="icon-circle mb-3 bg-primary text-white"><i className="bi bi-credit-card-2-back-fill"></i></div>
                                    <h3 className="h6 fw-semibold">Flexible Payment</h3>
                                    <p className="mb-0 text-muted">Pay with card, transfer, or USSD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container border-top border-bottom border-secondary border-1 mb-3 py-4 bg-body">
                    <div className="container">
                        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 text-secondary small text-uppercase fw-semibold">
                            <span>Apple</span>
                            <span>Samsung</span>
                            <span>Nike</span>
                            <span>Adidas</span>
                            <span>T-Fal</span>
                        </div>
                    </div>
                </section>

                <section className=" container app-cta-section py-5 bg-primary text-white">
                    <div className="container">
                        <div className="row align-items-center g-4 position-relative">
                            <div className="col-lg-7">
                                <div className="p-4 p-md-5 rounded-4" style={{ background: 'rgba(255,255,255,.08)' }}>
                                    <h2 className="fw-bold">Don't miss our best deals!</h2>
                                    <p className="lead mb-4">Subscribe to our newsletter and get notified about flash sales, new arrivals and exclusive coupons.</p>
                                    <form className="row g-2 g-sm-0 align-items-center">
                                        <div className="col-sm-8">
                                            <input type="email" className="form-control form-control-lg bg-white bg-opacity-10 border-0 text-white" placeholder="your@email.com" />
                                        </div>
                                        <div className="col-sm-4">
                                            <button className="btn btn-light btn-lg w-100 text-primary">Subscribe</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="benefits-items position-relative rounded-4 overflow-hidden shadow-lg app-phone-card mx-auto" style={{ maxWidth: '360px' }}>
                                    <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=720&q=80" className=" img-fluid" alt="App preview" />
                                    <div className="app-download-card position-absolute bottom-0 start-0 translate-middle-y bg-white shadow-sm rounded-4 p-3 d-flex align-items-center gap-3" style={{ width: 'calc(100% - 2rem)', left: '1rem' }}>
                                        <div className="download-icon rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}    ><i className="bi bi-phone-fill"></i></div>
                                        <div className="">
                                            <p className="text-uppercase text-muted mb-1 small">Download Now</p>
                                            <h3 className="h6 mb-0 text-dark">Mutpel App v2.0</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>

        // <div classNameName="text-rose-300 bg-green-700">hello this is landing page</div>
    )
}
export default Landing;