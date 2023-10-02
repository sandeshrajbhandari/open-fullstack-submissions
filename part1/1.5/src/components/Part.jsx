const Part = (props) => {
  return (
    <div>
      <h3>{props.part.name}</h3>
      <p>{props.part.exercises}</p>
    </div>
  );
};

export default Part;
