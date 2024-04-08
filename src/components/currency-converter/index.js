import React, { useState } from 'react';
import { exchangeRates, defaultCurrency, defaultInput } from '../../data/exchangeRates';
import { preventNegative } from '../../utils/preventNegative';
import './styles.css';

function CurrencyConverter() {
  // Use useState hooks to manage the state
  const [currentCurrency, setCurrentCurrency] = useState("INR");
  const [inputValue, setInputValue] = useState(1);
  const [convertedValue, setConvertedValue] = useState(getInitialConvertedValue());

  function getInitialConvertedValue() {
    const rate = exchangeRates.find(rate => rate.currency === defaultCurrency).rate;
    return (defaultInput * rate).toFixed(3);
  }

  function handleCurrencyChange(event) {
    const newCurrency = event.target.value;
    setCurrentCurrency(newCurrency);
    const rate = exchangeRates.find(rate => rate.currency === newCurrency).rate;
    setConvertedValue((inputValue * rate).toFixed(3));
  }

  function handleInputChange(event) {
    const value = preventNegative(event); // assuming this function returns the value or false if negative
    if (value !== false) {
      setInputValue(value);
      const rate = exchangeRates.find(rate => rate.currency === currentCurrency).rate;
      setConvertedValue((value * rate).toFixed(3));
    }
  }

  function handleReset() {
    setCurrentCurrency("INR");
    setConvertedValue(0.012);
  }

  return (
    <div>
      <div className="layout-row justify-content-space-evenly min-height mt-75">
        <div className="layout-column w-35 pa-30 card">
          <select
            value={currentCurrency}
            onChange={handleCurrencyChange}
            className="mb-10"
            data-testid="select-currency"
          >
            {exchangeRates.map((data, index) => (
              <option key={index} value={data.currency}>{data.currency}</option>
            ))}
          </select>

          <input
            className="h-50"
            type="text" // change type to "text" to allow for decimal input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={preventNegative}
            placeholder={`Enter value in ${currentCurrency}`}
            data-testid="input-value"
          />
        </div>

        <div className="layout-column w-35 pa-30 card">
          <h3 className="mb-10 mt-0">USD</h3>
          <input
            className="h-50"
            type="text" // readonly inputs do not need to be type "number"
            value={convertedValue}
            readOnly
            data-testid="converted-value"
          />
        </div>
      </div>

      <div className="layout-row justify-content-center pa-20">
        <button onClick={handleReset} data-testid="clear-values">Reset</button>
      </div>
    </div>
  );
}

export default CurrencyConverter;
