function FilterOption({ name, activeOption, setActiveOption }) {
  return (
    <div className="filter__option me-3" onClick={() => setActiveOption(name)}>
      <p style={activeOption == name ? {color: "#ff2e00"} : {}}>{name}</p>
    </div>
  );
}

export default FilterOption;
