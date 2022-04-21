function Login() {
  return (
    <div className="login__container">
      <h1>Вход</h1>
      <input placeholder="Логин" className="login__input" type="text" />
      <input placeholder="Пароль" className="login__input mt-2" type="password" />
      <button className="default__btn mt-2">Войти</button>
    </div>
  );
}

export default Login;
