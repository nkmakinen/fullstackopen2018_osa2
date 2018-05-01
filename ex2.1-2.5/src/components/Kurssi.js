import React from 'react'

const Otsikko = ({ nimi }) => {
    return (
        <h1>{nimi}</h1>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            <ul>
                {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
            </ul>
            <p>yhteensä {osat.reduce((yhteensa, osat) => {
                return yhteensa + osat.tehtavia
            }, 0)} tehtävää</p>
        </div>
    )
}

const Osa = ({ key, nimi, tehtavia }) => {
    return (
        <li key={key}>{nimi} {tehtavia}</li>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi