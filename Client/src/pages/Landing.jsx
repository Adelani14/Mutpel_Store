import Footer from "../components/Footer";
import Helpcenter from '../components/Helpcenter.jsx';
import { Link } from "react-router-dom";
import publicAxios from "../utils/publicAxios.js";
import { useState, useEffect } from "react";


const Landing = () => {
    const [products, setProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);


    const [page, setPage] = useState(1);
    const [featuredPage, setFeaturedPage] = useState(1);
    const [newArrivalPage, setNewArrivalPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [featuredtotalPages, setfeaturedtotalPages] = useState(1);
    const [newArrivaltotalPages, setnewArrivaltotalPages] = useState(1);

    const fetchTopDeals = async () => {
        try {
            const res = await publicAxios.get(`/api/products/top-deals?page=${page}`);
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };




    const fetchFeaturedProducts = async () => {
        try {
            const res = await publicAxios.get(`/api/products/featured?page=${featuredPage}`);

            setFeaturedProducts(res.data.products);
            setfeaturedtotalPages(res.data.totalPages);

        } catch (error) {
            console.log(error);
        }
    };



    const fetchNewArrivals = async () => {
        try {
            const res = await publicAxios.get(
                `/api/products/new-arrivals?page=${newArrivalPage}`
            );

            setNewArrivals(res.data.products);
            setnewArrivaltotalPages(res.data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchNewArrivals();
    }, [newArrivalPage]);

    useEffect(() => {
        fetchFeaturedProducts();
    }, [featuredPage]);

    useEffect(() => {
        fetchTopDeals();
    }, [page]);
    return (
        <>

            <Helpcenter />
            <header className="container-fluid py-3">
                <div className="d-flex align-items-center justify-content-between ">

                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white"
                            style={{ width: "44px", height: "44px" }}
                        >
                            <img
                                src="/icons/logo.png"
                                alt="Mutpel Logo"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        <h1 className="h5 mb-0 text-primary">
                            Motpel Household
                        </h1>
                    </div>

                    <form className="flex-grow-1 d-none d-md-flex">
                        <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                            <span className="input-group-text bg-white border-0">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="search"
                                className="form-control border-0"
                                placeholder="Search Products..."
                            />

                            <button className="btn btn-primary d-none d-sm-block">
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="d-flex align-items-center gap-2 flex-shrink-0">
                        <Link to="/login" className="text-secondary text-decoration-none">Login</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
                    </div>

                </div>



            </header>

            <main>


                <div className="bg-primary text-white py-2">
                    <div className="container d-flex justify-content-center align-items-center">
                        <small className="fw-semibold">
                            <i className="bi bi-truck me-2"></i>Free Delivery on orders above ₦200,000
                        </small>
                    </div>
                </div>
                <section className="hero-section py-3">
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
                                                    <Link
                                                        to="/productlisting"
                                                        className="btn btn-primary btn-lg"
                                                    >
                                                        Shop Now
                                                    </Link>

                                                    <Link
                                                        to="/categories"
                                                        className="btn btn-outline-light btn-lg"
                                                    >
                                                        Browse Categories
                                                    </Link>
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
                            <Link to="/categories" className="text-muted mb-0"><i className="bi bi-arrow-right text-primary"> view all categories</i></Link>
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
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(prev => prev - 1)}
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(prev => prev + 1)}
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row g-4">
                            {products.map(product => (

                                <div key={product._id} className="col-md-6 col-xl-3">

                                    <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                        <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">{product.discountPercentage}% OFF</div>
                                        {/* <div className="product-image rounded-4 bg-secondary-subtle mb-3"></div> */}
                                        <Link to={`/productdetail/${product._id}`}>

                                            <img src={product.imagespath[0]?.url}
                                                className="product-img rounded-4 mb-3" alt="Backpack"

                                                style={{
                                                    width: "100%",
                                                    height: "180px",
                                                    objectFit: "cover",
                                                }} />
                                        </Link>
                                        <Link to={`/productdetail/${product._id}`} className="text-decoration-none text-dark">

                                            <h3 className="h6">{product.title}</h3>
                                        </Link>
                                        <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                            {product?.ratings >= 0 && product?.ratings <= 9 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 10 && product?.ratings <= 19 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 20 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted ">({product.ratings})</span>
                                                </div>
                                            )}
                                            {/* <span className="text-muted">{product.ratings}</span> */}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-auto">
                                            <div className="fw-semibold fs-5">₦{product.price}</div>
                                            <button className="btn btn-primary btn-sm">
                                                Add to Cart
                                            </button>                                        </div>
                                    </div>


                                </div>

                            ))}

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
                            <div className=" text-light border border-right-1 btn-group" role="group" aria-label="Featured filter">
                                <Link
                                    to="/categories"
                                    className="text-decoration-none text-light btn btn-primary"
                                >  all</Link>
                                <Link
                                    to="/categories/electronic"
                                    className="text-decoration-none text-light btn btn-primary"
                                >electronics</Link>
                                <Link
                                    to="/categories/fashion"
                                    className="text-decoration-none text-light btn btn-primary"
                                >fashion</Link>
                                <Link
                                    to="/categories/home"
                                    className="text-decoration-none text-light btn btn-primary"
                                >home</Link>
                            </div>
                        </div>
                        <div className="row g-4">
                            {featuredProducts.map(product => (
                                <div key={product._id} className="col-sm-6 col-lg-3">
                                    <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                        <Link to={`/productdetail/${product._id}`} className="text-decoration-none text-dark">

                                            <img src={product.imagespath[0]?.url}
                                                className="product-img rounded-4 mb-3" alt="Backpack"

                                                style={{
                                                    width: "100%",
                                                    height: "180px",
                                                    objectFit: "cover",
                                                }} />
                                        </Link>
                                        <Link to={`/productdetail/${product._id}`} className="text-decoration-none text-dark">

                                            <h3 className="h6">{product.title}</h3>
                                        </Link>
                                        <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                            {product?.ratings >= 0 && product?.ratings <= 9 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 10 && product?.ratings <= 19 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 20 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted ">({product.ratings})</span>
                                                </div>
                                            )}
                                            {/* <span className="text-muted">{product.ratings}</span> */}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-auto">
                                            <div className="fw-semibold">₦{product.price}</div>
                                            <button className="btn btn-primary btn-sm">
                                                Add to Cart
                                            </button>                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <Link
                                to="/productlisting"
                                className="btn btn-outline-primary btn-md"
                            >Load More Products</Link>
                        </div>
                    </div>
                </section>

                <section className="top-deals-section py-5">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                            <div>
                                <h2 className="h3 mb-1">
                                    New Arrivals <span className="fs-4"><i className="bi bi-stars"></i></span>
                                </h2>
                                <p className="text-muted mb-0">
                                    Discover the latest products freshly added to our collection.
                                </p>
                            </div>
                            <div className="btn-group shadow-sm">
                                <button
                                    disabled={newArrivalPage === 1}
                                    onClick={() => setNewArrivalPage(prev => prev - 1)}
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>

                                <button
                                    disabled={newArrivalPage === newArrivaltotalPages}
                                    onClick={() => setNewArrivalPage(prev => prev + 1)}
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row g-4">
                            {newArrivals.map(product => (

                                <div key={product._id} className="col-md-6 col-xl-3">

                                    <div className="product-card p-3 rounded-4 shadow-sm bg-white h-100">
                                        <div className="badge bg-danger text-white position-absolute top-0 start-0 m-3">{product.discountPercentage}% OFF</div>
                                        {/* <div className="product-image rounded-4 bg-secondary-subtle mb-3"></div> */}
                                        <Link to={`/productdetail/${product._id}`}>

                                            <img src={product.imagespath[0]?.url}
                                                className="product-img rounded-4 mb-3" alt="Backpack"

                                                style={{
                                                    width: "100%",
                                                    height: "180px",
                                                    objectFit: "cover",
                                                }} />
                                        </Link>
                                        <Link to={`/productdetail/${product._id}`} className="text-decoration-none text-dark">

                                            <h3 className="h6">{product.title}</h3>
                                        </Link>
                                        <div className="d-flex align-items-center gap-2 mb-3 text-warning small">
                                            {product?.ratings >= 0 && product?.ratings <= 9 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 10 && product?.ratings <= 19 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></i>
                                                    <span className="text-muted">({product.ratings})</span>
                                                </div>
                                            )}
                                            {product?.ratings >= 20 && (

                                                <div className="d-flex align-items-center gap-2 text-warning small">
                                                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                                                    <span className="text-muted ">({product.ratings})</span>
                                                </div>
                                            )}
                                            {/* <span className="text-muted">{product.ratings}</span> */}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-auto">
                                            <div className="fw-semibold fs-5">₦{product.price}</div>
                                            <button className="btn btn-primary btn-sm">
                                                Add to Cart
                                            </button>                                        </div>
                                    </div>


                                </div>

                            ))}

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
                            <span className="badge bg-light text-dark px-3 py-2">Apple</span>
                            <span className="badge bg-light text-dark px-3 py-2">Samsung</span>
                            <span className="badge bg-light text-dark px-3 py-2">Nike</span>
                            <span className="badge bg-light text-dark px-3 py-2">Adidas</span>
                            <span className="badge bg-light text-dark px-3 py-2">T-Fal</span>
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