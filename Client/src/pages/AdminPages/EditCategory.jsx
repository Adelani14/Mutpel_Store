import React, { useEffect, useState } from "react";
import Helpcenter from "../../components/Helpcenter.jsx";
import AdminHeader from "../../components/AdminHeader.jsx";
import Axios from "../../utils/axiosInstance.js";
import AdminMobileBottomNav from "../../components/AdminMobileBottomNav.jsx";
import CategoryForm from "../../components/CategoryForm.jsx";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    const { id } = useParams();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await Axios.get(
                    `/api/categories/getCategoryById/${id}`
                );

                setCategory(res.data.category);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
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
            <AdminHeader />

            {
                category &&
                <>
                    <h1>Category Loaded Successfully</h1>
                    <pre>{JSON.stringify(category, null, 2)}</pre>
                </>
            }

            <AdminMobileBottomNav />
        </>
    )
};
export default EditCategory;