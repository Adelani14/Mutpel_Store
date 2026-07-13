import Header from "../components/Header";
import Helpcenter from "../components/Helpcenter";
import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import { Link, NavLink, useParams } from "react-router-dom";
import MobileBottomNav from "../components/MobileBottomNav.jsx";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { id } = useParams();

    const filteredCategories = categories.filter(category =>
        category.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const fetchCategories = async () => {
        try {
            const res = await Axios.get("/api/categories");

            setCategories(res.data);

            const categoryId =
                id || (res.data.length > 0 ? res.data[0]._id : null);

            if (categoryId) {
                loadProducts(categoryId);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const loadProducts = async (categoryId) => {

        setLoading(true);

        try {

            const res = await Axios.get(
                `/api/products/category/${categoryId}`
            );

            setProducts(res.data.products);

            setSelectedCategory(categoryId);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);
    return (
        <>
            <Helpcenter />


            <main className="container py-4">

                <div className="text-center mb-5">
                    <h2 className="fw-bold">
                        Browse Categories
                    </h2>

                    <p className="text-muted">
                        Find products by category.
                    </p>
                </div>

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>



                <div className="d-flex overflow-auto ">

                    {filteredCategories.map(category => (

                        <div
                            className="col-6 col-sm-4 col-lg-3"
                            key={category._id}
                        >

                            <button
                                onClick={() => loadProducts(category._id)}
                                className={`card shadow-sm rounded-4 h-100 border-0 overflow-hidden ${selectedCategory === category._id
                                    ? "border border-3 border-primary"
                                    : ""
                                    }`}
                            >

                                <img
                                    src={category?.image}
                                    className="card-img-top"
                                    style={{
                                        height: 170,
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h6 className="fw-bold">
                                        {category.title}
                                    </h6>

                                    <small className="text-muted">
                                        Browse products →
                                    </small>

                                </div>

                            </button>

                        </div>

                    ))}

                </div>
                <h3 className="fw-bold mt-5 mb-4">

                    {
                        categories.find(c => c._id === selectedCategory)?.title
                    }

                </h3>

                {
                    loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            />

                        </div>

                    ) : (
                        <>
                            <div className="row g-4 mt-4">

                                {filteredProducts.map(product => (
                                    <div
                                        className="col-6 col-md-4 col-lg-3"
                                        key={product._id}
                                    >

                                        <Link
                                            to={`/productdetail/${product._id}`}
                                            className="text-decoration-none text-dark"
                                        >

                                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                                <img
                                                    src={product.imagespath?.[0]?.url || product.imagespath?.[0]}
                                                    className="card-img-top"
                                                    style={{
                                                        height: 220,
                                                        objectFit: "cover"
                                                    }}
                                                />

                                                <div className="card-body">

                                                    <h6>{product.title}</h6>

                                                    <h5>₦{product.price}</h5>

                                                </div>

                                            </div>

                                        </Link>

                                    </div>

                                ))}

                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-5">
                                    <i className="bi bi-box-seam display-2 text-muted"></i>

                                    <h4 className="mt-3">
                                        {search ? "No products found" : "No products available"}
                                    </h4>

                                    <p className="text-muted">
                                        {search
                                            ? "Try another search."
                                            : "This category is currently empty."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
            </main>
            <MobileBottomNav />
        </>
    )
}
export default Categories;