import '../../static/css/news.css'
function NewsCard() {
    return (
        <div className="news_card">
            <div className="card_header">
                <h3>
                    ДТП
                </h3>
                <button className="news_button">
                    Подробнее
                </button>
            </div>
            <div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis in fugit odio odit nesciunt possimus porro itaque magnam. Corrupti vero cupiditate dolorum non vitae ex repellendus delectus laboriosam officia soluta.
                </p>
            </div>
        </div>
    );
}

export default NewsCard;