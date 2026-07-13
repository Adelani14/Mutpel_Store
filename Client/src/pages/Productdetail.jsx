import Helpcenter from "../components/Helpcenter.jsx";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import { Link, NavLink } from "react-router-dom";
import Header from "../components/Header.jsx";

const Productdetail = () => {


  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState({});

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = async (item) => {
    if (!item.product) return;
    setLoading(true);

    try {
      await Axios.put("/api/cart/updateCartItem", {
        productId: item.product._id,
        quantity: item.quantity + 1,
        size: item.size,
        color: item.color,
      });

      await fetchCart();

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }

  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;
    setLoading(true);

    try {
      await Axios.put("/api/cart/updateCartItem", {
        productId: item.product._id,
        quantity: item.quantity - 1,
        size: item.size,
        color: item.color,
      });

      await fetchCart();
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  };


  const fetchCart = async () => {
    try {
      const response = await Axios.get("/api/cart/getCart");

      const items = response.data.cart?.items || [];

      // setProducts(items);

      const currentItem = items.find(
        item => item.product?._id === id
      );

      setCartItem(currentItem || null);

    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }


  }



  const fetchProduct = async () => {
    try {
      const response = await Axios.get(`/api/products/getSingleProduct/${id}`)

      setProduct(response.data?.product);


      const categoryId = response.data.product.category._id;
      const relatedResponse = await Axios.get(`/api/products/relatedproducts/${categoryId}/${id}`)

      setRelatedProducts(relatedResponse.data.products || []);
    } catch (error) {
      console.log(error);
      setCartMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const addToCart = async () => {
    
    try {
      if (product.sizes?.length > 0 && !selectedSize) {
        setCartMessage("Please select a size");
        setCartSuccess(true);
        return;
      }

      if (product.colors?.length > 0 && !selectedColor) {
        setCartMessage("Please select a color");
        setCartSuccess(true);
        return;
      }
setLoading(true)
      const response = await Axios.post("/api/cart/addToCart", {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });

      const data = response.data;
      setLoading(false)

      setCartMessage("Product added successfully to cart");
      setCartSuccess(true);
      await fetchCart();

      setQuantity(1);
      setSelectedSize("");
      setSelectedColor("");

      setTimeout(() => {
        setCartSuccess(false);
        setCartMessage("");
      }, 3000);

    } catch (error) {
      console.log(error);
      setCartMessage(
        error.response?.data?.message || "Something went wrong"
      );
      setCartSuccess(true);
      

      setTimeout(() => {
        setCartSuccess(false);
        setCartMessage("");
      }, 3000);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await Axios.get("/api/cart/getCartCount")

      setCartCount(res.data?.count || 0);
    } catch (error) {
      console.log(error);
    }

  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.imagespath.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.imagespath.length - 1 : prev - 1
    );
  };



  useEffect(() => {

    if (!relatedProducts.length) return;

    const interval = setInterval(() => {

      setCurrentIndexes(prev => {

        const updated = { ...prev };

        relatedProducts.forEach(product => {

          const current = updated[product._id] || 0;

          updated[product._id] =
            current === product.imagespath.length - 1
              ? 0
              : current + 1;

        });

        return updated;

      });

    }, 2500);

    return () => clearInterval(interval);

  }, [relatedProducts]);



  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      try {

        await Promise.all([
          fetchProduct(),
          fetchCart(),
          fetchCartCount()
        ]);

        setCurrentImage(0);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, [id]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showGallery) return;

      if (e.key === "ArrowRight") nextImage();

      if (e.key === "ArrowLeft") previousImage();

      if (e.key === "Escape") setShowGallery(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGallery, product]);








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
      {/* <header className="container-fluid py-3">
        <div className="d-flex align-items-center gap-2">

          <div className="d-none d-md-flex align-items-center gap-2">
            <div
              className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white"
              style={{ width: "44px", height: "44px" }}
            >
              <i className="bi bi-basket-fill fs-5"></i>
            </div>

            <h1 className="h5 mb-0 text-primary">
              Motpel Household
            </h1>
          </div>

          <form className="flex-grow-1">
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                className="form-control border-0"
                placeholder="Search Products..."
              />

              <button className="btn btn-primary d-none d-sm-block">
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
                <i className="bi bi-person fs-4"></i>
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


        {cartSuccess && (
          <div className="position-fixed top-0 start-0 w-100 mt-2 px-3 z-3" style={{ zIndex: 9999 }} >
            <div className="shadow-lg py-3 bg-success text-white text-center rounded-3">
              {cartMessage}

            </div>
          </div>
        )}
      </header> */}
<Header />

{cartSuccess && (
  <div
    className="position-fixed start-0 w-100 px-3"
    style={{
      top: "70px",
      zIndex: 9999,
    }}
  >
    <div className="shadow-lg py-3 bg-success text-white text-center rounded-3">
      {cartMessage}
    </div>
  </div>
)}



      <main className="container-fluid py-2 bg-light">
        <section className="py-4 bg-body border-bottom">
          <div className="container">
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
              <div>
                <h6 className="text-muted mb-1">
                  <Link to="/productlisting">Home</Link> /
                  {product?.category?.title} /
                  {product?.title}
                </h6>
              </div>
              <div className="text-muted">In Stock</div>
            </div>

            <div className="row g-4" >
              <div className="col-lg-4 shadow-sm rounded-4 border-0 p-4">
                <div className="card rounded overflow-hidden border-0">
                  <img
                    src={product?.imagespath?.[currentImage]?.url}
                    className="img-fluid rounded-4"
                    style={{
                      width: "100%",
                      height: "420px",
                      objectFit: "contain",
                      cursor: "zoom-in",
                    }}
                    onClick={() => setShowGallery(true)}
                  />
                  <span>
                    {currentImage + 1} / {product?.imagespath?.length}
                  </span>
                </div>
                <div className="d-flex gap-2 mt-3 overflow-auto">
                  <button
                    className="btn btn-light rounded-circle shadow-sm"
                    onClick={previousImage}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  {product?.imagespath?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      onClick={() => { setCurrentImage(index); setShowGallery(true); }}
                      className={`rounded-3 ${currentImage === index
                        ? "border border-3 border-primary"
                        : "border"
                        }`}
                      style={{
                        width: 75,
                        height: 75,
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                  <button
                    className="btn btn-light rounded-circle shadow-sm"
                    onClick={nextImage}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className=" rounded-4 shadow-sm border-0 p-4 h-100">
                  {/* <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="badge bg-primary text-white">New Arrival</span>
                    <span className="text-muted">SKU: MK-2024</span>
                  </div> */}
                  <h2 className="h4">{product?.title}</h2>
                  <small>{product?.shortDescription}</small>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    {product?.ratings >= 0 && product?.ratings <= 9 && (

                      <div className="text-warning small">
                        <i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                      </div>
                    )}
                    {product?.ratings >= 10 && product?.ratings <= 19 && (

                      <div className="text-warning small">
                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></i>
                      </div>
                    )}
                    {product?.ratings >= 20 && (

                      <div className="text-warning small">
                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i>
                      </div>
                    )}
                    {/* <span className="text-muted">{product.ratings}</span> */}
                  </div>
                  <div className="mb-4">
                    <div>
                      <p className="fs-3 fw-bold">₦{product?.price}</p>
                      {product?.previousPrice > 0 && (
                        <span className="text-decoration-line-through text-muted fs-5 ms-3">₦{product.previousPrice}</span>
                      )}
                      {product?.discountPercentage > 0 && (
                        <span className="badge bg-primary  text-white ms-3">{product?.discountPercentage}% OFF</span>
                      )}
                    </div>

                    <span className="">{product?.stockCount} items left</span>
                    <div>
                      {product?.stockCount >= 1 && product?.stockCount <= 5 && (

                        <div className="bg-secondary rounded" style={{ width: "90%", height: "7px" }}>
                          <div className="bg-danger rounded" style={{ width: "5%", height: "7px" }}></div>
                        </div>
                      )}
                      {product?.stockCount >= 6 && product?.stockCount <= 9 && (

                        <div className="bg-secondary rounded" style={{ width: "90%", height: "7px" }}>
                          <div className="bg-primary rounded" style={{ width: "20%", height: "7px" }}></div>
                        </div>
                      )}
                      {product?.stockCount >= 10 && product?.stockCount <= 19 && (
                        <div className="bg-secondary rounded" style={{ width: "90%", height: "7px" }}>
                          <div className="bg-primary rounded" style={{ width: "40%", height: "7px" }}></div>
                        </div>
                      )}
                      {product?.stockCount >= 20 && (
                        <div className="bg-secondary rounded" style={{ width: "90%", height: "7px" }}>
                          <div className="bg-primary rounded" style={{ width: "70%", height: "7px" }}></div>
                        </div>
                      )}

                    </div>
                  </div>
                  {product?.sizes?.length > 0 && (
                    <div>
                      <div className="mt-2">
                        <p className="mb-2">Select Size</p>

                        <div className="d-flex flex-wrap gap-2">
                          {product?.sizes?.map((size, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`btn btn-sm ${selectedSize === size
                                ? "btn-primary"
                                : "btn-outline-primary"
                                }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        {selectedSize && (
                          <small className="text-muted">
                            Selected: {selectedSize}
                          </small>
                        )}
                      </div>
                    </div>
                  )}

                  {product?.colors?.length > 0 && (
                    <div className="mt-3 mb-4">
                      <p>Select Color</p>
                      <div className="d-flex align-items-center gap-2">
                        {product.colors.map(color => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`btn rounded-circle p-3 ${selectedColor === color
                              ? "border border-3 border-primary"
                              : "border"
                              }`}
                            style={{
                              backgroundColor: color,
                              width: "40px",
                              height: "40px",
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="d-none d-md-flex align-items-sm-center gap-3 mb-4">
                    {/* <button
                      onClick={addToCart}
                      disabled={isAddedToCart}
                      className={`btn btn-primary btn-lg w-100 w-sm-auto ${isAddedToCart ? "d-none" : ""
                        }`}
                    >
                      Add to Cart
                    </button> */}


                    {cartItem ? (
                      <div className="quantity-wrapper d-flex align-items-center gap-2">

                        <button
                          onClick={() => decreaseQuantity(cartItem)}
                          className="qty-btn"
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>

                        <span className="qty-value">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(cartItem)}
                          className="qty-btn"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>

                      </div>
                    ) : (
                      <button
                        onClick={addToCart}
                        className="add-cart-btn btn btn-primary btn-lg w-100 w-sm-auto"
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="list-group list-group-flush rounded-4 bg-light p-3">
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> Free delivery on orders over ₦100k</div>
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> 30-day hassle-free return</div>
                    <div className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-center gap-2"><i className="bi bi-check-circle-fill text-primary"></i> Safe & encrypted payments</div>
                  </div>
                </div>

              </div>
              {/* <div className="col-lg-4 shadow-lg rounded-4 border-0 p-4">
                <div className="border-1 border-bottom">
                  <h5 className="">Delivery & Returns</h5>
                </div>
                <div className="mt-2">
                  <h6>Choose your location</h6>
                </div>
                <div className="mt-3">

                  <select>
                    <option value="">gold</option>
                  </select>
                </div>
                
              

                

                <div className="mt-4">

                  <div className="d-flex w-100 gap-2 mt-2 border-1 pb-2 border-bottom">
                    <div className="">

                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-arrow-repeat  border-dark border p-2 rounded " viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                      </svg>

                    </div>
                    <div className="">
                      <h6>Return Policy</h6>
                      <div>Free return within 7 days for ALL eligible items</div>
                    </div>
                  </div>
                </div>

              </div> */}
            </div>


            <div className="card rounded-4 shadow-sm border-0 mt-5">
              <div className="card-body p-4">
                <ul className="nav nav-pills mb-4" role="tablist">
                  <li className="nav-item" role="presentation"><button className="nav-link active" data-bs-toggle="pill" data-bs-target="#description" type="button">Description</button></li>
                  <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#specs" type="button">Specifications</button></li>
                  <li className="nav-item" role="presentation"><button className="nav-link" data-bs-toggle="pill" data-bs-target="#reviews" type="button">Reviews ({product?.numReviews})</button></li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="description">
                    <p className="mb-0 text-muted">{product?.description}</p>
                  </div>
                  <div className="tab-pane fade" id="specs">
                    <ul className="list-unstyled text-muted mb-0">
                      <li className="mb-2"><strong>Blade:</strong> High-carbon stainless steel</li>
                      <li className="mb-2"><strong>Length:</strong> 8 inch</li>
                      <li className="mb-2"><strong>Weight:</strong> 210g</li>
                      <li><strong>Warranty:</strong> 2 years</li>
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="reviews">
                    <p className="mb-0 text-muted">{product?.reviews}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <h2 className="h5 mb-0">You Might Also Like</h2>
                <a href="/product-listing" className="text-primary text-decoration-none">Explore More</a>
              </div>

              <div className="row g-3">

                {relatedProducts.map((relatedProduct) => (

                  <div
                    key={relatedProduct._id}
                    className="col-6 col-md-4 col-lg-3"
                  >

                    <div className="card border-0 rounded-4 shadow-sm h-100 overflow-hidden product-card">
                      <Link
                        to={`/productdetail/${relatedProduct._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="position-relative">

                      <img
  src={
    relatedProduct?.imagespath?.[
      currentIndexes[relatedProduct._id] || 0
    ]?.url
  }
  className="card-img-top"
  style={{
    height: 220,
    objectFit: "cover",
  }}
/>

                          {relatedProduct.discountPercentage > 0 && (
                            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                              -{relatedProduct.discountPercentage}%
                            </span>
                          )}

                          <button
                            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
                          >
                            <i className="bi bi-heart"></i>
                          </button>

                        </div>

                        <div className="card-body">

                          <h6 className="fw-semibold">
                            {relatedProduct.title}
                          </h6>

                          <div className="text-warning small mb-2">
                            ★★★★☆
                          </div>

                          <div className="fw-bold fs-5">
                            ₦{relatedProduct.price}
                          </div>

                          {relatedProduct.previousPrice > 0 && (
                            <small className="text-decoration-line-through text-muted">
                              ₦{relatedProduct.previousPrice}
                            </small>
                          )}

                        </div>
                      </Link>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        </section >
      </main >




      <nav className="mobile2-bottom-nav d-md-none">

        <div className="mobile2-nav-icons">
          <NavLink to="/productlisting" className="mobile2-nav-icon">
            <i className="bi bi-house-fill"></i>
          </NavLink>

          <NavLink to="/cart" className="mobile2-nav-icon position-relative">
            <i className="bi bi-cart3"></i>

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {cartItem ? (
          <div className="quantity-wrapper">

            <button
              onClick={() => decreaseQuantity(cartItem)}
              className="qty-btn"
            >
              <i className="bi bi-dash-lg"></i>
            </button>

            <span className="qty-value">
              {cartItem.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(cartItem)}
              className="qty-btn"
            >
              <i className="bi bi-plus-lg"></i>
            </button>

          </div>
        ) : (
          <button
            onClick={addToCart}
            className="add-cart-btn"
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </button>
        )}

      </nav>




      {
        showGallery && (
          <div
            className="modal fade show d-block"
            style={{
              background: "rgba(0,0,0,.9)",
              zIndex: 99999,
            }}
            onClick={() => setShowGallery(false)}
          >
            <div
              className="modal-dialog modal-fullscreen"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content bg-dark border-0">

                <div className="modal-header border-0">
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowGallery(false)}
                  />
                </div>

                <div className="modal-body d-flex flex-column justify-content-center align-items-center">

                  <div className="position-relative">

                    <button
                      className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                      onClick={previousImage}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>

                    <img
                      src={product.imagespath[currentImage]?.url}
                      className="img-fluid"
                      style={{
                        maxHeight: "70vh",
                        objectFit: "contain",
                      }}
                    />

                    <button
                      className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                      onClick={nextImage}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>

                  </div>

                  <div className="text-white mt-3">
                    {currentImage + 1} / {product.imagespath.length}
                  </div>

                  <div className="d-flex gap-2 mt-4 flex-wrap justify-content-center">
                    {product.imagespath?.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        onClick={() => setCurrentImage(index)}
                        className={`rounded ${currentImage === index
                          ? "border border-3 border-primary"
                          : ""
                          }`}
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        )
      }

      <Footer />

    </>
  )
}
export default Productdetail;