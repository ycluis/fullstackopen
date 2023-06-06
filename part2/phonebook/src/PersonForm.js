const PersonForm = ({ field, handleFieldChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input name="name" value={field.name} onChange={handleFieldChange} />
        <div>
          number: <input name="number" value={field.number} onChange={handleFieldChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
