const PersonForm = ({addPerson, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input type='text' onChange={handlePersonChange} required />
            </div>
            <div>
            number: <input type='tel' onChange={handleNumberChange} required/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm