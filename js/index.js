const API_KEY = "b8409885e4361252bc9c9142";
const API_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/pair/";
const API_KEY_2 = 'qle3ZwQ9pe0pWeba14W5lWPOrB6QPTmKWDdzNgEI';

const resultDiv = document.getElementById('result');
const flagDiv = document.getElementById('flagResult');

// Function to fetch exchange rate
function fetchExchangeRate(baseCurrency, targetCurrency, amount, selectedCountry1, selectedCountry2) {
    flagDiv.innerHTML='';
    const url = `${API_URL}${baseCurrency}/${targetCurrency}/${amount}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetch(`https://countryapi.io/api/name/${selectedCountry1}?apikey=${API_KEY_2}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const countryID = Object.keys(data)[0]
                const flagImg = `${data[countryID].flag.medium}`;

                const div1 = document.createElement('div');
                const img1 = document.createElement('img');
                const title1 = document.createElement('h2');

                img1.src = flagImg
                div1.className='baseCurrency'
                
                div1.appendChild(title1);
                div1.appendChild(img1);

                flagDiv.appendChild(div1);
            
            fetch(`https://countryapi.io/api/name/${selectedCountry2}?apikey=${API_KEY_2}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                const countryID2 = Object.keys(data)[0]
                const flagImg2 = `${data[countryID2].flag.medium}`;

                const div2 = document.createElement('div');
                const img2 = document.createElement('img');
                const title2 = document.createElement('h2');

                img2.src = flagImg2
                div2.className='targetCurrency'
        
                div2.appendChild(title2);
                div2.appendChild(img2);

                flagDiv.appendChild(div2);
            
            })
            .catch(error => {
                const errormsg = document.createElement('p')
                errormsg.textContent= `Error, flag not found! ${error}`;
                resultDiv.appendChild(errormsg);

                console.error('Error fetching target flag:', error);
            });
            })
            .catch(error => {
                console.error('Error fetching base flag:', error);
            });
            
                
                resultDiv.innerHTML = `Conversion rate from ${baseCurrency} to ${targetCurrency}: ${data.conversion_rate}<br>`;
                resultDiv.innerHTML += `Converted amount: ${data.conversion_result}`;
            })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Form submission event listener
document.getElementById('conversionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectElement = document.getElementById('baseCurrency');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const baseCurrencyUnsliced = selectedOption.textContent;
    const baseCurrency = baseCurrencyUnsliced.slice(0,3)

    const selectElement2 = document.getElementById('targetCurrency');
    const selectedOption2 = selectElement2.options[selectElement2.selectedIndex];
    const targetCurrencyUnsliced = selectedOption2.textContent;
    const targetCurrency = targetCurrencyUnsliced.slice(0,3)

    const selectedOptionCountry1 = selectElement.options[selectElement.selectedIndex];
    const selectedCountry1 = selectedOptionCountry1.value;

    const selectedOptionCountry2 = selectElement2.options[selectElement2.selectedIndex];
    const selectedCountry2 = selectedOptionCountry2.value;



    const amount = parseFloat(document.getElementById('amount').value);

    fetchExchangeRate(baseCurrency, targetCurrency, amount, selectedCountry1, selectedCountry2);
});