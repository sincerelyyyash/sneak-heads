import axios from 'axios';
import { baseUrl } from '../Constants';
import { cartItem } from '../Recoil/cartAtom';
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";



// const token = localStorage.getItem("accessToken")
const token = Cookies.get("accessToken");
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(baseUrl + '/cart/add', {productId, quantity },{
      withCredentials: true,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const modifyProductQuantity = async (productId, quantity) => {
  try {
    const response = await axios.post(baseUrl+ '/cart/modify', { productId, quantity },{
      withCredentials: true,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await axios.post('${baseUrl}/cart/remove', {productId},{
      withCredentials: true,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchCartItems = () =>{
  const setCartItems = useSetRecoilState(cartItem);

  const getAllProductsFromCart = async () => {
    try {
      const cartDetails = await axios.get(`${baseUrl}/cart/getall`, {
        withCredentials: true,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartDetails.data);
    } catch (error) {
      throw error;
    }
  };

  return {getAllProductsFromCart}
};



export {
  addToCart,
  modifyProductQuantity,
  removeFromCart,
  fetchCartItems
};
