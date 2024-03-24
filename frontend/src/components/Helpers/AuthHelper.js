import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllSponsors = async () => {
    try {
        const response = await axios.get("http://localhost:8000/all_sponsors");
        const data = response.data;
        return data;
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};

function showNotification(message) {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function clearCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function useInterceptor() {
    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    console.log("Unauthorized access detected.");
                    clearCookies();
                    localStorage.clear();
                    sessionStorage.clear();
                    toast.promise(
                        new Promise((resolve, reject) => {
                            showNotification("Sorry, you are not authorized to access this page. Please login to continue");
                            setTimeout(resolve, 5000);
                        }),
                        {
                            pending: "Please wait...",
                            success: "Redirecting to login page...",
                            error: "Error redirecting to login page"
                        }
                    ).then(() => {
                        window.location = "/";
                    });
                }
                return Promise.reject(error);
            }
        );
    }, []);
}

export const login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8000/login", {
            email: email,
            password: password
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while logging in.");
        }
    }
};

export const logout = async (sessionId) => {
    try {
        const response = await axios.post("http://localhost:8000/logout", {
            session_id: sessionId,
        }, {
            method: "POST",
            credentials: "include"
        });
        localStorage.clear();
        sessionStorage.clear();

        return response;
    } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
            console.log("hi")
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while logging out.");
        }
    }
}

export const signup = async (
    address = null,
    first_name = null,
    last_name = null,
    sponsor_name = null,
    admin_name = null,
    role_id,
    sponsor_id,
    email,
    password
) => {
    try {
        const response = await axios.post("http://localhost:8000/signup", {
            address,
            first_name,
            last_name,
            sponsor_name,
            admin_name,
            role_id,
            sponsor_id,
            email,
            password
        })
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred during registration.");
        }
    }
};

export const saveToLocalStorage = (data) => {
    Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
    });
};

export const saveToSessionStorage = (data) => {
    Object.keys(data).forEach((key) => {
        sessionStorage.setItem(key, data[key]);
    });
};

export const getRoleName = (roleId) => {
    const roles = {
        1: "Admin",
        2: "Sponsor",
        3: "Driver",
    };
    return roles[roleId] || "Unknown";
};

export const fetchLoginInfo = () => {
    return localStorage.getItem("uniqueId") || sessionStorage.getItem("uniqueId");
};

export const fetchSessionId = () => {
    return localStorage.getItem("sessionId") || sessionStorage.getItem("sessionId");
};

export const reset = async (email) => {
    try {
        const response = await axios.post("http://localhost:8000/password_reset", { email }, {
            withCredentials: true
        });
        if (response.data["success"]) {
            toast.success("Email sent!", {
                closeButton: false
            });
        }
    } catch (error) {
        if ((error.response && error.response.status === 400) || error.response.status === 401) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while looking up item(s).");
        }
    }
};
