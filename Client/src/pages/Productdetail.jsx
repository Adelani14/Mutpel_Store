import Helpcenter from "../components/Helpcenter.jsx";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import { Link, NavLink } from "react-router-dom";

const Productdetail = () => {


  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cartSuccess, setCartSuccess] = useState(false);
  const [isAdded, setisAdded] = useState(true);
  const [QisAdded, setQisAdded] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = async (item) => {
    if (!item.product) return;

    try {
      await Axios.put(`/api/cart/updateCartItem/${id}`, {
        productId: item.product._id,
        quantity: item.quantity + 1,
        size: item.size,
        color: item.color,
      });

      await fetchCartCount();

    } catch (error) {
      console.log(error);
    }

  };

  const decreaseQuantity = async (item) => {
    if (!item.product) return;


    try {
      await Axios.put(`/api/cart/updateCartItem/${id}`, {
        productId: item.product._id,
        quantity: item.quantity - 1,
        size: item.size,
        color: item.color,
      });

      await fetchCartCount();
    } catch (error) {
      console.log(error);
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

      const response = await Axios.post("/api/cart/addToCart", {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });

      const data = response.data;

      setCartMessage("Product added successfully to cart");
      setCartSuccess(true);
      setIsAddedToCart(true)
      setQisAdded(true)
      setisAdded(false)
      fetchCartCount();

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



  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          fetchProduct(),
          fetchCartCount(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);








  return (
    <>

      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(5px)",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }}></div>

          <h5 className="mt-3 fw-semibold text-dark">
            Loading...
          </h5>
        </div>
      )}
      <Helpcenter />
      <header className="bg-white shadow-sm sticky-top" style={{ zIndex: 1020 }}>

        <div className="container-fluid py-3">
          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
            <div className="d-none d-md-flex align-items-center gap-2">
              <div className="brand-icon rounded-3 d-flex align-items-center justify-content-center bg-primary text-white" style={{ width: "44px", height: "44px" }}><i className="bi bi-basket-fill fs-5"></i></div>
              <div><h1 className="h5 mb-0 text-primary">Motpel Household</h1></div>
            </div>
            <form className="flex-grow-1 mx-3  d-flex" style={{ minWidth: "300px" }}>
              <div className="input-group shadow-sm rounded-pill overflow-hidden border border-1 border-secondary-subtle">
                <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i></span>
                <input type="search" className="form-control border-0" placeholder="Search Products..." />
                <button className="btn btn-primary rounded-end" type="submit">Search</button>
              </div>
            </form>
            <div className="d-flex align-items-center gap-3 d-flex">
              <Link to="/cart" className="btn btn-link text-secondary position-relative p-0"><i className="bi bi-cart4 fs-5"></i><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartCount}</span></Link>
              <div className="product_detail_dropdown position-absolute">...</div>
            </div>
          </div>
        </div>


        <div className="d-none position-relative bg-white text-dark thedropdown">
          <Link to="/productlisting"><i className="bi bi-house"></i>Home</Link>
          <Link to="/categories"><i className="bi bi-list"></i>Categories</Link>
          <Link to="/wishlist"><i className="bi bi-heart"></i>Wishlist</Link>
          <Link to="/profile"><i className="bi bi-person"></i>Account</Link>


        </div>


        {cartSuccess && (
          <div
            className="position-fixed top-0 start-0 w-100 mt-2 px-3 z-3"
            style={{ zIndex: 9999 }}
          >
            <div className="shadow-lg py-3 bg-success text-white text-center rounded-3">
              {cartMessage}
            </div>
          </div>
        )}
      </header>



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
              <div className="col-lg-4 shadow-lg rounded-4 border-0 p-4">
                <div className="card rounded overflow-hidden border-0">
                  <img src={product?.imagespath?.[0]} className="img-fluid" alt={product?.title} style={{ height: "260px" }} />
                </div>
                <div className="d-flex align-items-center gap-3 mt-3 overflow-auto">
                  <a href={product?.imagespath?.[1]} target="_blank" rel="noopener noreferrer">
                    <img src={product?.imagespath?.[1]} className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }} alt={product?.title} />
                  </a>
                  <a href={product?.imagespath?.[2]} target="_blank" rel="noopener noreferrer">
                    <img src={product?.imagespath?.[2]} className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }} />
                  </a>
                  <a href={product?.imagespath?.[3]} target="_blank" rel="noopener noreferrer">
                    <img src={product?.imagespath?.[3]} className="img-fluid rounded-2" style={{ width: "80px", height: "80px" }} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="card rounded-4 shadow-sm border-0 p-4 h-100">
                  {/* <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="badge bg-primary text-white">New Arrival</span>
                    <span className="text-muted">SKU: MK-2024</span>
                  </div> */}
                  <h2 className="h4">{product?.title}</h2>
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
                      <span className="fs-3 fw-bold">₦{product?.price}</span>
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
                    <button
                      onClick={addToCart}
                      disabled={isAddedToCart}
                      className={`btn btn-primary btn-lg w-100 w-sm-auto ${isAddedToCart ? "d-none" : ""
                        }`}
                    >
                      Add to Cart
                    </button>
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
                  <div className=" product-card col-6 col-sm-4 col-xl-3" key={relatedProduct._id}>
                    <div className="card rounded-4 shadow-sm border-0 h-100">
                      <img src={relatedProduct?.imagespath[0]} className="card-img-top rounded-top-4" alt={relatedProduct?.title} style={{ height: 160 }} />
                      <div className="card-body">
                        <h3 className="h6">{relatedProduct?.title}</h3>
                        <p className="text-muted mb-2">₦{relatedProduct?.price}</p>
                        <a href={`/productdetail/${relatedProduct._id}`} className="btn btn-primary btn-sm">View</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="row g-4">
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-xl-3">
                  <div className="card rounded-4 shadow-sm border-0 h-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" className="card-img-top rounded-top-4" alt="Product" />
                    <div className="card-body">
                      <h3 className="h6">Samsung Galaxy Watch</h3>
                      <p className="text-muted mb-2">₦82,000</p>
                      <a href="/product-details" className="btn btn-primary btn-sm">view</a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section >
      </main >




      <nav className="mobile-bottom-nav d-md-none">

        <NavLink to="/productlisting">
          <i className="bi bi-house fs-5"></i>
        </NavLink>

        <NavLink to="/cart">
          <i className="bi bi-megaphone fs-5"></i>
        </NavLink>

        {isAdded && (
          <div>
            <button
              onClick={addToCart}
              disabled={isAddedToCart}
              className={`btn btn-primary btn-lg w-100 w-sm-auto ${isAddedToCart ? "d-none" : ""
                }`}
            >
              Add to Cart
            </button>
          </div>
        )}

        {QisAdded && (
          <div className="input-group w-90">
            <button onClick={decreaseQuantity} disabled={isAddedToCart}
              className="btn btn-outline-secondary text-light bg-primary" type="button"><i className="bi bi-dash"></i></button>
            <input type="text" className="form-control text-center" value={quantity} readOnly aria-label="Quantity" />
            <button onClick={increaseQuantity} disabled={isAddedToCart}
              className="btn btn-outline-secondary text-light bg-primary" type="button"><i className="bi bi-plus"></i></button>
          </div>
        )}


      </nav>








      <Footer />

    </>
  )
}
export default Productdetail;