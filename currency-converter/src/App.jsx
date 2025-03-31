import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [to, setTo] = useState("inr");
  const [from, setFrom] = useState("usd");

  const currencyInfo = useCurrencyInfo(from);
  const currencyOptions = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to] || 1));
  };

  return (
    <div className="bg-gray-200 h-screen w-full">
      <div className="text-center pt-5">
        <h1 className="text-3xl font-bold">Currency Converter</h1>
      </div>
      <div className="max-w-md mx-auto my-10 p-5 bg-gray-100 rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            currencyOptions={currencyOptions}
            onCurrencyChange={setFrom}
            selectCurrency={from}
            amountDisable={false}
          />

          <div className="flex justify-center my-2">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            onAmountChange={setConvertedAmount}
            currencyOptions={currencyOptions}
            onCurrencyChange={setTo}
            selectCurrency={to}
            amountDisable={true}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
