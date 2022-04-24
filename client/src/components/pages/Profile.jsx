import { useState, useContext } from "react";

import Operation from "../operations/Operation";
import Course from "../operations/Course";

import { UserContext } from "../auth/AuthLayer";

import man from "../../static/images/man.svg";
import "../../static/css/profile.css";

function Profile() {
  const [filterType, setFilterType] = useState("operations");
  const { user } = useContext(UserContext);
  return (
    // <div className="">
    //   <div className="profile_header">
    //     <div className="profile_name">
    //       <img className="profile_image" src={man} width="120px" />
    //       <div className="surname info_block">
    //         <p className="name">Узкий Владимир</p>
    //         <p className="label">Стаж: 2 года</p>
    //       </div>
    //     </div>
    //     <div className="contacts">
    //       <div className="Phone info_block">
    //         <p className="label">Телефон</p>
    //         <p>+7 (777) 777-77-77</p>
    //       </div>
    //       <div className="Telegram info_block">
    //         <p className="label">Telegram</p>
    //         <p>@shirokiy</p>
    //       </div>
    //     </div>
    //     <div className="skills info_block">
    //       <div className="operations">
    //         <p className="label">Количество операций</p>
    //         <p>10</p>
    //       </div>
    //       <div className="Courses ">
    //         <p className="label">Пройдено курсов</p>
    //         <p>12</p>
    //       </div>
    //     </div>
    //     <div className="last_search">
    //       <div>
    //         <p className="lable">Последяя операция</p>
    //         <p>18.04.2031</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="about_operation_1">
        <img src={man} width="120px" />
        <div className="about_info">
          <div className="about_header">
            <h2 className="missing__name">
              {user.lastName} {user.firstName}
            </h2>
          </div>
          <div className="about_start">
            <div>
              <div className="search__info search__info_descr">
                <b>Телефон:</b>&nbsp;
                <p>{user.phone}</p>
              </div>
              <div className="search__info search__info_descr">
                <b>Telegram:</b>&nbsp;
                <p>{user.tg}</p>
              </div>
            </div>
            <div>
              <div className="search__info search__info_descr">
                <b>Операций:</b>&nbsp;
                <p>{user.operations && user.operations.length}</p>
              </div>
              <div className="search__info search__info_descr">
                <b>Пройдено курсов:</b>&nbsp;
                <p>{user.events && user.events.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex mt-2">
        <p
          className="filter__option"
          onClick={() => setFilterType("operations")}
          style={filterType == "operations" ? { color: "rgb(255, 46, 0)" } : {}}
        >
          Все операции
        </p>
        <p
          className="filter__option ms-3"
          onClick={() => setFilterType("events")}
          style={filterType == "events" ? { color: "rgb(255, 46, 0)" } : {}}
        >
          Все курсы
        </p>
      </div>
      {filterType == "operations" && user.operations && (
        <>
          {user.operations.map((operation, idx) => {
            return <Operation operation={operation.operation} key={idx} />;
          })}
          {user.operations.length == 0 && <p>Операций нет</p>}
        </>
      )}
      {filterType == "events" && user.events && (
        <>
          {user.events.filter(e => e.type == "course").map((event, idx) => {
            return <Course event={event} key={idx} />;
          })}
          {user.events.filter(e => e.type == "course").length == 0 && <p>Курсов нет</p>}
        </>
      )}
    </div>
  );
}

export default Profile;
