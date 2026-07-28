import Helpcenter from "../../components/Helpcenter";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
import ProductCard from "../../components/ProductCard";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../utils/axiosInstance";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get("q");


    const fetchProducts = async () => {

        if (!query) return;

        setLoading(true);

        try {

            const res = await Axios.get(
                `/api/products/search?q=${query}`
            );

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [query]);

    return (
        <>
            <Helpcenter />
            <Header />

            <main className="container mb-4 mt-2">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Search Results
                    </h2>

                    <p className="text-muted">
                        {products.length} result(s) for <strong>"{query}"</strong>
                    </p>

                </div>

                {loading ? (

                    <div className="text-center py-5">
                        <div className="spinner-border text-primary"></div>
                    </div>

                ) : products.length === 0 ? (

                    <div className="text-center py-5">

                        <i className="bi bi-search display-1 text-muted"></i>

                        <h3 className="mt-3">
                            No products found
                        </h3>

                        <p className="text-muted">
                            Try another keyword.
                        </p>

                    </div>

                ) : (

                    <div className="row g-2">

                        {products.map(product => (

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

                )}

            </main>


            <Footer />
            <MobileBottomNav />
        </>
    );
};

export default Search;