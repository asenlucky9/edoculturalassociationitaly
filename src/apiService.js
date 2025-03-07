import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
    const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
    });
    return response.data;
};

export const registerMember = async (memberData) => {
    const response = await axios.post(`${apiUrl}/members`, memberData);
    return response.data;
};

// Add more functions for other API endpoints as needed
