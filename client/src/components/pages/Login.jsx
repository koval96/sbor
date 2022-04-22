import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { UserContext } from "../auth/AuthLayer";

import { TOKEN_AUTH } from "../../gql/mutations/tokenAuth";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const {
    user,
    setUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (user.firstName || user.firstName == "") {
      console.log(user)
      history.push(from);
    }
  });

  const [tokenAuth, { loading }] = useMutation(TOKEN_AUTH, {
    onCompleted: (data) => {
      localStorage.setItem("accessToken", data.tokenAuth.token);
      localStorage.setItem("refreshToken", data.tokenAuth.refreshToken);
      setUser(data.tokenAuth.user);
      toast.success("Успешная авторизация");
      localStorage.setItem("reloaded", false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message == "Please enter valid credentials"
          ? "Введены неверные логин или пароль"
          : "Произошла ошибка"
      );
    },
  });
  return (
    <div className="login__container">
      <h1>Вход</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tokenAuth({
            variables: {
              username,
              password,
            },
          });
        }}
      >
        <input
          placeholder="Логин"
          className="login__input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Пароль"
          className="login__input mt-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="default__btn mt-2" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
