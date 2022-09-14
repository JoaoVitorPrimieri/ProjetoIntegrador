import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";

const UsuarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setUsuario({ ...props.usuario, [name]: value });
  };

  const [contraSenha, setContraSenha] = useState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
          props.salvar();

    //console.log(data);
    // if (contraSenha != props.usuario.senha) {
    //   setError("senha", {
    //     type: "custom",
    //     message: "Senha e contra senha são diferentes!",
    //   });
    // } else {
    //   props.salvar();
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5>Cadastro de Usuarios</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuNome">Nome</label>
                <InputText
                  name="usuNome"
                  {...register("usuNome", {
                    required: { value: true, message: "O nome é obrigatório!" },
                    maxLength: {
                      value: 50,
                      message: "O nome pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O nome pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usuNome}
                  onChange={handleInputChange}
                />
                {errors.usuNome && (
                  <span style={{ color: "red" }}>{errors.usuNome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuEmail">Email</label>
                <InputText
                  name="usuEmail"
                  {...register("usuEmail", {
                    required: {
                      value: true,
                      message: "O email é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "O email pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 10,
                      message: "O nome deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usuEmail}
                  onChange={handleInputChange}
                />
                {errors.usuEmail && (
                  <span style={{ color: "red" }}>
                    {errors.usuEmail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuCpf">CPF</label>
                <InputMask
                  name="usuCpf"
                  mask="999.999.999-99"
                  defaultValue={props.usuario.usuCpf}
                  onChange={handleInputChange}
                />
                {errors.usuCpf && (
                  <span style={{ color: "red" }}>{errors.usuCpf.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuTelefone">Telefone</label>
                <div>
                  <InputMask
                    name="usuTelefone"
                    mask="(99)99999-9999"
                    defaultValue={props.usuario.usuTelefone}
                    onChange={handleInputChange}
                  />
                  {errors.usuTelefone && (
                    <span style={{ color: "red" }}>
                      {errors.usuTelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuEndereco">Endereco</label>
                <InputText
                  name="usuEndereco"
                  {...register("usuEndereco", {
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
                  defaultValue={props.usuario.usuEndereco}
                  onChange={handleInputChange}
                />
                {errors.usuEndereco && (
                  <span style={{ color: "red" }}>
                    {errors.usuEndereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuSexo">Sexo</label>
                <InputText
                  name="usuSexo"
                  {...register("usuSexo", {
                    required: {
                      value: true,
                      message: "O campo sexo é obrigatório!",
                    },
                    maxLength: {
                      value: 10,
                      message: "O campo sexo pode ter no máximo 10 caracteres!",
                    },
                    minLength: {
                      value: 1,
                      message: "O campo sexo deve ter no mínimo 1 caracteres!",
                    },
                  })}
                  defaultValue={props.usuario.usuSexo}
                  onChange={handleInputChange}
                />
                {errors.usuSexo && (
                  <span style={{ color: "red" }}>{errors.usuSexo.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="usuSenha">Senha</label>
                <InputText
                  name="usuSenha"
                  {...register("usuSenha", {
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
                  defaultValue={props.usuario.usuSenha}
                  onChange={handleInputChange}
                />
                {errors.usuSenha && (
                  <span style={{ color: "red" }}>
                    {errors.usuSenha.message}
                  </span>
                )}
              </div>
            </div>
            {/* <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="contraSenha">Contra Senha</label>
                        <InputText name="contraSenha" defaultValue={contraSenha} 
                                   onChange={ e => setContraSenha(e.target.value)} />
                    </div>
                </div>                          */}
          </div>

          <div>
            <Button
              type="submit"
              icon="pi pi-pencil"
              className="p-button-rounded p-button-text "
              label="Salvar"
              onClick={props.salvar}
            ></Button>
            <Button
              type="button"
              icon="pi pi-trash"
              className="p-button-rounded p-button-text"
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
