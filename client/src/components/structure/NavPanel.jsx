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
              <img src={man} />
              <div className="ms-3">
                <b style={{ fontSize: "23px" }}>{user.lastName} {user.firstName}</b> <br />
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
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
                    fill="#000"
                  />
                </svg>

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
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
                    fill="#000"
                  />
                </svg>

                <p>События</p>
              </div>
            </Link>
            <Link className="non_link" to={"/"} onClick={() => closeMenu()}>
              <div
                className={`menu__item ${
                  isLinkActive("/") && "menu__item_active"
                }`}
              >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
                    fill="#000"
                  />
                </svg>

                <p>Личный кабинет</p>
              </div>
            </Link>
          </>
        )}

        <hr />

        <div className="menu__item">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
              fill="#000"
            />
          </svg>

          <p>Контакты</p>
        </div>

        <div className="menu__item">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
              fill="#000"
            />
          </svg>

          <p>Помощь движению</p>
        </div>

        <div className="menu__item">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 0.833344C1.48892 0.833344 0.666672 1.65559 0.666672 2.66668V17.3333C0.666672 18.3444 1.48892 19.1667 2.5 19.1667H13.5C14.5111 19.1667 15.3333 18.3444 15.3333 17.3333V2.66668C15.3333 1.65559 14.5111 0.833344 13.5 0.833344H2.5ZM2.5 2.66668H13.5V17.3333L2.5 17.3351V2.66668ZM8 4.50001C6.45817 4.50001 5.25 5.70726 5.25 7.25001C5.25 8.79276 6.45817 10 8 10C9.54184 10 10.75 8.79276 10.75 7.25001C10.75 5.70726 9.54184 4.50001 8 4.50001ZM8 6.33334C8.53167 6.33334 8.91667 6.71926 8.91667 7.25001C8.91667 7.78076 8.53167 8.16668 8 8.16668C7.46834 8.16668 7.08334 7.78076 7.08334 7.25001C7.08334 6.71926 7.46834 6.33334 8 6.33334ZM8 10.9167C5.38659 10.9167 3.41667 12.2511 3.41667 14.0194V15.5H12.5833V14.0194C12.5833 12.2511 10.6134 10.9167 8 10.9167ZM8 12.75C9.3475 12.75 10.2821 13.212 10.6157 13.6667H5.38428C5.71703 13.212 6.6525 12.75 8 12.75Z"
              fill="#000"
            />
          </svg>

          <p>Новости движения</p>
        </div>
      </div>
    </div>
  );
}

export default NavPanel;
