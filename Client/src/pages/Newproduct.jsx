import React, { useEffect, useState } from "react";
import axios from "../utils/axiosinstance.js";
import Helpcenter from "../components/Helpcenter.jsx";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
const Newproduct = () => {

    const token = localStorage.getItem("accessToken") || null;


    // Fetch categories for dropdown
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await fetch(
                    "http://localhost:4350/api/categories/fetchCategories",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );

                const data = await response.json();

                setCategories(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchCategories();

    }, []);




    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stockCount: "",
        sku: "",
        category: "",
        brand: "",
        previousPrice: "",
        discountAmount: "",
    });

    const [imagespath, setImagespath] = useState([]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

    };
    const previousPrice = Number(formData.previousPrice) || 0;
    const discountAmount = Number(formData.discountAmount) || 0;

    const price = previousPrice - discountAmount;

    const discountPercentage =
        previousPrice > 0
            ? Math.round((discountAmount / previousPrice) * 100)
            : 0;




    const handleImages = (e) => {

        const files = Array.from(e.target.files);

        // setImages(files);
        setImagespath((prev) => [...prev, ...files]);
    };


    const removeImage = (indexToRemove) => {

        const filteredImages = imagespath.filter(
            (_, index) => index !== indexToRemove
        );

        setImagespath(filteredImages);

    };


    const [loading, setLoading] = useState(false);


    const saveProduct = async () => {

        const errorMessage = document.getElementById("errorMessage3");

        if (!formData.title || !formData.description || !formData.stockCount || !formData.category  || !formData.previousPrice || imagespath.length === 0) {

            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 2000);
            return;
        }


        try {


            setLoading(true);

            const data = new FormData();

            // append text fields
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // append images
            imagespath.forEach((image) => {
                data.append("images", image);
            });
            data.append("price", price);
            data.append("discountPercentage", discountPercentage);

            const addproduct = await fetch(
                'http://localhost:4350/api/products/createNewProduct',
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: data,
                }
            );





            const result = await addproduct.json();
            if (!addproduct.ok) {
                alert(result.message);
                return;
            }
            alert("Product created successfully!");

            console.log(result);

            setFormData({
                title: "",
                description: "",
                stockCount: "",
                sku: "",
                category: "",
                brand: "",
                previousPrice: "",
                discountAmount: "",
            });

            setImagespath([]);

        } catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };








    return (
        <>
            <Helpcenter />
            <Header />


            <main className="py-5 bg-light">
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-xl-2">
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav flex-column nav-pills" aria-orientation="vertical">
                                    <a className="nav-link active rounded-4 mb-2" href="#"><i className="bi bi-box-seam me-2"></i>New Product</a>
                                    <a className="nav-link rounded-4 mb-2" href="admin-dashboard.html"><i className="bi bi-speedometer2 me-2"></i>Dashboard</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-folder-plus me-2"></i>New Category</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-basket2 me-2"></i>Orders</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-box-seam me-2"></i>Products</a>
                                    <a className="nav-link rounded-4 mb-2" href="#"><i className="bi bi-gear me-2"></i>Settings</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-10">
                            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
                                <div>
                                    <p className="text-muted mb-1">Products / Inventory Creation</p>
                                    <h1 className="h4 mb-0">Add New Product</h1>
                                </div>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Link className="btn btn-outline-secondary btn-sm" to="/Admindashboard">
                                        Cancel
                                    </Link>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={saveProduct}
                                        disabled={loading}
                                    >
                                        {
                                            loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    ></span>

                                                    Saving...
                                                </>
                                            ) : (
                                                "Save Product"
                                            )
                                        }
                                    </button>                                </div>
                            </div>

                            <div className="row g-4">
                                <div className="col-lg-8">
                                    <div className="alert alert-danger" role="alert" id="errorMessage3" style={{ display: "none" }}>
                                        Please fill in all required fields.
                                    </div>
                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                        <h2 className="h6 text-uppercase text-muted mb-3">General Information</h2>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Product Name</label>
                                            {/* <input type="text" className="form-control" placeholder="e.g. Minimalist Ceramic Vessel" /> */}
                                            <input type="text" className="form-control" placeholder="e.g. Minimalist Ceramic Vessel" id="title" value={formData.title} onChange={handleChange} />

                                        </div>
                                        <div>
                                            <label className="form-label fw-semibold">Description</label>
                                            <textarea className="form-control" rows="7" placeholder="Craft a compelling story for this product..." id="description" value={formData.description} onChange={handleChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="card rounded-4 shadow-sm border-0 p-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div>
                                                <h2 className="h6 text-uppercase text-muted mb-1">Product Images</h2>
                                                <p className="small text-muted mb-0">Up to 8 images, max 5MB each</p>
                                            </div>
                                            <span className="badge bg-primary-subtle text-primary">Drag & drop</span>
                                        </div>
                                        <div className="upload-dropzone mb-4">
                                            <div className="text-center">
                                                <div className="mb-3"><i className="bi bi-cloud-upload fs-2"></i></div>
                                                <p className="mb-1 fw-semibold">Drag & drop your images here</p>
                                                <p className="text-muted small mb-0">or click to browse from your computer</p>
                                            </div>
                                            <input type="file" multiple onChange={handleImages} accept="image/*" className="upload-input" />
                                        </div>
                                        <div className="row g-3">

                                            {
                                                imagespath.map((image, index) => (

                                                    <div
                                                        className="col-6 col-sm-4 col-xl-3"
                                                        key={index}
                                                    >

                                                        <div className="position-relative">

                                                            <img
                                                                src={URL.createObjectURL(image)}
                                                                alt=""
                                                                className="w-100 rounded-3"
                                                                style={{
                                                                    height: "120px",
                                                                    objectFit: "cover"
                                                                }}
                                                            />



                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                                                onClick={() => removeImage(index)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>

                                                        </div>

                                                    </div>

                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4 status-card">
                                        <h2 className="h6 text-uppercase text-muted mb-3"> Category , Brand and Status </h2>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Category</label>
                                            <select
                                                className="form-select"
                                                id="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                            >

                                                <option value="">
                                                    Select category
                                                </option>

                                                {
                                                    categories.map((category) => (

                                                        <option
                                                            key={category._id}
                                                            value={category._id}
                                                        >

                                                            {category.title}

                                                        </option>

                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Brand</label>
                                            <input type="text" className="form-control" placeholder="e.g. Mutpel Co." id="brand" value={formData.brand} onChange={handleChange} />
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="inventoryStatus" defaultChecked />
                                            <label className="form-check-label fw-semibold" htmlFor="inventoryStatus">Active Listing</label>
                                        </div>
                                    </div>

                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                        <h2 className="h6 text-uppercase text-muted mb-3">Pricing & Inventory</h2>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Original Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₦</span>
                                                    <input type="number" className="form-control" placeholder="0.00" id="previousPrice" value={formData.previousPrice} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Discount Amount</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₦</span>
                                                    <input type="number" className="form-control" placeholder="0.00" id="discountAmount" value={formData.discountAmount} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-3 mt-3">
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Final Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₦{price}</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Percentage</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">{discountPercentage}%</span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Stock</label>
                                                <input type="number" placeholder="1" className="form-control" id="stockCount" value={formData.stockCount} onChange={handleChange} />
                                            </div>
                                            {/* <div className="col-6">
                                                <label className="form-label fw-semibold">SKU</label>
                                                <input type="text" className="form-control" id="sku" value={formData.sku} onChange={handleChange} />
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="card rounded-4 shadow-sm border-0 p-4 editor-tip">
                                        <div className="d-flex align-items-start gap-3">
                                            <div className="text-warning fs-4"><i className="bi bi-lightbulb"></i></div>
                                            <div>
                                                <h2 className="h6 mb-2">Editor’s Tip</h2>
                                                <p className="small mb-0 text-muted">High-quality photography with natural lighting increases conversion rates by up to 40% for editorial collections.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>
    );
};

export default Newproduct;