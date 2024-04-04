import axios from "axios"
import { baseUrl } from "../Constants";
import { useSetRecoilState } from "recoil";
import { productDetails } from "../Recoil/productAtoms";




export const useGetProducts = () => {
    const setProductData = useSetRecoilState(productDetails);

    const getProducts = async () => {
        try {
            const productDetails = await axios.get(baseUrl + '/product/allproducts')
            const data = productDetails.data;
            setProductData(data);
        } catch (error) {
            throw error;
        }
    }

    return { getProducts }; 
};


export const getProductDetails = async (productId) => {
    try {
        const productDetails = await axios.get(`${baseUrl}/product/get-products?productId=${productId}`);
        const data = productDetails.data;
        return data;
    } catch (error) {
        throw error;
    }
};

