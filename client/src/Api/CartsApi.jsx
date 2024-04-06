import axios from 'axios';
import { baseUrl } from '../Constants';


export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(`${baseUrl}/cart/add/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const modifyProductQuantity = async (productId, quantity) => {
  try {
    const response = await axios.post(`${baseUrl}/cart/modify/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const removeFromCart = async (productId) => {
  try {
    const response = await axios.post(`${baseUrl}/cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllProductsFromCart = async () => {
  try {
    const response = await axios.post(`${baseUrl}/cart/getall`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
