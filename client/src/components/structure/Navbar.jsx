import { Link } from "react-router-dom";

import logo from "../../static/images/logo.svg";
import doubleArrow from "../../static/images/double_arrow.svg";

function Navbar({ navPanelRef }) {
  return (
    <div className="navbar__top rel">
      <img
        src={doubleArrow}
        width="25px"
        onClick={() => {
          if (navPanelRef.current) {
            navPanelRef.current.style.display = "block";
          }
        }}
      />
      <Link to={"/"}>
        <img className="logo__top" src={logo} />
      </Link>
    </div>
  );
}

export default Navbar;
