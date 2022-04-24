import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { CHANGE_FACILITY } from "../../gql/mutations/changeFacility";

function FacilityItem({ facility, volunteer, operation, setOperation }) {
  const [changeFacility, { loading }] = useMutation(CHANGE_FACILITY, {
    onCompleted: (data) => {
      setOperation({
        ...operation,
        volunteers: data.changeFacility.volunteers,
      });
    },
  });
  return (
    <div className="d-flex facility__item">
      <label htmlFor={`${facility.id}`}>{facility.name}</label>
      <input
        type="checkbox"
        id={facility.id}
        onChange={() =>
          changeFacility({
            variables: {
              idVol: volunteer.id,
              idFac: facility.id,
            },
          })
        }
        checked={
          volunteer.facilities.filter((f) => f.id == facility.id).length > 0
        }
      />
    </div>
  );
}

export default FacilityItem;
