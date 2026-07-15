import Helpcenter from "../components/Helpcenter.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import publicAxios from "../utils/publicAxios.js";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import { NavLink, Link } from "react-router-dom";

const Productlisting = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const limit = 25;
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [categories, setCategories] = useState([]);



    // const filteredProducts = products.filter(product =>
    //     product.title.toLowerCase().includes(search.toLowerCase()) ||
    //     product.brand?.toLowerCase().includes(search.toLowerCase()) ||
    //     product.shortDescription?.toLowerCase().includes(search.toLowerCase())
    // );




    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchProducts(page),
                    fetchCategories(),
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [page]);


    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            getUsername();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await publicAxios.get(`/api/products?page=${page}`);

            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };



    const getUsername = async () => {
        try {
            const res = await Axios.get("/api/users/Username");

            setFullName(res.data?.user?.fullName || "");
            setEmail(res.data?.user?.email || "");

        } catch (error) {
            console.log(error);
        }
    };


    const fetchCategories = async () => {


        try {

            const res = await publicAxios.get("/api/categories?page=1&limit=6");

            setCategories(res.data);



        } catch (error) {

            console.log(error);

        }

    };



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

            <main className="py-3 bg-body">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 d-none d-md-block">
                            <div className="card rounded-4 shadow-sm border-0 p-4">
                                <h2 className="h6 mb-4">Categories</h2>

                                <div className="list-group list-group-flush">
                                    <Link
                                        to={`/categories`}
                                        className="list-group-item list-group-item-action rounded-4 active"
                                    >
                                        All Categories
                                    </Link>

                                    {categories.map((category) => (
                                        <Link
                                            key={category._id}
                                            to={`/categories/${category._id}`}
                                            className="list-group-item list-group-item-action rounded-4"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
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

                            <div className="row g-2">
                                {products?.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        imgsrc={product.imagespath[0]?.url}
                                        description={product.description}
                                        shortDescription={product.shortDescription}
                                        price={product.price}
                                        previousPrice={product.previousPrice}
                                        stockCount={product.stockCount}
                                        discountPercentage={product.discountPercentage}
                                    />
                                ))}
                            </div>

                            <nav className="mt-5" aria-label="Page navigation">

                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={page === 1}
                                        onClick={() => setPage(prev => prev - 1)}
                                    >
                                        <i className="bi bi-chevron-left"></i> Previous
                                    </button>

                                    <span>Page {page}</span>

                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(prev => prev + 1)}
                                    >
                                        <i className="bi bi-chevron-right"></i> Next
                                    </button>
                                </div>
                            </nav>

                            <div className="card rounded-4 shadow-sm bg-primary text-white mt-5 border-0">
                                <div className="card-body row align-items-center g-3">
                                    <div className="col-md-8">
                                        <h3 className="h5 mb-2">Don't Miss Out on Weekly Hot Deals!</h3>
                                        <p className="mb-0 opacity-75">Subscribe to receive the latest product drops, curated collections, and exclusive discounts.</p>
                                    </div>
                                    <div className="col-md-4">
                                        <form className="d-flex gap-2">
                                            <div className="col-md-6"><label className="form-label">Email Address</label><input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                            <button className="btn btn-light">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <MobileBottomNav />
            <Footer />
        </>

    )
}
export default Productlisting;