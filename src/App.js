import "./index.css";

import { useState } from "react";

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [service, setService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  // Start Handle Functions
  function handleAmount(e) {
    const num = e.target.value;
    setBillAmount(Number(num));
  }

  function handleSelectChange(e) {
    setService(Number(e.target.value));
  }

  function handleFriendSelectChange(e) {
    setFriendService(Number(e.target.value));
  }

  function handleReset(e) {
    setBillAmount(0);
    setService(0);
    setFriendService(0);
  }

  // End Handle Functions

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-lg flex flex-col gap-y-6">
        <h1 className="text-black-700 font-bold text-4xl text-center">
          TIP CALCULATOR
        </h1>
        <BillInput billAmount={billAmount} addHandleAmount={handleAmount} />
        <ServiceRating label="How was the Service?">
          <select
            className="w-full border-2 border-sky-500 rounded-md px-3 py-2 focus:outline-none focus:border-violet-600"
            onChange={handleSelectChange}
            value={service}
          >
            <option value={0}>Dissatisfied (0%)</option>
            <option value={5}>It was okay (5%)</option>
            <option value={10}>It was good (10%)</option>
            <option value={15}>It was amazing! (15%)</option>
          </select>
        </ServiceRating>

        {/* Friend's service rating */}
        <ServiceRating label="How did your friend like the service?">
          <select
            className="w-full border-2 border-sky-500 rounded-md px-3 py-2 focus:outline-none focus:border-violet-600"
            onChange={handleFriendSelectChange}
            value={friendService}
          >
            <option value={0}>Dissatisfied (0%)</option>
            <option value={5}>It was okay (5%)</option>
            <option value={10}>It was good (10%)</option>
            <option value={15}>It was amazing! (15%)</option>
          </select>
        </ServiceRating>

        <Total
          service={service}
          friendService={friendService}
          billAmount={billAmount}
        />
        <Reset handleReset={handleReset} />
      </div>
    </div>
  );
}

function BillInput({ billAmount, addHandleAmount }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">How much was the bill?</p>
      <input
        className="w-full border-2 border-sky-500 rounded-md px-3 py-2 focus:outline-none focus:border-violet-600"
        type="text"
        onChange={addHandleAmount}
        value={billAmount}
      />
    </div>
  );
}

function ServiceRating({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">{label}</p>
      {children}
    </div>
  );
}

function Total({ service, friendService, billAmount }) {
  const averageTipPercent = service + friendService / 2;
  const tipAmount = (billAmount * averageTipPercent) / 100;
  const totalBill = billAmount + tipAmount;

  return billAmount ? (
    <p className="font-bold text-2xl text-center">
      You pay {totalBill.toFixed(2)}€<br /> ({billAmount}€ +{" "}
      {tipAmount.toFixed(2)}€ tip)
    </p>
  ) : (
    <p className="text-gray-500 text-center">
      Please, enter bill amount to calculate
    </p>
  );
}

function Reset({ handleReset }) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-cyan-400 text-white rounded-full py-2 px-6 hover:bg-violet-600"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
