import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userAddress } from '../Recoil/userAtoms'; 

function BillingInfo({ userName, userEmail }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAddressData, setUserAddressData] = useRecoilState(userAddress); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'pincode':
        setPincode(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const updateAddressData = () => {
    setUserAddressData({
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    });
  };

  return (
    <div className="w-full p-5 shadow-lg lg:max-w-lg mt-10 rounded-lg bg-white">
      <div className="space-y-2">
        <div className='flex flex-col px-10 py-10 m-4'>
          <h3 className='flex justify-center text-coral-red text-3xl font-palanquin'>
            Billing Info
          </h3>
          <div>
            <p className="text-lg font-palanquin">Name: {userName}</p>
          </div>
          <div>
            <p className="text-lg font-palanquin">Email address: {userEmail}</p>
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="country">Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={pincode}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingInfo;
