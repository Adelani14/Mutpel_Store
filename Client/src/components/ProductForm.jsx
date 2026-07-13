import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";

const ProductForm = ({ mode, initialData = null }) => {

    const [categories, setCategories] = useState([]);
    const [hasSizes, setHasSizes] = useState("none");
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stockCount: "",
        shortDescription: "",
        sku: "",
        sizes: [],
        colors: [],
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


    const handleSizesChange = (e) => {
        const sizeArray = e.target.value
            .split(",")
            .map(size => size.trim())
            .filter(Boolean);

        setSizes(sizeArray);

        setFormData({
            ...formData,
            sizes: sizeArray
        });
    };

    const handleColorsChange = (e) => {
        const colorArray = e.target.value
            .split(",")
            .map(color => color.trim())
            .filter(Boolean);

        setColors(colorArray);

        setFormData({
            ...formData,
            colors: colorArray
        });
    };

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

    const previousPrice = Number(formData.previousPrice) || 0;
    const discountAmount = Number(formData.discountAmount) || 0;

    const price = previousPrice - discountAmount;

    const discountPercentage =
        previousPrice > 0
            ? Math.round((discountAmount / previousPrice) * 100)
            : 0;






    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await Axios.get("/api/categories")


                setCategories(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchCategories();

    }, []);

    useEffect(() => {

        if (mode === "edit" && initialData) {

            setFormData({
                title: initialData.title,
                description: initialData.description,
                shortDescription: initialData.shortDescription,
                stockCount: initialData.stockCount,
                sku: initialData.sku,
                category: initialData.category._id,
                brand: initialData.brand,
                previousPrice: initialData.previousPrice,
                discountAmount: initialData.discountAmount,
                sizes: initialData.sizes,
                colors: initialData.colors
            });

            setImagespath(initialData.imagespath);

            if (initialData.sizes.length > 0) {
                setHasSizes("block");
            }

        }

    }, [mode, initialData]);

    const submitProduct = async () => {

        const errorMessage = document.getElementById("errorMessage3");

        if (!formData.title || !formData.description || !formData.stockCount || !formData.category || !formData.previousPrice || imagespath.length === 0) {

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


            let response;

            if (mode === "create") {

                response = await Axios.post(
                    "/api/products/createNewProduct",
                    data
                );

            } else {

                response = await Axios.put(
                    `/api/products/${initialData._id}`,
                    data
                );

            }

            console.log(response.data);

            alert(
                mode === "create"
                    ? "Product created successfully!"
                    : "Product updated successfully!"
            );
            console.log(result);


            if (mode === "create") {

                setFormData({
                    title: "",
                    description: "",
                    shortDescription: "",
                    stockCount: "",
                    sku: "",
                    category: "",
                    brand: "",
                    previousPrice: "",
                    discountAmount: "",
                });

                setImagespath([]);

            }




        } catch (error) {

            console.log(error);

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



            <main className="py-5 bg-light">
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-xl-2 d-none d-md-block">
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav flex-column nav-pills" aria-orientation="vertical">
                                    <Link to="/Newproduct" className="nav-link active rounded-4 mb-2">
                                        <i className="bi bi-box-seam me-2"></i>New Product
                                    </Link>
                                    <Link to="/Admindashboard" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                    </Link>
                                    <Link to="/Newcategory" className="nav-link rounded-4 mb-2">
                                        <i className="bi bi-folder-plus me-2"></i>New Category
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
                            <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                                <div>
                                    <p className="text-muted mb-1">Products /

                                        {
                                            mode === "create"
                                                ?
                                                "Creation"
                                                :
                                                "Editing"
                                        }</p>
                                    <h1 className="h4">

                                        {
                                            mode === "create"
                                                ?
                                                "Add New Product"
                                                :
                                                "Edit Product"
                                        }

                                    </h1>                                </div>

                                <div className="d-flex gap-2 d-block d-md-none">
                                    <Link
                                        to="/Newcategory"
                                        className="btn btn-primary btn-sm"
                                    >
                                        <i className="bi bi-folder-plus me-2"></i>
                                        New Category
                                    </Link>
                                </div>
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
                                            <label className="form-label fw-semibold"> Short Description</label>
                                            <textarea className="form-control" rows="4" placeholder="Craft a short story for this product..." id="description" value={formData.shortDescription} onChange={handleChange}></textarea>
                                        </div>
                                        
                                        <div>
                                            <label className="form-label fw-semibold">Description</label>
                                            <textarea className="form-control" rows="7" placeholder="Craft a compelling story for this product..." id="description" value={formData.description} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="form-check form-switch mt-3">
                                            <label className="form-check-label fw-semibold" htmlFor="sizesSwitch">Does this product have sizes?</label>
                                            <input className="form-check-input" type="checkbox" id="sizesSwitch" checked={hasSizes === "block"} onChange={(e) => setHasSizes(e.target.checked ? "block" : "none")} />
                                        </div>
                                        <div className="mb-4 mt-3" style={{ display: hasSizes }}>
                                            <label className="form-label fw-semibold">Sizes (comma-separated)</label>
                                            <input
                                                className="form-control"
                                                placeholder="S,M,L,XL"
                                                value={formData.sizes.join(",")}
                                                onChange={handleSizesChange}
                                            />
                                        </div>
                                        <div className="mb-4" style={{ display: hasSizes }}>
                                            <label className="form-label fw-semibold">Colors (comma-separated)</label>
                                            <input
                                                className="form-control"
                                                placeholder="Red,Blue,Green"
                                                onChange={handleColorsChange}
                                            />
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
                                                                src={
                                                                    image.url
                                                                        ? image.url
                                                                        : URL.createObjectURL(image)
                                                                } alt=""
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
                                    <div className="d-flex gap-2 mb-3 justify-content-end">
                                        <Link className="btn btn-outline-secondary btn-sm" to="/Admindashboard">
                                            Cancel
                                        </Link>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={submitProduct}
                                            disabled={loading}
                                        >
                                            {
                                                loading
                                                    ?
                                                    "Saving..."
                                                    :
                                                    mode === "create"
                                                        ?
                                                        "Save Product"
                                                        :
                                                        "Update Product"
                                            }
                                        </button>
                                    </div>

                                    <div className="card rounded-4 shadow-sm border-0 mb-4 p-4 editor-tip">
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
    )
}
export default ProductForm;