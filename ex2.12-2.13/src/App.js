import React from 'react';
import axios from 'axios'
import Country from './components/Country.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filteredCountries: [],
            filter: '',
            notification: '',
            filteredCountry: { }
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    handleFilterChange = (event) => {
        var results = this.state.countries.filter((country) =>
            country.name.toLowerCase().includes(event.target.value.toLowerCase())
        )

        console.log("results:", results)

        if (event.target.value.length === 0) {
            results = []
        }

        var filteredCountry = {}
        if (results.length === 1) {
            filteredCountry.flagSrc = results[0].flag
            filteredCountry.capital = results[0].capital
            filteredCountry.population = results[0].population
            filteredCountry.name = results[0].name
        }

        var notificationText = ''
        if (results.length >= 10) {
            notificationText = 'too many matches, specify another filter'
            results = []
        }

        this.setState({ filter: event.target.value,
                        filteredCountries: results,
                        notification: notificationText,
                        filteredCountry: filteredCountry })
    }

    showCountryInfo = (numericCode) => {
        return() => {
            var clickedCountry = this.state.filteredCountries.filter(country => {
                return country.numericCode === numericCode
            })

            var country = {
                name: clickedCountry[0].name,
                capital: clickedCountry[0].capital,
                population: clickedCountry[0].population,
                flagSrc: clickedCountry[0].flag
            }
    
            this.setState({ filteredCountries: [], filteredCountry: country })
        }
    }
  
    render() {
        return (
            <div>
                <label>find countries:</label>
                <input
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                />
                <p>{this.state.notification}</p>
                <Country country={this.state.filteredCountry} />

                <div >
                    {this.state.filteredCountries.map((country) => {
                        if (Object.keys(this.state.filteredCountry).length !== 0) {
                            return // filtered country is shown
                        } else {
                            return <p onClick={this.showCountryInfo(country.numericCode)}
                                      key={country.numericCode}>
                                      {country.name}
                                    </p>
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default App;