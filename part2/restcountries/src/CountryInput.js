const countryInput = ({ countryField, handleCountryChange }) => (
  <>
    find countries: <input value={countryField} onChange={handleCountryChange} />
  </>
)

export default countryInput
