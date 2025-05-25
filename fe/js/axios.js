// js/axios.js

const baseURL = "http://localhost:4000"; 

const axiosJWT = axios.create({
  baseURL,
  withCredentials: true, // kirim cookie refreshToken
});

// ✅ Interceptor: tambahkan token akses
axiosJWT.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Simpan ke window agar bisa dipakai global
window.axiosJWT = axiosJWT;

// ✅ Interceptor: auto-refresh token jika expired
axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${baseURL}/refresh`, {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Set ulang Authorization
        axiosJWT.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosJWT(originalRequest); // ⬅️ Ulang request yang gagal
      } catch (refreshError) {
        console.error("Refresh token gagal:", refreshError);
        localStorage.clear();
        window.location.href = "login.html";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
