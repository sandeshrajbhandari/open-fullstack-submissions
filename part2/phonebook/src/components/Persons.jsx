import React from "react";

const Persons = ({ persons, filterValue }) => {
  return (
    <div>
      {filterValue
        ? persons
            .filter((person) =>
              // person.name.toLowerCase() === filterValue.toLowerCase()
              person.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((person) => (
              <div key={person.name}>
                {person.name} {person.number}
              </div>
            ))
        : persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))}
    </div>
  );
};

export default Persons;
