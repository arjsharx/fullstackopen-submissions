const Numbers = ({ persons, OnClickButton }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            <div>
              {person.name} {person.number}
            </div>
            <button onClick={() => OnClickButton(person.id)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Numbers;
