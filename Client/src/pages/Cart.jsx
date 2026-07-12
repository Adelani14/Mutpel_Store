import Helpcenter from "../components/Helpcenter.jsx";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import MobileBottomNav from "../components/MobileBottomNav.jsx";

const Cart = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await Axios.get("/api/cart/getCart");

            setProducts(response.data.cart?.items || []);



        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }


    }

    const totalPrice = products.reduce((total, item) => {
        if (!item.product) return total;

        return total + item.product.price * item.quantity;
    }, 0);

    const increaseQuantity = async (item) => {
        if (!item.product) return;
        setLoading(true)
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
        if (!item.product) return;
        setLoading(true)

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

    const removeFromCart = async (item) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to remove this product?"
        );

        if (!isConfirmed) return;
        setLoading(true)
        try {
            if (!item.product) return;

            await Axios.delete("/api/cart/removeFromCart", {
                data: {
                    productId: item.product._id,
                    size: item.size,
                    color: item.color,
                },
            });
            fetchCart(); // refresh cart
        } catch (error) {
            console.log(error);

        }
    };


    const clearCart = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to clear all Cart!?"
        );

        if (!isConfirmed) return;
        setLoading(true)
        try {
            await Axios.delete("/api/cart/clearCart");

            setProducts([]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
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
            <Header />


            {products.length === 0 ? (
                <div
                    className="d-flex justify-content-center align-items-center py-5"
                    style={{ minHeight: "70vh" }}
                >
                    <div className="text-center">

                        <div
                            className="bg-light rounded-circle mx-auto mb-4 d-flex justify-content-center align-items-center shadow-sm"
                            style={{
                                width: "130px",
                                height: "130px",
                            }}
                        >
                            <i
                                className="bi bi-cart-x text-primary"
                                style={{ fontSize: "4rem" }}
                            ></i>
                        </div>

                        <h2 className="fw-bold">
                            Your cart is empty
                        </h2>

                        <p
                            className="text-muted mx-auto mt-3"
                            style={{ maxWidth: "450px" }}
                        >
                            You haven't added any products yet. Explore our collection and
                            discover amazing items waiting for you.
                        </p>

                        <div className="mt-4">
                            <Link
                                to="/productlisting"
                                className="btn btn-primary btn-lg rounded-pill px-5"
                            >
                                <i className="bi bi-bag-fill me-2"></i>
                                Start Shopping
                            </Link>
                        </div>

                    </div>
                </div>
            ) : (

                <main className="py-3 bg-body mb-5">
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
                            <div className="d-none d-md-block">
                                <h6 className="text-muted mb-1"><Link to="/productlisting">Home</Link> </h6>
                            </div>
                        </div>
                        <div className="row g-4 align-items-center mb-4">
                            <div className="col-lg-8">
                                <div className="page-hero p-4 rounded-4 bg-white shadow-lg">
                                    <h1 className="h3 mb-2">Your Selection</h1>
                                    <p className="text-muted mb-0">Review your curated items before moving to checkout.</p>
                                </div>
                            </div>
                            {/* <div className="col-lg-4 text-lg-end">
                            <a href="checkout2.html" className="btn btn-primary btn-lg">Proceed to Checkout</a>
                        </div> */}
                        </div>

                        <div className="row g-4">




                            <div className="col-lg-8">

                                <div className="card rounded-4 border-0 shadow-lg p-4">
                                    {products
                                        .filter(item => item.product)
                                        .map((item) => (

                                            <div key={item._id} className="cart-item-card p-2 rounded-4 mb-2 border-2 border-bottom">
                                                <div className="row g-3 align-items-center " >
                                                    <div className="col-sm-4">
                                                        <Link to={`/productdetail/${item.product._id}`}>

                                                            <img src={item.product?.product.imagespath[0]?.url} className="img-fluid rounded-4" alt={item.product?.title} />
                                                        </Link>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <span className="badge bg-primary-subtle text-primary mb-2">{item.product?.category.title}</span>

                                                        <Link to={`/productdetail/${item.product._id}`} className="text-decoration-none text-dark">
                                                            <h2 className="h5 mb-2">{item.product?.title}</h2>
                                                        </Link>

                                                        <a className="text-danger small fw-semibold text-decoration-none" onClick={() => removeFromCart(item)}><i className="bi bi-trash me-1"></i>Remove Item</a>
                                                    </div>
                                                    <div className="col-sm-3 text-sm-end">

                                                        <div className="input-group w-100 w-sm-50 d-inline-flex align-items-center px-2 py-1">
                                                            <button onClick={() => decreaseQuantity(item)} className="btn btn-outline-secondary text-light bg-primary" type="button"><i className="bi bi-dash"></i></button>
                                                            <input type="text" className="form-control text-center" value={item.quantity} readOnly aria-label="Quantity" />
                                                            <button onClick={() => increaseQuantity(item)}
                                                                className="btn btn-outline-secondary text-light bg-primary" type="button"><i className="bi bi-plus"></i></button>
                                                        </div>
                                                        <p className="h5 fs-4 fw-bold text-primary mt-3 mb-0">₦{item.product?.price}</p>
                                                    </div>
                                                </div>

                                            </div>

                                        ))}

                                    <div><button onClick={clearCart} className="btn btn-danger btn-sm mt-3"><i className="bi bi-trash me-1"></i>
                                        Clear Cart
                                    </button>
                                    </div>



                                    <div className="promo-card rounded-4 overflow-hidden mt-3">
                                        <div className="row g-0">
                                            <div className="col-md-7 p-4 bg-primary text-white">
                                                <h3 className="h5 mb-3">Complete the Look</h3>
                                                <p className="mb-4 opacity-75">Our curators recommend the ‘Monolith’ incense burner to accompany your glass vessel.</p>
                                                <button className="btn btn-warning btn-sm">Add for $85</button>
                                            </div>
                                            <div className="col-md-5 promo-visual"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card rounded-4 border-0 shadow-lg p-4 h-100">
                                    <h2 className="h6 mb-4">Order Summary</h2>
                                    {products
                                        .filter(item => item.product)
                                        .map((item) => (

                                            <div key={item._id} className="d-flex border-1 border-bottom align-items-center gap-3 mb-4">
                                                <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                                <div className="">
                                                    <h3 className="h6 mb-1">{item.product?.title}</h3>
                                                    <div>
                                                        {item.size?.length > 0 && (
                                                            <small className="text-muted mb-0">Size: <b>{item.size}</b></small>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {item.color?.length > 0 && (
                                                            <small className="text-muted mb-0">Color: <b>{item.color}</b></small>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <small className="text-muted mb-0">Quantity: <b>{item.quantity}</b></small>
                                                    </div>

                                                    <p className="fw-semibold text-danger mt-2 mb-0">₦{item.product.price * item.quantity}</p>

                                                </div>
                                            </div>
                                        ))}
                                    {/* <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="summary-thumb bg-secondary-subtle rounded-4"></div>
                                    <div>
                                        <h3 className="h6 mb-1">Curator’s Journal Set</h3>
                                        <p className="text-muted mb-0">Hand-bound / 3-Pack</p>
                                        <p className="fw-semibold mt-2 mb-0">$370.00</p>
                                    </div>
                                </div> */}
                                    <div className=" pt-3 mt-3">
                                        {/* <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal</span><span>₦{totalPrice}</span></div> */}
                                        {/* <div className="d-flex justify-content-between mb-4"><span className="text-muted">Shipping</span><span className="text-success fw-semibold">₦1000</span></div> */}
                                        <div className="d-flex justify-content-between align-items-center fw-semibold fs-5"><span>Total</span><span>₦{totalPrice}</span></div>
                                    </div>
                                    {/* <a href="checkout2.html" className="btn btn-primary btn-lg w-100 mt-4">Proceed to Checkout</a> */}
                                    <Link to="/checkout" className="btn btn-primary btn-lg w-100 mt-4">Proceed to Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            )};
            <MobileBottomNav />

        </>

    );
};

export default Cart;