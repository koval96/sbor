import man from "../../static/images/man.svg";
import doubleArrow from "../../static/images/double_arrow.svg";

function Navbar({ navPanelRef }) {
  return (
    <div className="navbar__top">
      <img
        src={doubleArrow}
        width="25px"
        onClick={() => {
            if (navPanelRef.current) {
                navPanelRef.current.style.display = "block"
            }
        }}
      />
      <img src={man} width="40px" />
    </div>
  );
}

export default Navbar;
