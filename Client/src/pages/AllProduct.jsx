import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helpcenter from '../components/Helpcenter.jsx';
import Axios from "../utils/axiosInstance.js"
import AdminMobileBottomNav from '../components/AdminMobileBottomNav.jsx';
import Header from '../components/Header.jsx';

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
            <div className="admin-card mb-5 mx-5 mt-2" style={{ minWidth: 0 }}>

                <div className='d-flex justify-content-between'>
                    <h2 className="h6 mb-4">Product Management</h2>
                    <div className=" gap-2 mb-4 d-none d-md-flex">
                        <Link to="/newproduct" className="btn btn-primary btn-sm">New Product</Link>
                        <Link to="/admindashboard" className="btn btn-outline-secondary btn-sm ms-2">Dashboard</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-secondary">
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>{products.map((product) => (
                            <tr key={product._id} style={{ cursor: 'pointer', }} onClick={() => window.location.href = `/product/${product._id}`}>
                                < td > {product.title}</td>
                                <td>{product.category.title}</td>
                                <td>{product.price}</td>
                                <td>{product.stockCount} units</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-sm"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
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