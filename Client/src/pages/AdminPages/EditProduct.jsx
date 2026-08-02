import React, { useEffect, useState } from "react";
import Helpcenter from "../../components/Helpcenter.jsx";
import Header from "../../components/Header.jsx";
import Axios from "../../utils/axiosInstance.js";
import AdminMobileBottomNav from "../../components/AdminMobileBottomNav.jsx";
import ProductForm from "../../components/ProductForm.jsx";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await Axios.get(
                    `/api/products/getSingleProduct/${id}`
                );

                setProduct(res.data.product);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
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

            {
                product &&
                <CategoryForm
                    mode="edit"
                    initialData={product}
                />
            }

            <AdminMobileBottomNav />
        </>
    )
};
export default EditProduct;