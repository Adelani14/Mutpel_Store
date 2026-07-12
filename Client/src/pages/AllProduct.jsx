import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helpcenter from '../components/Helpcenter.jsx';
import Axios from "../utils/axiosInstance.js"
import AdminMobileBottomNav from '../components/AdminMobileBottomNav.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';

const AllProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 10;




    useEffect(() => {
        fetchProducts(page);
    }, [page]);



    const fetchProducts = async (currentPage) => {
        setLoading(true);
        try {
            const response = await Axios.get(`/api/products?page=${currentPage}&limit=${limit}`)

            // const data = await response.json();

            setProducts(response.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await Axios.delete(`/api/products/${id}`);

            setProducts(prev =>
                prev.filter(product => product._id !== id)
            );

            alert("Product deleted successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to delete product.");

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
            <div className=" container-fluid admin-card mb-5 mt-2" style={{ minWidth: 0 }}>

                <div className='d-flex justify-content-between'>
                    <h2 className="h6 mb-4">Product Management</h2>
                    <div className=" gap-2 mb-4 d-none d-md-flex">
                        <Link to="/newproduct" className="btn btn-primary btn-sm">New Product</Link>
                        <Link to="/admindashboard" className="btn btn-outline-secondary btn-sm ms-2">Dashboard</Link>
                    </div>
                </div>
                <div className="row g-2">
                    {products?.map((product) => (
                        <div key={product._id} className=" col-6 col-md-4 col-lg-3 card border-0 rounded-4 shadow-sm h-100">

                            <Link
                                to={`/editProduct/${product._id}`}
                                className="text-decoration-none text-dark"
                            >
                                <img
                                    src={product.imagespath?.[0]?.url}
                                    className="card-img-top"
                                    style={{
                                        height: 220,
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h6>{product.title}</h6>

                                    <div className="fw-bold">
                                        ₦{product.price}
                                    </div>

                                    {product.previousPrice > 0 && (
                                        <small className="text-decoration-line-through text-muted">
                                            ₦{product.previousPrice}
                                        </small>
                                    )}

                                </div>
                            </Link>

                            <div className="card-footer bg-white border-0 d-flex gap-2">

                                <Link
                                    to={`/editProduct/${product._id}`}
                                    className="btn btn-warning flex-fill"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger flex-fill"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(product._id);
                                    }}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                    <div className="d-flex justify-content-between mt-4 mx-2 mb-4">
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
                </div>


            </div >
            <AdminMobileBottomNav />
        </>
    );
};

export default AllProduct;