import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import FacilityItem from "../operations/FacilityItem";

import man from "../../static/images/man.svg";
import arrowDown from "../../static/images/arrow_down.svg";

import { CHANGE_VOLUNTEER_STATUS } from "../../gql/mutations/changeVolunteerStatus";

function VolunteerCard({ operation, volunteer, setOperation, facilities }) {
  const [volunteerStatus, setVolunteerStatus] = useState(volunteer.status);
  const [isFacilityContainer, setIsFacilityContainer] = useState(false);
  const facilityContainerRef = useRef(null);
  const facilityBtnRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        facilityContainerRef.current &&
        facilityBtnRef.current &&
        !facilityBtnRef.current.contains(event.target) &&
        !facilityContainerRef.current.contains(event.target)
      ) {
        setIsFacilityContainer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFacilityContainer]);

  return (
    <div className="about_operation_1 mt-2">
      <img src={man} />
      <div className="about_info about_info_volunteer mt-1">
        <h4>
          {volunteer.user.lastName} {volunteer.user.firstName}
        </h4>
        <div className="d-flex">
          <div className="rel">
            <button
              className="default__btn default__btn_outline me-2"
              onClick={() => setIsFacilityContainer(!isFacilityContainer)}
              ref={facilityBtnRef}
            >
              Снаряжение
              <img className="ms-2" src={arrowDown} width="20px" />
            </button>
            {isFacilityContainer && (
              <div className="facility__container" ref={facilityContainerRef}>
                {facilities.map((facility, idx) => {
                  return (
                    <FacilityItem
                      facility={facility}
                      volunteer={volunteer}
                      operation={operation}
                      setOperation={setOperation}
                      key={idx}
                    />
                  );
                })}
              </div>
            )}
          </div>
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
