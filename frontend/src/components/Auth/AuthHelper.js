import axios from 'axios';

function clearCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized access detected.");
            clearCookies();
            localStorage.clear();
            sessionStorage.clear();
            window.location = "/";
            alert("Sorry, you are not authorized to access this page. Please login to continue");
        }
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8000/login', {
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
        const response = await fetch('http://localhost:8000/logout', {
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
    first_name,
    last_name,
    address,
    role_id,
    sponsor_id,
    email,
    password
) => {
    try {
        const response = await axios.post('http://localhost:8000/signup', {
            first_name,
            last_name,
            address,
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
