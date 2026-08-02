import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Helpcenter from '../../components/Helpcenter.jsx';
import Axios from "../../utils/axiosInstance.js"
import AdminMobileBottomNav from '../../components/AdminMobileBottomNav.jsx';
import AdminHeader from '../../components/AdminHeader.jsx';

const AllCategories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    // const limit = 15;
    const [totalPages, setTotalPages] = useState(1);




    useEffect(() => {
        fetchCategories(page);
    }, [page]);



    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await Axios.get(`/api/categories?page=${page}`);

            setCategories(response.data);

            setTotalPages(response.data.totalPages);

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

            await Axios.delete(`/api/categories/delete/${id}`);

            setCategories(prev =>
                prev.filter(categories => categories._id !== id)
            );

            alert("category deleted successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to delete category.");

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
            <AdminHeader />
            <div className="mb-4 container-fluid admin-card mb-5 mt-2" style={{ minWidth: 0 }}>

                <div className='d-flex justify-content-between'>
                    <h2 className="h6 mb-4">Product Categories Management</h2>
                    <div className=" gap-2 mb-4 d-none d-md-flex">
                        <Link to="/newcategory" className="btn btn-primary btn-sm"><i className='bi bi-plus '></i>New</Link>
                        <Link to="/admindashboard" className="btn btn-outline-secondary btn-sm ms-2">Dashboard</Link>
                    </div>
                </div>

                <div className="row g-3 mb-2">
                    {categories?.map((category) => (
                        <div
                            key={category._id}
                            className="category-card"
                        >
                            <button
                                className="card shadow-sm rounded-4 h-100 border-0 overflow-hidden w-100">
                                <img
                                    src={category.imagespath?.[0]?.url}
                                    className="card-img-top"
                                    style={{
                                        height: 170,
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="card-body">
                                    <h6 className="fw-bold">{category.title}</h6>
                                    <Link to={`/browseCategory/${category._id}`}>
                                        <small className="text-muted">Browse products →</small>
                                    </Link>

                                    <div className="card-footer bg-white border-0 d-flex gap-2">

                                        <Link
                                            to={`/editCategory/${category._id}`}
                                            className="btn btn-warning flex-fill"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger flex-fill"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(category._id);
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>

                            </button>



                        </div>
                    ))}

                    <div className="d-flex justify-content-between my-4 mx-2 mb-4">
                        <button
                            className="btn btn-outline-secondary"
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            <i className="bi bi-chevron-left"></i>
                            Previous
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
                </div>


            </div >
            <AdminMobileBottomNav />
        </>
    );
};

export default AllCategories;