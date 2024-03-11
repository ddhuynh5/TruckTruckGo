import axios from 'axios';

export const sponsor = async (unique_id) => {
    try {
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/sponsors', {
            unique_id: unique_id
        }, {
            withCredentials: true
        });
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

export const all_sponsors = async () => {
    try {
        const response = await axios.get('https://trucktruckgo-backend.onrender.com/all_sponsors', {
            withCredentials: true
        });
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

export const driver = async (id) => {
    try {
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/current_driver', {
            unique_id: id
        }, {
            withCredentials: true
        });
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

export const driversList = async (id) => {
    try {
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/drivers', {
            unique_id: id
        }, {
            withCredentials: true
        });
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

export const specific = async (role, id) => {
    try {
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/specific', {
            role_id: role,
            unique_id: id
        }, {
            withCredentials: true
        });
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

export const update = async (id, updateParams) => {
    try {
        const response = await axios.post('https://trucktruckgo-backend.onrender.com/update', {
            unique_id: id,
            ...updateParams
        }, {
            withCredentials: true
        });
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