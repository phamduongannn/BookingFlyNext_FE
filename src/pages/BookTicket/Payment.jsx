import React from 'react';

const Payment = () => {
  return (
    <div className="payment-container max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <form className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name on Card
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="123"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
