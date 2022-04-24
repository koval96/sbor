import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../auth/AuthLayer";

import FilterOption from "./FilterOption";

function Filter({ objects, setObjects, type, activeOption, setActiveOption }) {
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  //   function setFilterData() {
  // if (type == "Все") {
  //   setObjects(objects);
  // }
  //     if (activeOption == "Новые") {
  //       if (type == "operations") {
  //         setObjects(
  //           objects.filter(
  //             (obj) => user.operations.filter((o) => o.id == obj.id).length == 0
  //           )
  //         );
  //       } else if (type == "events") {
  //         setObjects(
  //           objects.filter(
  //             (obj) => user.events.filter((o) => o.id == obj.id).length == 0
  //           )
  //         );
  //       }
  //     }
  //     if (activeOption == "Я записан") {
  //       if (type == "operations") {
  //         setObjects(
  //           objects.filter(
  //             (obj) => user.operations.filter((o) => o.id == obj.id).length !== 0
  //           )
  //         );
  //       } else if (type == "events") {
  //         setObjects(
  //           objects.filter(
  //             (obj) => user.events.filter((o) => o.id == obj.id).length !== 0
  //           )
  //         );
  //       }
  //     }
  //   }
  //   useEffect(() => {
  //     setFilterData();
  //   }, []);

  //   useEffect(() => {
  //     setFilterData();
  //   }, [activeOption]);

  useEffect(() => {
    if (search !== "" && type == "operations") {
      setObjects(
        objects.filter((obj) => obj.name.toLowerCase().includes(search))
      );
    } else if (type == "events") {
      setObjects(
        objects.filter((obj) => obj.title.toLowerCase().includes(search))
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
          name={"Все"}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
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
        {type == "operations" && user.type == "admin" && (
          <Link className="non_link" to={"/operations/create"}>
            <button className="default__btn default__btn_outline">
              Создать операцию
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Filter;
