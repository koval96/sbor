import Operation from "../operations/Operation";
import { useParams } from "react-router-dom";
import '../../static/css/operations.css'
import man from "../../static/images/man.svg";
import { MapDiv } from "../utils/Map"
function AboutOperations() {
    return (
        <div>
            <div className="about_operation_1">
                <img src={man} width="120px" />
                <div className="about_info">
                    <div className="about_header">
                        <h2 className="missing__name">Иванов Иван Иванович</h2>
                        <button className="participate_button">Записаться</button>
                    </div>
                    <div className="about_lost">
                        <p>
                            Ушла из дома 23 марта 2025 в 20:15 года в пер.Профсоюзный и не
                            вернулся. Нужен картограф, повар и 10 человек поисковый отряд</p>
                    </div>
                    <div className="about_start">
                        <div>
                            <div className="search__info">
                                <b>Начало поисков:</b>&nbsp;
                                <p>11.05.2028</p>
                            </div>
                            <div className="search__info">
                                <b>Адрес сбора:</b>&nbsp;
                                <p>д.Елховка, пер.Профсоюзный, 2</p>
                            </div>
                        </div>
                        <div>
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
            </div>
            <hr />
            <div className="operation_plan">
                <div className="plan">
                    <p>
                        <b>План операции</b> <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eveniet quo quam dolor sequi omnis laboriosam consequuntur itaque, labore excepturi deserunt exercitationem harum nobis pariatur soluta minus sint odit repellendus.
                    </p>
                </div>
                <div className="map">
                    <b>Место сбора</b><br />
                    <MapDiv />
                </div>

            </div>
        </div>
    );
}

export default AboutOperations;
