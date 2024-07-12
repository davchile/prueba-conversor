const form = document.querySelector("#form")
const input = document.querySelector("#value-input")
const currency = document.querySelector("#currency")
const result = document.querySelector("#result")

//API dolar
const getUsd = async(amount)=> {
    try {
        const res = await fetch(`https://165.227.94.139/api/dolar`)
        const json = await res.json()
        console.log(json.serie)
        return json.serie[0].valor
        // console.log(json.serie[0])
        // return json.serie[0].valor
    } catch(error) {
        console.log(error)
        return "Not found"
    }
}

//API Euro
const getEuro = async(amount)=> {
    try {
        const res = await fetch(`https://165.227.94.139/api/euro`)
        const json = await res.json()
        console.log(json.serie)
        return json.serie[0].valor
    } catch(error) {
        console.log(error)
        return "Not found"
    }
}

//Renderizar resultado
// const renderExchange = (amount, exchangeRate, currencyType) => {
//     const convertedAmount = (amount / exchangeRate).toFixed(2);
//     const html = `<p>Resultado: ${convertedAmount} ${currencyType}</p>`;
//     result.innerHTML = html;
// }

// //**Evento del formulario */
// form.addEventListener("submit", async(e)=> {
//     e.preventDefault()
//     const amount = input.value.trim()
//     const selectedCurrecny = currency.value
//     let exchangeRate
//     if (selectedCurrecny === "USD") {
//         exchangeRate = await getUsd(amount)
//     } else if (selectedCurrecny === "Euro") {
//         exchangeRate = await getEuro(amount)
//     }
//     renderExchange(amount, exchangeRate, currencyType)
// })

// Renderizar resultado
const renderExchange = (amount, exchangeRate, currencyType) => {
    const convertedAmount = (amount / exchangeRate).toFixed(2); // Dividir para convertir de CLP a la moneda seleccionada
    const html = `<p>Resultado: ${convertedAmount} ${currencyType}</p>`;
    result.innerHTML = html;
};

// Evento del formulario
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = Number(input.value.trim());

    if (isNaN(amount) || amount <= 0) {
        result.innerHTML = "<p>Por favor, ingrese un monto válido en CLP.</p>";
        return;
    }

    const selectedCurrency = currency.value
    let exchangeRate

    if (selectedCurrency === "USD") {
        exchangeRate = await getUsd();
    } else if (selectedCurrency === "Euro") {
        exchangeRate = await getEuro();
    }

    if (exchangeRate !== null) {
        renderExchange(amount, exchangeRate, selectedCurrency);
    } else {
        result.innerHTML = "<p>No se pudo obtener la tasa de cambio. Intente nuevamente más tarde.</p>";
    }
});