const Filter = ({handlerFilter}) => {
    return (
        <div>
            filter shown with: &nbsp;
            <input 
                type='text'
                onChange={handlerFilter}
                placeholder="Only name"
            />
        </div>
    )
}

export default Filter
