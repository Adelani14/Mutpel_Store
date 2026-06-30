import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://mutpel-store.onrender.com",
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // Refresh access token
                await axiosInstance.post("/api/users/refresh-token");

                // Retry the original request
                return axiosInstance(originalRequest);

            } catch (err) {
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;