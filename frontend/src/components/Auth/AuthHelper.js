import axios from 'axios';

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
        if (error.response && error.response.status === 400) {
            throw error.response.data;
        } else {
            console.error(error);
            throw new Error("An error occurred while logging in.");
        }
    }
};

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
