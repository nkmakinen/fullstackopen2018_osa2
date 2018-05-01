import React from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AddPerson from './components/AddPerson'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            filteredPersons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notification: null,
            notificationType: null
        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        var message

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        let duplicate = this.state.persons.find(function(person) {
            return person.name === personObject.name
        })

        if (duplicate !== undefined) {
            var confirm = window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)
            if (confirm) {
                var id = duplicate.id
                duplicate.number = personObject.number

                const persons = this.state.persons

                message = `muutettiin henkilön ${duplicate.name} puhelinnumero`

                personService
                    .update(id, personObject)
                    .then(personObject => {
                        this.setState({
                            persons,
                            newName: '',
                            newNumber: '',
                            notification: message,
                            notificationType: 'info'
                        })
                    })
                    .catch(error => {
                        this.setState({
                            notification: `henkilö '${duplicate.name}' on poistettu palvelimelta`,
                            notificationType: 'error',
                            persons: this.state.persons.filter(person => person.id !== id),
                        })
                    })

                    setTimeout(() => {
                        this.setState({ notification: null, notificationType: null })
                    }, 2000)
            }

            return
        }
        
        const persons = this.state.persons.concat(personObject)

        message = `lisättiin ${personObject.name}`

        personService
            .create(personObject)
            .then(newNote => {
                this.setState({
                    persons,
                    newName: '',
                    newNumber: '',
                    notification: message,
                    notificationType: 'info'
                })
            })

            setTimeout(() => {
                this.setState({ notification: null, notificationType: null })
            }, 2000)
    }

    deletePerson = (id) => {
        return () => {
            var selectedPerson = this.state.persons.find(function(person) {
                return person.id === id
            })

            var confirm = window.confirm(`poistetaanko ${selectedPerson.name}?`)
            if (!confirm) {
                return
            }

            var message = `poistettiin ${selectedPerson.name}`

            personService
                .remove(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(person => person.id !== id),
                        notification: message,
                        notificationType: 'error'
                    })
                })
                setTimeout(() => {
                    this.setState({ notification: null, notificationType: null })
                }, 2000)
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleSearchChange = (event) => {
        var results = this.state.persons.filter((person) => 
            person.name.toLowerCase().includes(event.target.value.toLowerCase())
        )

        if (event.target.value.length === 0) {
            results = [];
        }

        const shownResults = results;

        this.setState({ filter: event.target.value, filteredPersons: shownResults })
    }

    render() {
        return (
            <div>
                <Filter filter={this.state.filter}
                        handleSearchChange={this.handleSearchChange}
                        filteredPersons={this.state.filteredPersons}
                />

                <AddPerson 
                    newName={this.state.newName}
                    newNumber={this.state.newNumber}
                    handleNameChange={this.handleNameChange}
                    handleNumberChange={this.handleNumberChange}
                    addPerson={this.addPerson}
                />

                <Notification message={this.state.notification}
                              type={this.state.notificationType}   />

                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons.map(person => <Person key={person.name}
                                                                  name={person.name}
                                                                  number={person.number}
                                                                  deletePerson={this.deletePerson(person.id)}
                                                           />)}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default App