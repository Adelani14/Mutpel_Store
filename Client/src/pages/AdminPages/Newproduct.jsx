import React, { useEffect, useState } from "react";
import Helpcenter from "../../components/Helpcenter.jsx";
import Header from "../../components/Header.jsx";
import { Link, NavLink } from "react-router-dom";
import Axios from "../../utils/axiosInstance.js";
import AdminMobileBottomNav from "../../components/AdminMobileBottomNav.jsx";
import ProductForm from "../../components/ProductForm.jsx";
const Newproduct = () => {


    return (

        <>
            <Helpcenter />
            <Header />

            <ProductForm mode="create" />

            <AdminMobileBottomNav />
        </>
    );
};

export default Newproduct;