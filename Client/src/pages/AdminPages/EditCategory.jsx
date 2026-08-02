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
            <Helpcenter />
            <AdminHeader />
            {category && (
                <>
                    <h1>Category Loaded Successfully</h1>
                    <pre>{JSON.stringify(category, null, 2)}</pre>
                </>
            )}
        </>
    )
}

export default EditCategory;