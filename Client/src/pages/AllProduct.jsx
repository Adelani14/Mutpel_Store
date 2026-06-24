import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Helpcenter from '../components/Helpcenter.jsx';

const AllProduct = () => {
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
        setLoading(true);
        try {
            const response = await fetch(
                `https://mutpel-store.onrender.com/api/products?page=${currentPage}&limit=${limit}`,

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
                <i>Fetching products...</i>
            </div>
        );
    }






    return (
        <>
            <Helpcenter />
            <div className="admin-card  mx-5 mt-5" style={{ minWidth: 0 }}>

                <div className='d-flex justify-content-between'>
                    <h2 className="h6 mb-4">Product Management</h2>
                    <div className="d-flex gap-2 mb-4">
                        <Link to="/newproduct" className="btn btn-primary btn-sm">New Product</Link>
                        <Link to="/admindashboard" className="btn btn-outline-secondary btn-sm ms-2">Dashboard</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
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
                    <div className="d-flex justify-content-between mt-4 mx-5 mb-5">
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
        </>
    );
};

export default AllProduct;