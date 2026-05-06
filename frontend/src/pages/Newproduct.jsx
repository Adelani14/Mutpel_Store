import Helpcenter from "../components/Helpcenter";
import Header from "../components/Header";

const Newproduct = () => {
    return (
        <>
            <Helpcenter />
            <Header />


            <main className="py-5">
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-xl-2">
                            <div className="card rounded-4 shadow-sm border-0 p-3 h-100">
                                <div className="nav flex-column nav-pills" aria-orientation="vertical">
                                    <a className="nav-link rounded-4 mb-2" href="admin-dashboard.html"><i className="bi bi-speedometer2 me-2"></i>Dashboard</a>
                                    <a className="nav-link active rounded-4 mb-2" href="#"><i className="bi bi-box-seam me-2"></i>New Product</a>
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
                                    <button className="btn btn-outline-secondary btn-sm">Cancel</button>
                                    <button className="btn btn-primary btn-sm">Save Product</button>
                                </div>
                            </div>

                            <div className="row g-4">
                                <div className="col-lg-8">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                        <h2 className="h6 text-uppercase text-muted mb-3">General Information</h2>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Product Name</label>
                                            <input type="text" className="form-control" placeholder="e.g. Minimalist Ceramic Vessel" />
                                        </div>
                                        <div>
                                            <label className="form-label fw-semibold">Description</label>
                                            <textarea className="form-control" rows="7" placeholder="Craft a compelling story for this product..."></textarea>
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
                                            <input type="file" multiple accept="image/*" className="upload-input" />
                                        </div>
                                        <div className="row g-3 thumb-grid">
                                            <div className="col-6 col-sm-4 col-xl-3">
                                                <div className="thumb-item overflow-hidden rounded-3 bg-secondary-subtle">
                                                    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=60" alt="Product image" className="w-100 h-100" style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>
                                            <div className="col-6 col-sm-4 col-xl-3">
                                                <div className="thumb-item d-flex align-items-center justify-content-center text-muted">
                                                    <i className="bi bi-image fs-3"></i>
                                                </div>
                                            </div>
                                            <div className="col-6 col-sm-4 col-xl-3">
                                                <div className="thumb-item d-flex align-items-center justify-content-center text-muted">
                                                    <i className="bi bi-image fs-3"></i>
                                                </div>
                                            </div>
                                            <div className="col-6 col-sm-4 col-xl-3">
                                                <div className="thumb-item d-flex align-items-center justify-content-center text-muted">
                                                    <i className="bi bi-image fs-3"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4 status-card">
                                        <h2 className="h6 text-uppercase text-muted mb-3">Status & Category</h2>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Category</label>
                                            <select className="form-select">
                                                <option selected>Select category</option>
                                                <option>Electronics</option>
                                                <option>Kitchen</option>
                                                <option>Fashion</option>
                                                <option>Home & Living</option>
                                            </select>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="inventoryStatus" checked />
                                            <label className="form-check-label fw-semibold" for="inventoryStatus">Active Listing</label>
                                        </div>
                                    </div>

                                    <div className="card rounded-4 shadow-sm border-0 p-4 mb-4">
                                        <h2 className="h6 text-uppercase text-muted mb-3">Pricing & Inventory</h2>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₦</span>
                                                    <input type="text" className="form-control" placeholder="0.00" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Discount</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">%</span>
                                                    <input type="text" className="form-control" placeholder="0.00" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mt-3">
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">Stock Count</label>
                                                <input type="number" className="form-control" value="0" />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-semibold">SKU</label>
                                                <input type="text" className="form-control" value="VES-001" />
                                            </div>
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