import {atom} from 'recoil';

export const cartItem = atom({
    key: "cartItem",
    default: {
        statusCode: 200,
        data: [],
        message: '',
        success: false
      }
})