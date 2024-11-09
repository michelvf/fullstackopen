const Showten = ({ countries, click }) => {

  return (
    <>
    {countries.map((name, i) =>
      <>
        <span key={i}>{name} <button onClick={() => click(name.toLowerCase())}>show</button></span><br />
      </>
    )}
    </>
  )
}

export default Showten
