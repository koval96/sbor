import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import man from "../../static/images/man.svg";

import { CHANGE_VOLUNTEER_STATUS } from "../../gql/mutations/changeVolunteerStatus";

function VolunteerCard({ operation, volunteer, setOperation }) {
  const [volunteerStatus, setVolunteerStatus] = useState(volunteer.status);
  const [changeVolunteerStatus, { loading }] = useMutation(
    CHANGE_VOLUNTEER_STATUS
  );
  useEffect(() => {
    changeVolunteerStatus({
      variables: {
        id: volunteer.id,
        status: volunteerStatus,
      },
    });
    setOperation({
      ...operation,
      volunteers: [
        { ...volunteer, status: volunteerStatus },
        ...operation.volunteers.filter((vol) => vol.id !== volunteer.id),
      ].sort((a, b) => a - b),
    });
  }, [volunteerStatus]);
  return (
    <div className="about_operation_1 mt-2">
      <img src={man} />
      <div className="about_info about_info_volunteer mt-1">
        <h4>
          {volunteer.user.lastName} {volunteer.user.firstName}
        </h4>
        <div>
          {/* <button
            className="default__btn default__btn_outline"
            onClick={() => selectRef.current.click()}
          >
            Статус
            <img className="ms-2" src={arrowDown} width="20px" />
          </button> */}
          <select
            className="default__btn default__btn_outline p-2"
            value={volunteer.status}
            onChange={(e) => setVolunteerStatus(e.target.value)}
          >
            <option disabled selected>
              Статус
            </option>
            <option value="На поисках">На поисках</option>
            <option value="Дома">Дома</option>
            <option value="Едет домой">Едет домой</option>
            <option value="Едет на операцию">Едет на операцию</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default VolunteerCard;
