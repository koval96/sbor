import '../../static/css/courses.css'

function Course() {
    return (
        <div className="course">
            <div className="course_header">
                <h2 className="course_title">Курс картографии</h2>
                <button className="study_button">Записаться</button>
            </div>
            <div className="course_description">
                <p>
                    Картограф - специалист по составлению бумажных и электронных карт
                </p>
            </div>
            <div className="course_info">
                <div className="course_start">
                    <p className="info_header">
                        <b>Начало курсов:</b>
                    </p>
                    <p className="info_value">
                        11.05
                    </p>
                </div>
                <div className="course_teacher">
                    <p className="info_header">
                        <b>Преподаватель:</b>
                    </p>
                    <p className="info_value">
                        Данила Леонтьев
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Course;