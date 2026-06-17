import Helpcenter from "../components/Helpcenter.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";


const Productlisting = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (currentPage) => {
        try {
            const response = await fetch(
                `http://localhost:4350/api/products?page=${currentPage}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <span className="spinner-border spinner-border-lg "></span>
                <h3>Loading products...</h3>
            </div>
        );
    }

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
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price1" /><label className="form-check-label" htmlFor="price1">Under ₦20,000</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price2" /><label className="form-check-label" htmlFor="price2">₦20,000 - ₦50,000</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" value="" id="price3" /><label className="form-check-label" htmlFor="price3">₦50,000 - ₦100,000</label></div>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" id="price4" /><label className="form-check-label" htmlFor="price4">Above ₦100,000</label></div>
                                </div>

                                <div className="mt-5">
                                    <h2 className="h6 mb-3">Customer Rating</h2>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="rating1" /><label className="form-check-label" htmlFor="rating1">★★★★★ & up</label></div>
                                    <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="rating2" /><label className="form-check-label" htmlFor="rating2">★★★★ & up</label></div>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" id="rating3" /><label className="form-check-label" htmlFor="rating3">★★★ & up</label></div>
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
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        imgsrc={product.imagespath[0]}
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
                                        className="btn btn-secondary"
                                        disabled={page === 1}
                                        onClick={() => setPage((prev) => prev - 1)}
                                    >
                                        Previous
                                    </button>

                                    <span>Page {page}</span>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setPage((prev) => prev + 1)}
                                    >
                                        Next
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