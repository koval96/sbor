import { Link } from "react-router-dom";

import man from "../../static/images/man.svg";

function Operation({ operation }) {
  return (
    <div className="operation mt-2">
      <div className="image__box">
        <img src={operation.imageUrl ? operation.imageUrl : man} />
      </div>
      <div className="operation__info ms-4 w-100">
        <div className="w-100 missing__name_container">
          <h2 className="missing__name">
            <h2 style={{ color: "#ff2e00" }}>{operation.status}</h2>
            {operation.name}, возраст: {operation.age}
          </h2>
          <Link
            to={`/operations/${operation.id}`}
            className="non_link read_more__desktop"
          >
            <button className="default__btn">Подробнее</button>
          </Link>
        </div>
        <p>{operation.description}</p>
        <Link
          to={`/operations/${operation.id}`}
          className="non_link read_more__mobile"
        >
          <button className="default__btn">Подробнее</button>
        </Link>
        <div className="search__info_container">
          <div>
            <div className="search__info">
              <b>Начало поисков:</b>&nbsp;
              <p>{operation.searchStart}</p>
            </div>
            <div className="search__info">
              <b>Адрес сбора:</b>&nbsp;
              <p>{operation.adress}</p>
            </div>
          </div>
          <div>
            <div className="search__info">
              <b>Ответственный:</b>&nbsp;
              <p>
                {operation.head[0].lastName} {operation.head[0].firstName}
              </p>
            </div>
            <div className="search__info">
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
  );
}

export default Operation;
