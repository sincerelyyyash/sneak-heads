import axios from 'axios';
import { baseUrl } from '../Constants';
import { loadStripe } from "@stripe/stripe-js";

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


const makeOrder = async (shippingInfo, cartItems) => {

  const stripe = await loadStripe(
    "pk_test_51MK2RCSC4lsmbX4Li7HOOyMsDEqk3QRn4rYb7i9IFRyQci2NuCEDivoqrayPKK2avGNvJblyfMW6kMjlwTMoi5O700SKV4DtYA"
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
      shippingInfo,
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
