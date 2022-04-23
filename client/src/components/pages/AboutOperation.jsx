import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import VolunteerCard from "../operations/VolunteerCard";
import Loader from "../utils/Loader";
import { MapDiv } from "../utils/Map";
import { GET_OPERATION_BY_ID } from "../../gql/queries/getOperationById";
import { JOIN_OPERATION } from "../../gql/mutations/joinOperation";
import { UserContext } from "../auth/AuthLayer";

import "../../static/css/operations.css";
import man from "../../static/images/man.svg";

function AboutOperations() {
  const [operation, setOperation] = useState({});
  const [hasJoined, setHasJoined] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [joinOperation, { loading: joinLoading }] = useMutation(
    JOIN_OPERATION,
    {
      onCompleted: (data) => {
        setOperation({
          ...operation,
          volunteers: data.joinOperation.operation.volunteers,
        });
        setHasJoined(!hasJoined);
      },
    }
  );
  const { loading } = useQuery(GET_OPERATION_BY_ID, {
    onCompleted: (data) => {
      setOperation(data.getOperationById);
    },
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });
  useEffect(() => {
    if (user.operations) {
      setHasJoined(
        user.operations.filter((o) => operation.id == o.id).length > 0
      );
    }
  }, [user]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="about_operation_1">
            <img src={man} width="120px" />
            <div className="about_info">
              <div className="about_header">
                <h2 className="missing__name">
                  <h2 style={{ color: "#FF2E00" }}>{operation.status}.</h2>{" "}
                  {operation.name}
                </h2>
                {hasJoined ? (
                  <button
                    className="participate_button"
                    onClick={() =>
                      joinOperation({
                        variables: {
                          username: user.username,
                          id: operation.id,
                        },
                      })
                    }
                  >
                    Отказаться
                  </button>
                ) : (
                  <button
                    className="participate_button"
                    onClick={() =>
                      joinOperation({
                        variables: {
                          username: user.username,
                          id: operation.id,
                        },
                      })
                    }
                  >
                    Записаться
                  </button>
                )}
              </div>
              <div className="about_lost">
                <p>{operation.description}</p>
              </div>
              <div className="about_start">
                <div>
                  <div className="search__info search__info_descr">
                    <b>Начало поисков:</b>&nbsp;
                    <p>{operation.searchStart}</p>
                  </div>
                  <div className="search__info search__info_descr">
                    <b>Адрес сбора:</b>&nbsp;
                    <p>{operation.adress}</p>
                  </div>
                </div>
                <div>
                  <div className="search__info search__info_descr">
                    <b>Ответственный:</b>&nbsp;
                    <p>
                      {operation.head && operation.head[0].lastName}{" "}
                      {operation.head && operation.head[0].firstName}
                    </p>
                  </div>
                  <div className="search__info search__info_descr">
                    <b>Зарегестрировано:</b>&nbsp;
                    <p>
                      {operation.volunteers && operation.volunteers.length}{" "}
                      человек(-а)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="operation_plan">
            <div className="plan">
              <p>
                <b>План операции</b> <br />
                {operation.plan}
              </p>
            </div>
            <div className="map">
              <b>Место сбора</b>
              <br />
              <MapDiv />
            </div>
          </div>
          <hr />
          <div className="operation__participants">
            <h2>Участники операции</h2>
            {operation.volunteers && operation.volunteers.map((volunteer, idx) => {
              return <VolunteerCard operation={operation} volunteer={volunteer} setOperation={setOperation} key={idx} />;
            })}
            {operation.volunteers && operation.volunteers.length == 0 && (
                <p>Нет людей</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutOperations;
