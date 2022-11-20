import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import "../../components/css/formulario.css";

const UsuarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setUsuario({ ...props.usuario, [name]: value });
  };

  const [usuCpfMask, setUsuCpfMask] = useState(props.usuario.usucpf);

  const [usuTelefoneMask, setUsuTelefoneMask] = useState(
    props.usuario.usutelefone
  );

  const sexoSelect = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
    { label: "Outro", value: "Outro" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.salvar();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="forms" style={{ padding: 15 }}>
        <div className="forms">
          <h5>Cadastro de Usuarios</h5>
          <div className="centralizar">
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="usunome">Nome</label>
                <InputText
                  name="usunome"
                  {...register("usunome", {
                    required: {
                      value: true,
                      message: "O nome é obrigatório!",
                    },
                    maxLength: {
                      value: 50,
                      message: "O nome pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O nome pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usunome}
                  onChange={handleInputChange}
                />
                {errors.usunome && (
                  <span style={{ color: "red" }}>{errors.usunome.message}</span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuemail">Email</label>
                <InputText
                  name="usuemail"
                  {...register("usuemail", {
                    required: {
                      value: true,
                      message: "O email é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "O email pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 5,
                      message: "O nome deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usuemail}
                  onChange={handleInputChange}
                />
                {errors.usuemail && (
                  <span style={{ color: "red" }}>
                    {errors.usuemail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="usucpf">CPF</label>
                <InputMask
                  name="usucpf"
                  mask="999.999.999-99"
                  value={usuCpfMask}
                  onChange={(e) => {
                    setUsuCpfMask(e.value);
                    props.setUsuario({ ...props.usuario, usucpf: e.value });
                  }}
                />

                {errors.usucpf && (
                  <span style={{ color: "red" }}>{errors.usucpf.message}</span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="usutelefone">Telefone</label>
                <div>
                  <InputMask
                    name="usutelefone"
                    mask="(99)99999-9999"
                    value={usuTelefoneMask}
                    onChange={(e) => {
                      setUsuTelefoneMask(e.value);
                      props.setUsuario({
                        ...props.usuario,
                        usutelefone: e.value,
                      });
                    }}
                  />
                  {errors.usutelefone && (
                    <span style={{ color: "red" }}>
                      {errors.usutelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuendereco">Endereco</label>
                <InputText
                  name="usuendereco"
                  {...register("usuendereco", {
                    required: {
                      value: true,
                      message: "O endereco é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "O endereco pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O endereco deve ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usuendereco}
                  onChange={handleInputChange}
                />
                {errors.usuendereco && (
                  <span style={{ color: "red" }}>
                    {errors.usuendereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="ususexo">Sexo</label>

                <Dropdown
                  options={sexoSelect}
                  name="ususexo"
                  value={props.usuario.ususexo}
                  onChange={(handleInputChange) =>
                    props.setUsuario((usuario) => ({
                      ...usuario,
                      ususexo: handleInputChange.value,
                    }))
                  }
                  placeholder="Selecione"
                  required
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="ususenha">Senha</label>
                <InputText
                  name="ususenha"
                  {...register("ususenha", {
                    required: {
                      value: true,
                      message: "O campo senha é obrigatório!",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "O campo senha pode ter no máximo 30 caracteres!",
                    },
                    minLength: {
                      value: 7,
                      message: "O campo senha deve ter no mínimo 7 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.ususenha}
                  onChange={handleInputChange}
                />
                {errors.ususenha && (
                  <span style={{ color: "red" }}>
                    {errors.ususenha.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="div_buttons">
            <Button
              type="submit"
              icon="pi pi-pencil"
              className="buttons"
              label="Salvar"
            ></Button>
            <Button
              type="button"
              icon="pi pi-trash"
              className="buttons"
              label="Cancelar"
              onClick={props.cancelar}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UsuarioForm;
