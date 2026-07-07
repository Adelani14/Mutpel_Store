import Axios from "../utils/axiosInstance.js";


const Profile = () => {

    const logout = async () => {
        try {
            await Axios.post("/api/users/logout");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <button className="nav-link rounded-4 mt-5 text-danger"  onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Sign Out</button>

        </>
    )
}

export default Profile;