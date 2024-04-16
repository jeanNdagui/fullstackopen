import { useState, useEffect } from 'react'
import person from './services/person'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newNumber, setNewNumber] = useState('')

  const [newName, setNewName] = useState('')

  const [filterName, setFilterName] = useState('')

  const [showAll, setShowAll] = useState(true)

  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
    setShowAll(false)
  }

  const filterPerson = () => persons.filter(
    p => p.name.toLowerCase()
      .includes(filterName.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    setShowAll(true)
    const x = { name: newName, number: newNumber }
    const t = persons.filter(p => x.name === p.name)

    if (t.length === 0) {
      person
        .createPerson(x)
        .then(p => {
          setPersons([...persons, p])
          setMessage({ info: `Added ${p.name}`, typeMessage: 'success' })
          setTimeout(() => setMessage(null), 5000)
        })

    } else {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`
      )) {
        person.updatePerson(t[0].id, x).then(updatedPerson => {
          setPersons(persons.map(p => p.id !== t[0].id ? p : updatedPerson))
          setMessage({ info: `Added ${updatedPerson.name}`, typeMessage: 'success' })
          setTimeout(() => setMessage(null), 5000)
        }
        ).catch(e =>{ 
          setMessage({ info: `Information of ${x.name} has already been removed from the server`, typeMessage: 'error' } )
          setTimeout(() => setMessage(null), 5000)}
        )
      }
    }
  }

  useEffect(() => {
    person
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (p) => {

    if (window.confirm(`Delete ${p.name}`)) {
      return person.deletePerson(p.id).then(deletedPerson => {
        setPersons(persons.filter(c => deletedPerson.id !== c.id))
        setMessage({ info: `Deleted ${deletedPerson.name}`, typeMessage: 'error' })
        setTimeout(() => setMessage(null), 5000)
      })
    }

    return null
  }


  const personsToShow = showAll || filterName === "" ? persons : filterPerson()

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filterName} onShow={handleNameFilter} />

      <h3>add a new</h3>
      <PersonForm
        onSendForm={addPerson}
        pName={newName}
        pNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>
      <Person personsToShow={personsToShow} onDeletePerson={deletePerson} />

    </div>
  )
}

export default App
