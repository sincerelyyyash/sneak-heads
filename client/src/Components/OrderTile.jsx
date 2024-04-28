import React, { useState, useEffect } from 'react';
import { getProductDetails } from '../Api/ProductsApi'; 
import { cancelOrder } from '../Api/OrdersApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';

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
      createdAt,
    } = order;

    const successToast = (message) => {
        toast.success(message);
      };
      const failureToast = (message) => {
        toast.error(message);
      };

    const [productDetails, setProductDetails] = useState([]);
    const handleCancelOrder = async (orderId) => {
        try {
          await cancelOrder(orderId);
          successToast("Order Cancelled!");
        } catch (error) {
            failureToast("Order cancellation failed!");
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
        <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 sm:justify-between w-full">
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Order Items</h3>
            <div className='mb-4'>
              {productDetails.map((product, index) => (
                <OrderItemTile key={index} product={product} />
              ))}
            </div>
            <p className="text-lg font-semibold font-palanquin">Shipping Address: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.pincode}</p>
            <p className="text-md font-semibold font-palanquin">Order placed on: {createdAt.slice(0, 10)}</p>
            <p className="text-gray-500 font-palanquin">Order Id: {_id}</p>
            <p className="text-gray-500 font-palanquin">Subtotal: ₹{subtotal}</p>
            <p className="text-gray-500 font-palanquin">Tax: ₹{tax}</p>
            <p className="text-gray-500 font-palanquin">Shipping Charge: ₹{shippingCharge}</p>
            <p className="text-gray-500 font-palanquin">Discount: ₹{discount}</p>
          </div>
          <div className='flex flex-col justify-between sm:m-8 sm:p-2'>
            <p className="text-lg font-semibold font-montserrat mb-2">Total: ₹{total}</p>
            <p className="text-lg font-semibold font-palanquin mb-2">Status: {shippingInfo.status}</p>
            {shippingInfo.status !== 'Cancelled' && <Button square={true} label={'Cancel Order'} onClick={() => handleCancelOrder(_id)}/>}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
};
  
export default OrderTile;
