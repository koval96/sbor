import man from "../../static/images/man.svg";

function Operation({ operation }) {
  return (
    <div className="operation">
      <img src={man} width="120px" />
      <div className="operation__info ms-4 w-100">
        <div className="w-100 missing__name_container">
          <h2 className="missing__name">
            {operation.name}, {operation.age} лет
          </h2>
          <button className="default__btn read_more__desktop">Подробнее</button>
        </div>
        <p>{operation.description}</p>
        <button className="default__btn read_more__mobile">Подробнее</button>
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
              <p>{operation.volunteers.length} человек(-а)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operation;
