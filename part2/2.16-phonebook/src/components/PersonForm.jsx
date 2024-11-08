const PersonForm = ({addPerson, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name:&nbsp; 
                <input
                    type='text'
                    onChange={handlePersonChange}
                    placeholder="John Done"
                    required
                />
            </div>
            <div>
                number:&nbsp;
                <input
                    type='tel'
                    onChange={handleNumberChange}
                    placeholder="53-47-123456"
                    required
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm