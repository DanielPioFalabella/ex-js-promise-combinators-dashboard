const BASE_URL = "http://localhost:3333"

const danielCopia = structuredClone(daniel);
danielCopia.laptop.year = 2025;
console.log(danielCopia.laptop.year - daniel.laptop.year);

async function getDashboardData(query) {
    try {
        console.log(`sto caricando la query ${query}`)

    const promiseUno = fetch(`${BASE_URL}/destionations?search=${query}`).then(res => res.data)
    const promiseDue = fetch(`${BASE_URL}/weathers?search=${query}`).then(res => res.data)
    const promiseTre = fetch(`${BASE_URL}/airports?search=${query}`).then(res => res.data)

    const [destionation, weather, airport] = await Promise.all([promiseUno, promiseDue, promiseTre])

    return {
        city: destionation[0].city,
        country: destionation[0].country,
        temperature: weather[0].temperature,
        weather: weather[0].weather_description,
        airport: airport[0].name
    }
} catch(err) {
    throw new Error(`errore nella ricezione dei dati: ${err.message}`)
}
}

getDashboardData("london")
.then(results => {
    console.log(results)
    console.log([
        data.city, 
        data.country, 
        data.temperature, 
        data.weather, 
        data.airport
    ])
})
.catch(err => console.error(err))
