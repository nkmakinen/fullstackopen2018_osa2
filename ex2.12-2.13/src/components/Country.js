import React from 'react'

const Country = ({ country }) => {
    if (Object.keys(country).length === 0) { // empty
        return (
            <div></div>
        )
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img height="50" src={country.flagSrc} alt="country flag" />
        </div>
    )
}

export default Country