import React from 'react'

const Person = ({ name, number, deletePerson }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={deletePerson}>poista</button></td>
        </tr>
    )
}

export default Person