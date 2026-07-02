import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";

const Header = () => {



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
    fetchCartCount();
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm sticky-top" style={{ zIndex: 1020 }}>

        <div className="container-fluid py-3">
          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              {/* <a href="/  " className="text-decoration-none d-flex align-items-center gap-2"> */}
              <div className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: "44px", height: "44px" }}><i className="bi bi-basket-fill fs-5"></i></div>
              <div><h1 className="h5 mb-0 text-primary">Motpel Household</h1></div>
            </div>
            <form className="flex-grow-1 mx-3 d-none d-md-flex" style={{ minWidth: "300px" }}>
              <div className="input-group shadow-sm rounded-pill overflow-hidden border border-1 border-secondary-subtle">
                <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                <input type="search" className="form-control border-0" placeholder="Search accessories, kitchen, shoes..." />
                <button className="btn btn-primary rounded-end" type="submit">Search</button>
              </div>
            </form>
            <div className="d-flex align-items-center gap-3">
              <a href="/cart" className="btn btn-link text-secondary position-relative p-0"><i className="bi bi-cart4 fs-5"></i><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span></a>
              <a href="login.html" className="btn btn-outline-primary btn-sm"><i className="bi bi-person"></i></a>
            </div>
          </div>
        </div>

      </header>
    </>
  );
};

export default Header;