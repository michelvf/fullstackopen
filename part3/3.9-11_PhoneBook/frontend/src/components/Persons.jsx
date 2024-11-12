import Person from './Person'

const Persons = ({ names, delPerson }) => {
  // console.log('En componente: Persons. ¿Cómo llega delPerson?', delPerson)
  // console.log('Lo que llega de APP: ', names)
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name, i) =>
          <Person 
            key={i}
            id={name.id}
            nombre={name.name}
            numero={name.number}
            delPerson={delPerson}
          />
        )}
      </tbody>
    </table>
  )
}

export default Persons

//  delPerson={delPerson}
//  id={name.id}