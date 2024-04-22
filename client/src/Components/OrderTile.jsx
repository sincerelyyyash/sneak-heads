import React, { useState, useEffect } from 'react';
import { getProductDetails } from '../Api/ProductsApi'; 
import SquareButton from './SquareButton';
import { cancelOrder } from '../Api/OrdersApi';

const OrderItemTile = ({ product }) => {
    const { name, imgURLs, quantity, subtotal } = product;
  
    return (
      <div className="flex items-center justify-between border-b border-gray-300 py-2">
        <div className='flex flex-row'>
          <img src={imgURLs[0]} alt={name} className="w-16 h-16 object-cover rounded-md" />
          <div className="flex flex-col justify-center ml-4">
            <p className="text-lg font-semibold font-montserrat">{name}</p>
            <p className="text-gray-500 font-palanquin">Quantity: {quantity}</p>
          </div>
        </div>
        <p className="text-lg font-normal">Subtotal: ₹{subtotal}</p>
      </div>
    );
};
  
const OrderTile = ({ order }) => {
    const {
      shippingInfo,
      orderItems,
      subtotal,
      tax,
      shippingCharge,
      discount,
      total,
      _id,
    } = order;
  
    const [productDetails, setProductDetails] = useState([]);
    const handleCancelOrder = async ({_id}) => {
        try {
          await cancelOrder(_id);

        } catch (error) {
          console.error('Error cancelling order:', error);
        }
      };
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        const details = [];
        for (const item of orderItems) {
          try {
            const productDetail = await getProductDetails(item.product);
            details.push({ ...productDetail, quantity: item.quantity, subtotal: item.subtotal });
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        }
        setProductDetails(details);
      };
  
      fetchProductDetails();
    }, [orderItems]);
  
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 py-4">
        <div className="flex gap-4 mb-4 sm:mb-0 p-4 justify-between">
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Order Items</h3>
            <div className='mb-4'>
              {productDetails.map((product, index) => (
                <OrderItemTile key={index} product={product} />
              ))}
            </div>
            <p className="text-lg font-semibold font-palanquin">Shipping Address: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.pincode}</p>
            <p className="text-gray-500 font-palanquin">Subtotal: ₹{subtotal}</p>
            <p className="text-gray-500 font-palanquin">Tax: ₹{tax}</p>
            <p className="text-gray-500 font-palanquin">Shipping Charge: ₹{shippingCharge}</p>
            <p className="text-gray-500 font-palanquin">Discount: ₹{discount}</p>
          </div>
          <div className='m-8 p-2'>
            <p className="text-lg font-semibold font-montserrat mb-2">Total: ₹{total}</p>
            <p className="text-lg font-semibold font-palanquin mb-2">Status: {shippingInfo.status}</p>
            {shippingInfo.status !== 'Cancelled' && <SquareButton label={'Cancel Order'} onClick={() => handleCancelOrder(_id)}/>}
          </div>
        </div>
      </div>
    );
};
  
export default OrderTile;