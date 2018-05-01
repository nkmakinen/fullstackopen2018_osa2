import React from 'react'
import Person from './Person'

const Filter = ({ filter, handleSearchChange, filteredPersons }) => {
    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form>
                rajaa näytettäviä
                <input
                    value={filter}
                    onChange={handleSearchChange}
                />
            </form>
            <table>
                <tbody>
                    {filteredPersons.map(person => <Person key={person.name}
                                                           name={person.name}
                                                           number={person.number} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Filter