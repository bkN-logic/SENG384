import axios from 'axios';


const API_URL = 'http://localhost:5001/api';

export const getPeople = () => axios.get(`${API_URL}/people`);
export const createPerson = (data) => axios.post(`${API_URL}/people`, data);
export const updatePerson = (id, data) => axios.put(`${API_URL}/people/${id}`, data);
export const deletePerson = (id) => axios.delete(`${API_URL}/people/${id}`);