import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some((person) => person.name === newName);
    console.log(isDuplicate);
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    console.log("submitted");
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    personsService.create(newPerson).then((response) => {
      console.log(response);
    });
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    return () => {
      const person = persons.find((person) => person.id === id);
      const result = window.confirm(`Delete ${person.name}?`);
      if (result) {
        personsService.deletePerson(id).then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    };
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterValue(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* persons.some((person) => person.name === newName); */}
      <Persons
        persons={persons}
        filterValue={filterValue}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
