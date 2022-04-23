import { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import Course from "../operations/Course";
import Loader from "../utils/Loader";
import Filter from "../structure/Filter";

import { GET_ALL_EVENTS } from "../../gql/queries/getAllEvents";
import { UserContext } from "../auth/AuthLayer";

function Courses() {
  const [events, setEvents] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  const [activeOption, setActiveOption] = useState("Все");
  const { user } = useContext(UserContext);

  const { loading } = useQuery(GET_ALL_EVENTS, {
    onCompleted: (data) => {
      console.log(data);
      setEvents(data.getAllEvents);
      setLocalEvents(data.getAllEvents)
    },
  });

  useEffect(() => {
    if (activeOption == "Все") {
      setLocalEvents(events);
    }
    if (activeOption == "Новые") {
      setLocalEvents(
        events.filter(
          (obj) => user.events.filter((o) => o.id == obj.id).length == 0
        )
      );
    }
    if (activeOption == "Я записан") {
      setLocalEvents(
        events.filter(
          (obj) => user.events.filter((o) => o.id == obj.id).length !== 0
        )
      );
    }
  }, [activeOption]);
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          {events && (
            <Filter
              objects={events}
              setObjects={setLocalEvents}
              type={"events"}
              activeOption={activeOption}
              setActiveOption={setActiveOption}
            />
          )}
          <div className="operations w-100">
            {localEvents &&
              localEvents.map((event, key) => {
                return <Course event={event} key={key} />;
              })}
            {localEvents.length == 0 && <p>Ничего нет</p>}
          </div>
        </>
      )}
    </>
  );
}

export default Courses;
