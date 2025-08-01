const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const result = document.querySelector('.result');


// Arrays to populate the select tags with there contries
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "KRW", name: "South Korean Won" },
    { code: "ZAR", name: "South African Rand" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "AED", name: "United Arab Emirates Dirham" }
];


//Showing countries from array to selected tag

countries.forEach(country => {
    const option2 = document.createElement('option');
    const option1 = document.createElement('option');

    option1.value = option2.value=country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;


    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    //For showing default values
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
})


// Function
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    result.textContent = "Fetching Exchange Rates...."

    if (isNaN(amount) || amount <= 0) {
        convertedAmountElement.value = '';
        result.textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        if(typeof conversionRate === 'undefined'){
             result.textContent ='Exchnage rate data is not available.';
        }
        else{
             convertedAmountElement.value = convertedAmount;
             result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }

        


    } catch (error) {
        result.textContent = 'Error fetching exchange rate.';
       // console.error(error);
       converterContainer.innerHTMl = `<h2> Error fetching exchange rate.  <h2>`
    }
};


// Fetching exchnage rate when user inputs the amount
fromAmountElement.addEventListener('input' ,getExchangeRate);

// Fetch exchnage rate when uwer chnage currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change',getExchangeRate);

window.addEventListener('load', getExchangeRate);
