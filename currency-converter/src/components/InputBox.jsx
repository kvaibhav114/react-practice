import { useId } from 'react'
import PropTypes from 'prop-types';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId()

    return (
        <div className={`bg-white p-4 rounded-lg text-sm flex flex-col sm:flex-row gap-4 shadow-md ${className}`}>
            <div className="w-full sm:w-1/2">
                <label htmlFor={amountInputId} className="text-gray-600 mb-2 block text-sm font-medium">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount || ''}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-full sm:w-1/2">
                <p className="text-gray-600 mb-2 text-sm font-medium">Currency Type</p>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    amount: PropTypes.number,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    currencyOptions: PropTypes.arrayOf(PropTypes.string),
    selectCurrency: PropTypes.string,
    amountDisable: PropTypes.bool,
    currencyDisable: PropTypes.bool,
    className: PropTypes.string,
};

export default InputBox;