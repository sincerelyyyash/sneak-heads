import {atom} from 'recoil';

export const productDetails = atom({
    key: "productDetails",
    default: {
        statusCode: 200,
        data: [],
        message: '',
        success: false
      }
})