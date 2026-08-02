import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";




const CategoryForm = ({ mode, initialData = null }) => {


    const fileInputRef = useRef(null);
    // const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        featured: false,
        priority: "Normal Priority",
    });
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleBannerChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setBannerImage(file);

        setBannerPreview(URL.createObjectURL(file));

    };





    useEffect(() => {

        if (mode === "edit" && initialData) {

            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                featured: initialData.featured || false,
                priority: initialData.priority || "Normal Priority",
            });

            setBannerPreview(initialData.imagespath?.[0] || null);
            setBannerImage(null);
        }

    }, [mode, initialData]);


    const saveCategory = async () => {


        try {
            setLoading(true);

            const data = new FormData();

            // append text fields
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // append banner image
            if (bannerImage) {
                data.append("imagespath", bannerImage);
            }



            let response;

            if (mode === "create") {

                response = await Axios.post(
                    "/api/categories/createCategory",
                    data
                );

            } else {

                response = await Axios.put(
                    `/api/categories/update/${initialData._id}`,
                    data
                );

            }

            console.log(response.data);




            alert(
                mode === "create"
                    ? "Category created successfully!"
                    : "Category updated successfully!"
            );

            if (mode === "create") {
                setFormData({
                    title: "",
                    description: "",
                    featured: false,
                    priority: "Normal Priority",
                });
                setBannerImage(null);
                setBannerPreview(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }


        } catch (error) {

            console.log(error);
            console.log(error.response?.data);


        }
        finally {

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



            <main className="py-4 bg-light">
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-xl-2 d-none d-md-block">
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav flex-column nav-pills" aria-orientation="vertical">
                                    <Link to="/Newcategory" className="nav-link active rounded-4 mb-2">
                                        <i className="bi bi-box-seam me-2"></i>New Categories
                                    </Link>
                                    <Link to="/Admindashboard" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                    </Link>
                                    <Link to="/Newproduct" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-folder-plus me-2"></i>New Product
                                    </Link>
                                    <Link to="/Orders" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-basket2 me-2"></i>Orders
                                    </Link>
                                    <Link to="/Products" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-box-seam me-2"></i>Products
                                    </Link>
                                    <Link to="/Settings" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-gear me-2"></i>Settings
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-10">
                            <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                                    <div>
                                        <p className="text-muted mb-1">Products / Category</p>
                                        <h1 className="h4 mb-0">
                                            {mode === "create" ? "Create Category" : "Edit Category"}
                                        </h1>
                                    </div>
                                    <div className="d-flex gap-2 d-block d-md-none">
                                        <Link to="/Newproduct" className="btn btn-primary btn-sm">
                                            <i className="bi bi-box-seam me-2"></i>New Product
                                        </Link>
                                    </div>
                                </div>

                                <div className="card rounded-4 border-0 p-4 mb-4 bg-white shadow-sm">
                                    <h2 className="h6 text-uppercase text-muted mb-3">Category Details</h2>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="form-label fw-semibold">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="e.g. Minimalist Home Decor"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            rows="6"
                                            placeholder="Describe the essence of this category..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="card rounded-4 border-0 p-4 bg-white shadow-sm">
                                    <h2 className="h6 text-uppercase text-muted mb-3">Banner Image</h2>
                                    <div className="border border-dashed rounded-4 p-4 text-center" style={{ minHeight: "250px" }}>
                                        {bannerPreview ? (
                                            <div className="h-100 d-flex flex-column justify-content-between">
                                                <img
                                                    src={bannerPreview}
                                                    alt="Banner preview"
                                                    className="img-fluid rounded-4 mb-3"
                                                    style={{ maxHeight: "170px", objectFit: "cover" }}
                                                />
                                                <label className="btn btn-outline-primary btn-sm mx-auto">
                                                    Change banner
                                                    <input type="file" accept="image/*" hidden onChange={handleBannerChange} />
                                                </label>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-3"><i className="bi bi-cloud-upload fs-1 text-primary"></i></div>
                                                <p className="fw-semibold mb-1">Drag and drop your banner here</p>
                                                <p className="text-muted small mb-3">Support for high-res JPG, PNG or WebP</p>
                                                <label className="btn btn-primary btn-sm">
                                                    Browse Files
                                                    <input
                                                        ref={fileInputRef}

                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleBannerChange}
                                                    />                                                </label>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mb-3 justify-content-end mt-4">

                                    <Link to="/admindashboard" className="btn btn-outline-secondary btn-sm">
                                        Cancel
                                    </Link>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={saveCategory}
                                        disabled={loading}
                                    >
                                        {
                                            loading
                                                ? "Saving..."
                                                : mode === "create"
                                                    ? "Create Category"
                                                    : "Update Category"
                                        }

                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3">
                            <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                <h2 className="h6 text-uppercase text-muted mb-3">Settings</h2>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="featured">Featured Category</label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="priority" className="form-label fw-semibold">Display Priority</label>
                                    <select
                                        id="priority"
                                        className="form-select"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option>Normal Priority</option>
                                        <option>High Priority</option>
                                        <option>Low Priority</option>
                                    </select>
                                </div>



                                <div className="card rounded-4 border-0 bg-light p-3 mb-3 text-center">
                                    <div className="small text-uppercase text-muted mb-2">Live preview</div>
                                    <div className="rounded-4 overflow-hidden mb-3" style={{ minHeight: "180px", background: "#f3f4f7" }}>
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="preview" className="w-100 h-100" style={{ objectFit: "cover" }} />
                                        ) : (
                                            <div className="h-100 d-flex align-items-center justify-content-center text-secondary">Banner preview</div>
                                        )}
                                    </div>
                                    <div className="text-start">
                                        <span className="badge bg-secondary-subtle text-secondary mb-2">New Category</span>
                                        <h3 className="h6 mb-1">{formData.title || "Your Title Here"}</h3>
                                        <p className="small text-muted mb-0">{formData.description || "Live preview of category thumbnail."}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>




        </>
    )
}
export default CategoryForm;