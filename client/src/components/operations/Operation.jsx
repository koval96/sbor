import man from "../../static/images/man.svg";

function Operation() {
  return (
    <div className="operation">
      <img src={man} width="120px" />
      <div className="operation__info ms-4">
        <h2 className="missing__name">Иванов Иван Иванович</h2>
        <p>
          Ушла из дома 23 марта 2025 в 20:15 года в пер.Профсоюзный и не
          вернулся. Нужен картограф, повар и 10 человек поисковый отряд{" "}
        </p>
        <div>
          <div className="search__info">
            <b>Начало поисков:</b>&nbsp;
            <p>11.05.2028</p>
          </div>
          <div className="search__info">
            <b>Адрес сбора:</b>&nbsp;
            <p>д.Елховка, пер.Профсоюзный, 2</p>
          </div>
          <div className="search__info">
            <b>Ответственный:</b>&nbsp;
            <p>Данила Леонтьев</p>
          </div>
          <div className="search__info">
            <b>Зарегестрировано:</b>&nbsp;
            <p>200 человек</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operation;
