import axios from 'axios';
import { baseUrl } from '../Constants';

const newOrder = async (orderData) => {
  try {
    const response = await axios.post(`${baseUrl}/order/new-order`, orderData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const cancelOrder = async (orderId) => {
  try {
    const response = await axios.post(`${baseUrl}/order/cancel-order`, { orderId }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/order/all-orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  newOrder,
  cancelOrder,
  getAllOrders
};
