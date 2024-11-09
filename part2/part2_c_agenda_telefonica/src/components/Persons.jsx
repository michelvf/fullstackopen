import Person from './Person'

const Persons = ({ names }) => {
   // console.log('lo que llega del App: ', names)
  return (
    <>
      {names.map((name, i) =>
            <Person key={i} nombre={name.name}  numero={name.number} />
      )}
    </>
  )
}

export default Persons

// {personsToShow.map((names, i) => 
//   <Persons key={i} names={names} />
// )}