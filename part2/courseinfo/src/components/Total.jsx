const Total = (props) => {
  return (
    <div>
      <strong>
        Number of exercises:{" "}
        {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </strong>
    </div>
  );
};

export default Total;
