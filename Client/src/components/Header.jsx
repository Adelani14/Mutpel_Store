import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const [cartCount, setCartCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      const res = await Axios.get("/api/cart/getCartCount")

      setCartCount(res.data?.count || 0);
    } catch (error) {
      console.log(error);
    }

  };

 useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    fetchCartCount();
  }
}, []);

  return (
    <>
      <header className="container-fluid py-3 bg-white shadow-sm sticky-top">
        <div className="d-flex align-items-center gap-2">

          <div className="d-none d-md-flex align-items-center gap-2">
            <div
              className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white"
            >
              <img
                src="/icons/logo.png"
                alt="Mutpel Logo"
                className="img-fluid"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            </div>

            <h1 className="h5 mb-0 text-primary">
              Motpel Household
            </h1>
          </div>

          <form onSubmit={handleSearch} className="flex-grow-1">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <Link
              to="/cart"
              className="btn btn-link text-secondary position-relative p-0 d-none d-md-block"
            >
              <i className="bi bi-cart4 fs-4"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-link text-primary"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots fs-4"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link to="/productlisting" className="dropdown-item"><i className="bi bi-house me-2"></i>Home</Link></li>
                <li><Link to="/categories" className="dropdown-item"><i className="bi bi-list me-2"></i>Categories</Link></li>
                <li><Link to="/wishlist" className="dropdown-item"><i className="bi bi-heart me-2"></i>Wishlist</Link></li>
                <li><Link to="/cart" className="dropdown-item"><i className="bi bi-cart me-2"></i>Cart</Link></li>
                <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person me-2"></i>Account</Link></li>
              </ul>
            </div>
          </div>

        </div>



      </header>
    </>
  );
};

export default Header;