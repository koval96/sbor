import '../../static/css/contacts.css'


function Contacts() {
    return (
        <div>
            <div className="info-block">
                <p>
                    <b>Горячая линия:</b>
                </p>
                <p className="value">
                    +7 (777) 777-77-77
                </p>
            </div>
            <div className="info-block">
                <p>
                    <b>Call-center:</b>
                </p>
                <p className="value">
                    +7 (777) 777-77-77
                </p>
            </div>
            <div className="info-block">
                <p>
                    <b>Телефон организаторов:</b>
                </p>
                <p className="value">
                    +7 (777) 777-77-77
                </p>
            </div>
            <div>
                <p>
                    <b className="social_medias">
                        Наши сосцети:
                    </b>
                </p>
                <div className="hrefs">
                    <a href="#" className="href">
                        VK
                    </a>
                    <a href="#" className="href">
                        Youtube
                    </a>
                    <a href="#" className="href">
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contacts;