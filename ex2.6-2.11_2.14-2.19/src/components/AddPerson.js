import React from 'react'

const AddPerson = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form>
                <div>
                    nimi:
                    <input 
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    numero:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button onClick={addPerson}>lisää</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson