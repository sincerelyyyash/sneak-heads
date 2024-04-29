import axios from 'axios';
import { baseUrl } from '../Constants';
import { cartItem, cartTotal } from '../Recoil/cartAtom';
import { useSetRecoilState } from "recoil";

const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(baseUrl + '/cart/add', {productId, quantity },{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
};

const modifyProductQuantity = async (productId, quantity) => {
  try {
    const response = await axios.post(baseUrl+ '/cart/modify', { productId, quantity },{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await axios.post(baseUrl+'/cart/remove', {productId},{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
};

const fetchCartItems = () => {
  const setCartItems = useSetRecoilState(cartItem);
  const setCartTotal = useSetRecoilState(cartTotal);

  const getAllProductsFromCart = async () => {
    try {
      const cartDetails = await axios.get(`${baseUrl}/cart/getall`, {
        withCredentials: true,
      });
      const { products, total } = cartDetails.data.data;
      setCartItems(products);
      setCartTotal(total);
    } catch (error) {
      // throw error;
    }
  };

  return { getAllProductsFromCart };
};




export {
  addToCart,
  modifyProductQuantity,
  removeFromCart,
  fetchCartItems
};
