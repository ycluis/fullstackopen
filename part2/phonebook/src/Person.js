const Person = ({filter, persons}) => {
  return (
    <>
      {!filter.length > 0 ? (persons.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))) : (
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(filteredName => (
          <p key={filteredName.id}>{filteredName.name} {filteredName.number}</p>
        ))
      )}
    </>
  )
}

export default Person