import { MapDiv } from "../utils/Map";
import '../../static/css/news.css'
function News() {
    return (
        <div className="about_news">
            <h3 className="title">ДТП</h3>
            <div className="author">
                <p className="label">
                    Автор:
                </p>
                <p>
                    Максим Дорофеев
                </p>
            </div>
            <div className="article">
                <div>
                    <MapDiv />
                </div>
                <div className="text">
                    <p >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis fuga sit, necessitatibus deleniti sequi, dolorum dolore eos iure eius error nulla ad eligendi facilis eaque omnis quam veniam hic quasi?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae enim obcaecati molestiae aliquam explicabo, illum consequatur at quasi et in eius adipisci, veritatis quia maiores magnam optio voluptatibus soluta! Consectetur.
                    </p>
                </div>
            </div>
            <button className="news_button">Закрыть</button>
        </div>
    );
}

export default News;