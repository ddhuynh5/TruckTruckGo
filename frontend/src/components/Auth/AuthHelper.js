import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getAllSponsors = async () => {
    try {
        const response = await axios.get('https://trucktruckgo-backend.onrender.com/all_sponsors');
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

function clearCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
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
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/login', {
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

export const logout = async () => {
    try {
        const response = await fetch('https://trucktruckgo-backend.onrender.com/logout', {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.clear();
        sessionStorage.clear();
        return response;
    } catch (error) {
        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
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
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/signup', {
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

export const saveCookies = (cookie_data) => {
    Object.keys(cookie_data).forEach((key) => {
        document.cookie = `${key}=${cookie_data[key]}; path=/;`;
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
