import axios from 'axios';
import { baseUrl, stripePublicKey } from '../Constants';
import { loadStripe } from "@stripe/stripe-js";

const newOrder = async (shippingInfo,) => {
  try {
    const response = await axios.post(`${baseUrl}/order/new-order`, shippingInfo, {
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


const makeOrder = async (cartItems) => {

  const stripe = await loadStripe(
    stripePublicKey
  );

  try {
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'inr', 
        product_data: {
          name: item.product.name, 
        },
        unit_amount: item.subtotal * 100, 
      },
      quantity: item.quantity,
    }));

    
    const response = await axios.post(`${baseUrl}/order/create-checkout-session`, {
      lineItems,
    }, {
      withCredentials: true,
    });


    const sessionId  = response.data.message.id;

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });


  
    if (result.error) {
      throw new Error('Redirect to checkout failed');
    }
  } catch (error) {
    throw error;
  }
};




export {
  newOrder,
  cancelOrder,
  getAllOrders,
  makeOrder
};
