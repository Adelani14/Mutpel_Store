import React, { useEffect, useState } from "react";
import Helpcenter from "../../components/Helpcenter.jsx";
import AdminHeader from "../../components/AdminHeader.jsx";
import { Link, NavLink } from "react-router-dom";
import Axios from "../../utils/axiosInstance.js";
import AdminMobileBottomNav from "../../components/AdminMobileBottomNav.jsx";
import CategoryForm from "../../components/CategoryForm.jsx";
const NewCategory = () => {


    return (

        <>
            <Helpcenter />
            <AdminHeader />

            <CategoryForm mode="create" />

            <AdminMobileBottomNav />
        </>
    );
};

export default NewCategory;
