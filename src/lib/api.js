import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, 
  },
});

// response 攔截器
api.interceptors.response.use(
  (res) => {
    return {
      data: res.data,
      statusCode: res.status,
      message: res.statusText,
    };
  },
  (error) => {
    return Promise.reject({
      statusCode: error.response.status,
      message: error.response.statusText,
      data: error.response.data,
    });
  }
);

export default api;
