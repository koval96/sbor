import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

import useWindowDimensions from "../utils/useWindowDimensions";

import { UserContext } from "../auth/AuthLayer";
import { REVOKE_TOKEN } from "../../gql/mutations/revokeToken";

import doubleArrow from "../../static/images/double_arrow.svg";
import logo from "../../static/images/logo.svg";
import man from "../../static/images/man.svg";

function NavPanel({ navPanelRef }) {
  const { user, setUser } = useContext(UserContext);
  const { height, width } = useWindowDimensions();
  const loc = useLocation();
  const [revokeToken, { loading }] = useMutation(REVOKE_TOKEN, {
    onCompleted: () => {
      toast.success("Вы успешно вышли из аккаунта");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("accessToken", "");
      setUser({});
    },
    onError: (err) => {
      toast.error("Произошла ошибка");
    },
  });

  function isLinkActive(pathname) {
    if (
      (loc.pathname.includes(pathname) && pathname !== "/") ||
      (pathname == "/" && loc.pathname.length == 1)
    ) {
      return true;
    }
    return false;
  }

  function closeMenu() {
    if (width < 768) {
      navPanelRef.current.style.display = "none";
    }
  }

  return (
    <div className="navbar__main" ref={navPanelRef}>
      <div className="navbar__content">
        <div
          className="d-flex"
          style={{ justifyContent: "space-between", position: "relative" }}
        >
          <Link to={"/"} onClick={() => closeMenu()}>
            <img src={logo} className="navbar__logo" />
          </Link>
          <p></p>
          <img
            src={doubleArrow}
            width="25px"
            className="mb-2 arrow__panel"
            style={{ transform: "rotate(180deg)" }}
            onClick={() => {
              navPanelRef.current.style.display = "none";
            }}
          />
        </div>
        <hr className="nav__penel_fg" />
        <div className="d-flex">
          {user.username ? (
            <>
              <img src={man} width="60px" />
              <div className="ms-3">
                <b style={{ fontSize: "23px" }}>
                  {user.lastName} {user.firstName}
                </b>{" "}
                <br />
                <a
                  className="default__link"
                  onClick={() => {
                    revokeToken({
                      variables: {
                        refreshToken: localStorage.getItem("refreshToken"),
                      },
                    });
                    closeMenu();
                  }}
                >
                  Выйти
                </a>
              </div>
            </>
          ) : (
            <div className="d-block">
              <div>
                <Link
                  className="default__link"
                  to={"/login"}
                  onClick={() => closeMenu()}
                >
                  Войти
                </Link>
              </div>
              <div>
                <Link
                  className="default__link"
                  to={"/register"}
                  onClick={() => closeMenu()}
                >
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </div>
        {user.username && (
          <>
            <hr />
            <Link
              className="non_link"
              to={"/operations"}
              onClick={() => closeMenu()}
            >
              <div
                className={`menu__item ${
                  isLinkActive("/operations") && "menu__item_active"
                }`}
              >
                <p>Операции</p>
              </div>
            </Link>
            <Link
              className="non_link"
              to={"/events"}
              onClick={() => closeMenu()}
            >
              <div
                className={`menu__item ${
                  isLinkActive("/events") && "menu__item_active"
                }`}
              >
                <p>События</p>
              </div>
            </Link>
            <Link className="non_link" to={"/"} onClick={() => closeMenu()}>
              <div
                className={`menu__item ${
                  isLinkActive("/") && "menu__item_active"
                }`}
              >
                <p>Личный кабинет</p>
              </div>
            </Link>
          </>
        )}

        <hr />

        <Link className="non_link" to={"/contacts"} onClick={() => closeMenu()}>
          <div
            className={`menu__item ${
              isLinkActive("/contacts") && "menu__item_active"
            }`}
          >
            <p>Контакты</p>
          </div>
        </Link>

        <Link className="non_link" to={"/news"} onClick={() => closeMenu()}>
          <div
            className={`menu__item ${
              isLinkActive("/news") && "menu__item_active"
            }`}
          >
            <p>Новости движения</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavPanel;
