import man from "../../static/images/man.svg";
import '../../static/css/profile.css'
function Profile() {
    return (
        <div className="">
            <div className="profile_header">
                <div className="profile_name">
                    <img className="profile_image" src={man} width="120px" />
                    <div className="surname info_block">
                        <p className="name">Узкий Владимир</p>
                        <p className="label">Стаж: 2 года</p>
                    </div>
                </div>
                <div className="contacts">
                    <div className="Phone info_block">
                        <p className="label">Телефон</p>
                        <p>+7 (777) 777-77-77</p>
                    </div>
                    <div className="Telegram info_block">
                        <p className="label">Telegram</p>
                        <p>@shirokiy</p>
                    </div>
                </div>
                <div className="skills info_block">
                    <div className="operations">
                        <p className="label">Количество операций</p>
                        <p>10</p>
                    </div>
                    <div className="Courses ">
                        <p className="label">Пройдено курсов</p>
                        <p>12</p>
                    </div>
                </div>
                <div className="last_search">
                    <div>
                        <p className="lable">Последяя операция</p>
                        <p>18.04.2031</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;