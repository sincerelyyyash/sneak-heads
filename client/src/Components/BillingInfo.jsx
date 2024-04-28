import React, { useState, useEffect } from 'react';
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

  const [errors, setErrors] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
  
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
        sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
        setPincode(sanitizedValue);
        break;
      case 'phoneNumber':
        sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(sanitizedValue);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setUserAddressData({
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    });
  }, [address, city, state, country, pincode, phoneNumber, setUserAddressData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNumber: ''
    };

    if (!address) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!state) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!country) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    if (!pincode || pincode.length !== 6) {
      newErrors.pincode = 'Pincode must be a 6-digit number';
      valid = false;
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be a 10-digit number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
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
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
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
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
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
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
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
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>
          <div className='mt-2'>
            <label className="text-lg font-montserrat text-gray-500" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              className='w-full border border-gray-300 h-10 mt-3 rounded-lg p-2'
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingInfo;
