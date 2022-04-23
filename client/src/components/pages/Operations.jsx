import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import Operation from "../operations/Operation";
import Filter from "../structure/Filter";

import { GET_ALL_OPERATIONS } from "../../gql/queries/getAllOperations";
import "../../static/css/operations.css";
import Loader from "../utils/Loader";
import { UserContext } from "../auth/AuthLayer";

function Operations() {
  const [operations, setOperations] = useState([]);
  const [localOperations, setLocalOperations] = useState([]);
  const [activeOption, setActiveOption] = useState("Все");
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (activeOption == "Все") {
      setLocalOperations(operations);
    }
    if (activeOption == "Новые") {
      setLocalOperations(
        operations.filter(
          (obj) => user.operations.filter((o) => o.operation.id == obj.id).length == 0
        )
      );
    }
    if (activeOption == "Я записан") {
      setLocalOperations(
        operations.filter(
          (obj) => user.operations.filter((o) => o.operation.id == obj.id).length !== 0
        )
      );
    }
  }, [activeOption]);
  const { loading } = useQuery(GET_ALL_OPERATIONS, {
    onCompleted: (data) => {
      setOperations(data.getAllOperations);
      setLocalOperations(data.getAllOperations)
    },
  });
  return (
    <div className="operations w-100">
      {loading && <Loader loading={loading} />}
      <Filter
        objects={operations}
        setObjects={setLocalOperations}
        type={"operations"}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      {localOperations.map((operation, key) => {
        return <Operation operation={operation} key={key} />;
      })}
      {localOperations.length == 0 && <p>Операций нет</p>}
    </div>
  );
}

export default Operations;
