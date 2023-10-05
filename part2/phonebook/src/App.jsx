import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notifyObj, setNotifyObj] = useState(null);

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
      const changeNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (changeNumber) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        console.log(person.id);
        // change persons state
        setPersons(
          persons.map((person) =>
            person.name === newName ? changedPerson : person
          )
        );
        // change database
        personsService
          .update(changedPerson.id, changedPerson)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            alert(`the person '${newName}' was already deleted from server`);
            console.log(error);
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id)
            );
          });
      } else return;
    } else {
      console.log("submitted");
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      personsService.create(newPerson).then((response) => {
        console.log(response);
      });
    }
    setNewName("");
    setNewNumber("");
    //timeout function to set message to null after 2 seconds
    setNotifyObj({ message: `Added ${newName}`, style: "success" });
    setTimeout(() => {
      setNotifyObj(null);
    }, 2000);
  };

  const deletePerson = (id) => {
    return () => {
      console.log(id);
      const person = persons.find((person) => person.id === id);
      const result = window.confirm(`Delete ${person.name}?`);
      if (result) {
        personsService
          .deletePerson(id)
          .then((response) => {
            console.log(response);
            setPersons(persons.filter((person) => person.id !== id));
            setNotifyObj({ message: `Deleted ${newName}`, style: "success" });
            setTimeout(() => {
              setNotifyObj(null);
            }, 2000);
          })
          .catch((error) => {
            setNotifyObj({
              message: `Information of '${person.name}' has already been removed from server`,
              style: "error",
            });
            setTimeout(() => {
              setNotifyObj(null);
            }, 2000);
            console.log(error);
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
      {notifyObj ? <Notification notifyObj={notifyObj} /> : ""}
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
