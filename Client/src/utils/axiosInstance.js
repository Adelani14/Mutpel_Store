import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://mutpel-store.onrender.com",
    withCredentials: true,
});

// Attach access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh expired token
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
                const res = await axiosInstance.post(
                    "/api/users/refresh-token"
                );

                localStorage.setItem(
                    "accessToken",
                    res.data.accessToken
                );

                return axiosInstance(originalRequest);

            } catch (err) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;