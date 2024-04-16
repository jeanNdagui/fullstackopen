const Person = ({personsToShow, onDeletePerson}) => {

    return (
        <div>
        {
          personsToShow.map(person =>
            <div key={person.id}>
              {person.name} {person.number}
              <button onClick={ ()=> onDeletePerson(person)}>delete</button>
            </div>)
        }
      </div>
    )
}

export default Person