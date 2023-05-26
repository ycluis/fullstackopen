const countryInput = ({ countryField, handleCountryChange }) => {
  return (
    <>
      find countries: <input value={countryField} onChange={handleCountryChange} />
    </>
  )
}

export default countryInput
