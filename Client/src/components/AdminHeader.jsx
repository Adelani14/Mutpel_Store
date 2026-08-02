const AdminHeader = () => {
    return (
        <>
            <header className="bg-white shadow-sm sticky-top" style={{ height: "80px", zIndex: 1100 }}>
                <div className="container-fluid py-3">
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <div
                                className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white"
                            >
                                <img
                                    src="/icons/logo.png"
                                    alt="Mutpel Logo"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                            <div><h1 className="h5 mb-0 text-primary">Mutpel Household</h1></div>
                        </div>
                        <div className="d-flex align-items-center gap-3 d-none d-md-flex">
                            <button className="btn btn-primary btn-sm"><a href="/NewProduct" className="text-white text-decoration-none">New Product</a></button>
                        </div>

                        <div className="dropdown d-block d-md-none">
                            <button
                                className="btn btn-link text-primary"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots fs-4"></i>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link to="/admindashboard" className="dropdown-item"><i className="bi bi-house me-2"></i>Dashboard</Link></li>
                                <li><Link to="/productlisting" className="dropdown-item"><i className="bi bi-house me-2"></i>Banner</Link></li>
                                <li><Link to="/allcategories" className="dropdown-item"><i className="bi bi-list me-2"></i>Categories</Link></li>
                                <li><Link to="/cart" className="dropdown-item"><i className="bi bi-gift me-2"></i>Coupons</Link></li>
                                <li><Link to="/cart" className="dropdown-item"><i className="bi bi-bell me-2"></i>Updates</Link></li>
                                <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person me-2"></i>Account</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header >
        </>)
}
export default AdminHeader;