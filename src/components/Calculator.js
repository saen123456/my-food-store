import React, { useState } from "react";

const prices = {
  red: 50,
  green: 40,
  blue: 30,
  yellow: 50,
  pink: 80,
  purple: 90,
  orange: 120,
};

const Calculator = () => {
  const [order, setOrder] = useState({
    red: 0,
    green: 0,
    blue: 0,
    yellow: 0,
    pink: 0,
    purple: 0,
    orange: 0,
  });
  const [isMember, setIsMember] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const handleInputChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: parseInt(e.target.value) || 0,
    });
  };

  const calculatePrice = () => {
    let total = 0;

    // Calculate base price
    for (let item in order) {
      total += order[item] * prices[item];
    }

    // Apply discounts
    if (order.orange >= 2) {
      total -= order.orange * prices.orange * 0.05;
    }
    if (order.pink >= 2) {
      total -= order.pink * prices.pink * 0.05;
    }
    if (order.green >= 2) {
      total -= order.green * prices.green * 0.05;
    }

    // Apply member discount
    if (isMember) {
      total *= 0.9;
    }

    setTotalPrice(total.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Food Store Calculator
      </h2>
      {Object.keys(prices).map((item) => (
        <div className="mb-4" key={item}>
          <label
            htmlFor={item}
            className="block text-lg font-medium text-blue-800"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)} Set ({prices[item]}{" "}
            THB)
          </label>
          <input
            type="number"
            id={item}
            name={item}
            value={order[item]}
            onChange={handleInputChange}
            className="mt-2 block w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="flex items-center text-lg text-blue-800">
          <input
            type="checkbox"
            checked={isMember}
            onChange={() => setIsMember(!isMember)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Member Card (10% Discount)</span>
        </label>
      </div>
      <div className="mt-6">
        <button
          onClick={calculatePrice}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg shadow-lg transition duration-200"
        >
          Calculate
        </button>
      </div>
      {totalPrice !== null && (
        <div className="mt-6 text-2xl text-center font-bold text-blue-900">
          Total Price: {totalPrice} THB
        </div>
      )}
    </div>
  );
};

export default Calculator;
