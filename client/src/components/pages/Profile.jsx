import man from "../../static/images/man.svg";
import '../../static/css/profile.css'
function Profile() {
    return (
        <div className="">
            <div className="profile_header">
                <div className="profile_name">
                    <img src={man} width="120px" />
                    <div className="surname">
                        <p className="name">Узкий Владимир</p>
                        <p className="label">Волонтер</p>
                    </div>
                </div>
                <div className="contacts">
                    <div className="Phone">
                        <p className="label">Телефон</p>
                        <p>+7 (777) 777-77-77</p>
                    </div>
                    <div className="Telegram">
                        <p className="label">Telegram</p>
                        <p>@shirokiy</p>
                    </div>
                    <div className="Sign_date">
                        <p className="label">Зарегистрирован</p>
                        <p>19.08.21</p>
                    </div>
                </div>
                <div className="skills">
                    <div className="hours">
                        <p className="label">Всего часов</p>
                        <p>100.5</p>
                    </div>
                    <div className="Courses">
                        <p className="label">Пройдено курсов</p>
                        <p>12</p>
                    </div>
                    <div className="Operations">
                        <p className="label">Зарегистрирован</p>
                        <p>19.08.21</p>
                    </div>
                </div>
                <div className="last_operation">
                    <div className="last_participation">
                        <p className="label">Последняя операция</p>
                        <p>19.08.2021 в 18:00</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;