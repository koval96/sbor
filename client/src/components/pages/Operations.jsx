import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Operation from "../operations/Operation";
import Filter from "../structure/Filter"

import { GET_ALL_OPERATIONS } from "../../gql/queries/getAllOperations";
import "../../static/css/operations.css";
import Loader from "../utils/Loader";

function Operations() {
  const [operations, setOperations] = useState([]);
  const [localOperations, setLocalOperations] = useState([])
  const { loading } = useQuery(GET_ALL_OPERATIONS, {
    onCompleted: (data) => {
      console.log(data);
      setOperations(data.getAllOperations);
    },
  });
  return (
    <div className="operations w-100">
      {loading && <Loader loading={loading} />}
      <Filter objects={operations} setObjects={setLocalOperations} type={"operations"} />
      {localOperations.map((operation, key) => {
        return <Operation operation={operation} key={key} />;
      })}
      {localOperations.length == 0 && <p>Операций нет</p>}
    </div>
  );
}

export default Operations;
