import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";

import "../../static/css/courses.css";

import { JOIN_EVENT } from "../../gql/mutations/joinEvent";
import { UserContext } from "../auth/AuthLayer";

function Course({ event }) {
  const [hasJoined, setHasJoined] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.events.filter((e) => e.id == event.id).length > 0) {
      setHasJoined(true);
    }
  }, [user]);

  const [joinEvent, { loading }] = useMutation(JOIN_EVENT, {
    onCompleted: () => {
      setHasJoined(!hasJoined);
    },
  });
  return (
    <div className="course">
      <div className="course_header">
        <h2 className="course_title">{event.title}</h2>
        <button
          className="default__btn"
          onClick={() =>
            joinEvent({
              variables: {
                username: user.username,
                id: event.id,
              },
            })
          }
        >
          {hasJoined ? "Отписаться" : "Записаться"}
        </button>
      </div>
      <div className="course_description">
        <p>{event.description}</p>
      </div>
      <div className="course_info">
        <div className="course_start">
          <p className="info_header">
            <b>Начало курсов:</b>
          </p>
          <p className="info_value">{event.dateStart}</p>
        </div>
        <div className="course_teacher">
          <p className="info_header">
            <b>Преподаватель:</b>
          </p>
          <p className="info_value">
            {event.head.lastName} {event.head.firstName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Course;
