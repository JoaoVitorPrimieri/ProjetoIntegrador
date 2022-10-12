import React, { useState } from "react";

function initialState() {
  return { user: "", password: "" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            name="user"
            onChange={onChange}
            value={values.user}
          />
          
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
export default UserLogin;
