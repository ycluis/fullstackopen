const Person = ({ filter, persons, handleDelete }) => {
  return (
    <>
      {!filter.length > 0
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
            </p>
          ))
        : persons
            .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map((filteredName) => (
              <p key={filteredName.id}>
                {filteredName.name} {filteredName.number}{' '}
                <button onClick={() => handleDelete(filteredName)}>delete</button>
              </p>
            ))}
    </>
  )
}

export default Person
