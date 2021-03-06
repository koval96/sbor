import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import VolunteerCard from "../operations/VolunteerCard";
import Loader from "../utils/Loader";
import { MapDiv } from "../utils/Map";
import { GET_OPERATION_BY_ID } from "../../gql/queries/getOperationById";
import { JOIN_OPERATION } from "../../gql/mutations/joinOperation";
import { CHANGE_OPERATION_STATUS } from "../../gql/mutations/changeOperationStatus";

import { UserContext } from "../auth/AuthLayer";

import "../../static/css/operations.css";
import man from "../../static/images/man.svg";
import { GET_ALL_FACILITIES } from "../../gql/queries/getAllFacilities";

function AboutOperations() {
  const [operation, setOperation] = useState({});
  const [hasJoined, setHasJoined] = useState(false);
  const [facilities, setFacilities] = useState([]);
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
  const [changeOperationStatus, { loading: changeLoading }] = useMutation(
    CHANGE_OPERATION_STATUS,
    {
      // onCompleted: (data) => {
      //   setOperation({
      //     ...operation,
      //     status: data.changeOperationStatus.operation.status,
      //   });
      // },
    }
  );
  const { loading } = useQuery(GET_OPERATION_BY_ID, {
    onCompleted: (data) => {
      setOperation(data.getOperationById);
    },
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  const { loading: loadingFacilities } = useQuery(GET_ALL_FACILITIES, {
    onCompleted: (data) => {
      setFacilities(data.getAllFacilities);
    },
  });
  useEffect(() => {
    if (user.operations) {
      setHasJoined(
        user.operations.filter((o) => operation.id == o.id).length > 0
      );
    }
  }, [user]);

  useEffect(() => {
    changeOperationStatus({
      variables: {
        id: operation.id,
        status: operation.status,
      },
    });
  }, [operation.status]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="about_operation_1">
            <div className="image__box">
              <img src={operation.imageUrl ? operation.imageUrl : man} />
            </div>
            <div className="about_info">
              <div className="about_header">
                <div>
                  {user.type !== "admin" && (
                    <>
                      <h2 style={{ color: "#FF2E00" }}>{operation.status}.</h2>{" "}
                    </>
                  )}
                  {user.type == "admin" && (
                    <select
                      className="default__btn default__btn_outline p-2"
                      value={operation.status}
                      onChange={(e) =>
                        setOperation({ ...operation, status: e.target.value })
                      }
                    >
                      <option disabled selected>
                        ????????????
                      </option>
                      <option value="???? ????????????(-??)">???? ????????????(-??)</option>
                      <option value="??????????(-??). ??????????(-????)">??????????(-??). ??????????(-????)</option>
                      <option value="????????????(-??). ??????(-??)">????????????(-??). ??????(-??)</option>
                    </select>
                  )}
                  <h2>
                    {operation.name}, ??????????????: {operation.age}
                  </h2>
                </div>
                {user.type !== "admin" && (
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
                    {hasJoined ? "????????????????????" : "????????????????????"}
                  </button>
                )}
              </div>
              <div className="about_lost">
                <p>{operation.description}</p>
              </div>
              <div className="about_start">
                <div>
                  <div className="search__info search__info_descr">
                    <b>???????????? ??????????????:</b>&nbsp;
                    <p>{operation.searchStart}</p>
                  </div>
                  <div className="search__info search__info_descr">
                    <b>?????????? ??????????:</b>&nbsp;
                    <p>{operation.adress}</p>
                  </div>
                </div>
                <div>
                  <div className="search__info search__info_descr">
                    <b>??????????????????????????:</b>&nbsp;
                    <p>
                      {operation.head && operation.head[0].lastName}{" "}
                      {operation.head && operation.head[0].firstName}
                    </p>
                  </div>
                  <div className="search__info search__info_descr">
                    <b>????????????????????????????????:</b>&nbsp;
                    <p>
                      {operation.volunteers && operation.volunteers.length}{" "}
                      ??????????????(-??)
                    </p>
                  </div>
                  <div className="search__info search__info_descr">
                    <b>??????????????:</b>&nbsp;
                    <p>{operation.appearance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="operation_plan">
            <div className="plan">
              <p>
                <b>???????? ????????????????</b> <br />
                {operation.plan}
              </p>
            </div>
            <div className="map">
              <b>?????????? ??????????</b>
              <br />
              <MapDiv
                coords={
                  operation.coords &&
                  operation.coords.split(",").map((c) => parseFloat(c))
                }
              />
            </div>
          </div>
          {user.type == "admin" && (
            <>
              <hr />
              <div className="operation__participants">
                <h2>?????????????????? ????????????????</h2>
                {operation.volunteers &&
                  operation.volunteers.map((volunteer, idx) => {
                    return (
                      <VolunteerCard
                        operation={operation}
                        volunteer={volunteer}
                        setOperation={setOperation}
                        facilities={facilities}
                        key={idx}
                      />
                    );
                  })}
                {operation.volunteers && operation.volunteers.length == 0 && (
                  <p>?????? ??????????</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AboutOperations;
