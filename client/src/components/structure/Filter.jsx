import { useState, useEffect, useContext } from "react";
import { UserContext } from "../auth/AuthLayer";

import FilterOption from "./FilterOption";

function Filter({ objects, setObjects, type }) {
  const [activeOption, setActiveOption] = useState("Новые");
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (activeOption == "Новые") {
      setObjects(
        objects.filter(
          (obj) => user.operations.filter((o) => o.id == obj.id).length == 0
        )
      );
    }
    if (activeOption == "Я записан") {
      setObjects(
        objects.filter(
          (obj) => user.operations.filter((o) => o.id == obj.id).length !== 0
        )
      );
    }
  }, [activeOption]);
  useEffect(() => {
    if (search !== "") {
      setObjects(
        objects.filter((obj) => obj.name.toLowerCase().includes(search))
      );
    } else {
      setObjects(objects);
    }
  }, [search]);
  return (
    <div className="filter mb-2">
      <input
        placeholder="Поиск"
        type="text"
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        className="default__input search__input"
      />
      <div className="filter__options">
        <FilterOption
          name={"Новые"}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <FilterOption
          name={"Я записан"}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
      </div>
    </div>
  );
}

export default Filter;
