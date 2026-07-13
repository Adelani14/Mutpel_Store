import Helpcenter from "../components/Helpcenter.jsx";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/axiosInstance.js";
import MobileBottomNav from "../components/MobileBottomNav.jsx";

const Wishlist = () => {


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








                            <div className="row g-2">

                                {products
                                    .filter(item => item.product)
                                    .map((item) => (

                                        <div key={item._id}
                                            className=" col-6 col-md-3 col-lg-2 card border-0 rounded-4 shadow-sm h-100"
                                        >

                                            <div className="card border-0 rounded-4 shadow-sm h-100 overflow-hidden product-card">

                                                <div className="position-relative">

                                                    <Link to={`/productdetail/${item.product._id}`}>

                                                        <img src={item.product?.imagespath[0]?.url}
                                                            className="card-img-top"
                                                            style={{
                                                                height: 220,
                                                                objectFit: "cover",
                                                            }} alt={item.product?.title} />
                                                    </Link>

                                                    {item.product?.discountPercentage > 0 && (
                                                        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                                            -{item.product?.discountPercentage}%
                                                        </span>
                                                    )}

                                                    <button
                                                        className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
                                                    >
                                                        <i className="bi bi-heart"></i>
                                                    </button>

                                                </div>

                                                <div className="card-body">

                                                    <Link to={`/productdetail/${item.product._id}`} className="text-decoration-none text-dark">
                                                        <h2 className="h5 mb-2">{item.product?.title}</h2>
                                                    </Link>



                                                    <div className="fw-bold fs-5">
                                                        ₦{item.product?.price}
                                                    </div>

                                                    {item.product?.previousPrice > 0 && (
                                                        <small className="text-decoration-line-through text-muted">
                                                            ₦{item.product?.previousPrice}
                                                        </small>
                                                    )}

                                                </div>

                                            </div>
                                        </div>
                                    ))}





                            </div>


                        </div>
                    </div>
                </main>

            )};
            <MobileBottomNav />

        </>

    );
};

export default Wishlist;