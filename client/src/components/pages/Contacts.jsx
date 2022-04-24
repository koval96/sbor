import "../../static/css/contacts.css";

function Contacts() {
  return (
    <div>
      <div className="info-block">
        <p>
          <b>Горячая линия:</b>
        </p>
        <p className="value">+7 (904) 045-51-51</p>
      </div>
      <div>
        <p>
          <b className="social_medias">Наши сосцети:</b>
        </p>
        <a href="#" className="href">
          VK
        </a>{" "}
        <br />
        <a href="#" className="href">
          Youtube
        </a>{" "}
        <br />
        <a href="#" className="href">
          Instagram
        </a>
      </div>
    </div>
  );
}

export default Contacts;
