import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { REGISTER } from "../../gql/mutations/register";

import { UserContext } from "../auth/AuthLayer";

function Register() {
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [tg, setTg] = useState();
  const [education, setEducation] = useState();
  const [age, setAge] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const { user, setUser } = useContext(UserContext);

  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (user.firstName || user.firstName == "") {
      history.push(from);
    }
  });

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      toast.success("Успешная регистрация");
      history.push("/login");
    },
  });
  return (
    <div className="login__container">
      <h1>Регистрация</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register({
            variables: {
              username,
              password,
              email,
              firstName,
              lastName,
              phone,
              tg,
              education,
              age,
            },
          });
        }}
      >
        <input
          placeholder="Имя"
          className="login__input mt-2"
          type="text"
          defaultValue={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Фамилия"
          className="login__input mt-2"
          type="text"
          defaultValue={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          placeholder="Логин"
          className="login__input mt-2"
          type="text"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Пароль"
          className="login__input mt-2"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          className="login__input mt-2"
          type="text"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Возраст"
          className="login__input mt-2"
          type="text"
          defaultValue={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          placeholder="Телефон"
          className="login__input mt-2"
          type="text"
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          placeholder="Телеграм"
          className="login__input mt-2"
          type="text"
          defaultValue={tg}
          onChange={(e) => setTg(e.target.value)}
          required
        />
        <input
          placeholder="Образование"
          className="login__input mt-2"
          type="text"
          defaultValue={education}
          onChange={(e) => setEducation(e.target.value)}
          required
        />

        <button className="default__btn mt-2" type="submit">
          Регистрация
        </button>
      </form>
    </div>
  );
}

export default Register;
