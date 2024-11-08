import personService from '../services/persons'

const Person = ({id, nombre, numero, delPerson}) => {
    // console.log('En componente: Person. ¿Cómo llega delPerson?', delPerson)

    return (
        <tr>
            <td>{nombre}</td> 
            <td>{numero}</td>
            <td><button onClick={() => delPerson(id)} >Borrar</button></td>
        </tr>
    )
}

export default Person
