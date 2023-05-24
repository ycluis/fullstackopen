const Filter = ({ filter, handleChange }) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleChange} />
    </>
  )
}

export default Filter
