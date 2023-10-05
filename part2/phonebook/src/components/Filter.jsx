const Filter = ({ filterValue, handleFilter }) => {
  return (
    <div>
      filter shown with : <input value={filterValue} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
