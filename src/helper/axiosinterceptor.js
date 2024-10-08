import axios from "axios";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  
  try {
    const decodeToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decodeToken.exp < currentTime;
  } catch (err) {
    console.error("Invalid token:", err)
    return true;
  }
}

const axiosinterceptor = () => {
  const apiClient = axios.create();
  
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    async (config) => {
      const token = localStorage.getItem("accessToken");
      
      if (token != null) {
        if (isTokenExpired(token)) {
          console.log("Access token expired")
          
          const decodeToken = jwtDecode(token);
          const userId = decodeToken.id;
          
          const response = await apiClient.get(
            `http://localhost:8080/user/getbyid/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          console.log(response)

          const { accesstoken } = response.data;
          console.log("Access token:" + accesstoken)
          localStorage.setItem("accessToken", accesstoken)
          config.headers["Authorization"] = `Bearer ${accesstoken}`;
        } else {
          console.log("Access token is valid")
          config.headers["Authorization"] = `Bearer ${token}`
        }
      }
      return config;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        window.location.href = "/";
      }
      return Promise.reject(error)
    }
  )
}

export default axiosinterceptor