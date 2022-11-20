import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import "../../components/css/formulario.css";

const FuncionarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setFuncionario({ ...props.funcionario, [name]: value });
  };
  const [funtelefoneMask, setFuntelefoneMask] = useState(
    props.funcionario.funtelefone
  );
  const [funcpfMask, setFuncpfMask] = useState(props.funcionario.funcpf);

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
      <div style={{ padding: 15 }}>
        <div className="forms">
          <h5>Cadastro de Funcionarios</h5>
          <div className="centralizar">
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funnome">Nome</label>
                <InputText
                  name="funnome"
                  {...register("funnome", {
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
                  defaultValue={props.funcionario.funnome}
                  onChange={handleInputChange}
                />
                {errors.funnome && (
                  <span style={{ color: "red" }}>{errors.funnome.message}</span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funemail">Email</label>
                <InputText
                  name="funemail"
                  {...register("funemail", {
                    required: {
                      value: true,
                      message: "O email é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "O email pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O nome deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.funcionario.funemail}
                  onChange={handleInputChange}
                />
                {errors.funemail && (
                  <span style={{ color: "red" }}>
                    {errors.funemail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funcpf">CPF</label>
                <InputMask
                  name="funcpf"
                  mask="999.999.999-99"
                  value={funcpfMask}
                  onChange={(e) => {
                    setFuncpfMask(e.value);
                    props.setFuncionario({
                      ...props.funcionario,
                      funcpf: e.value,
                    });
                  }}
                />

                {errors.funcpf && (
                  <span style={{ color: "red" }}>{errors.funcpf.message}</span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funtelefone">Telefone</label>
                <div>
                  <InputMask
                    name="funtelefone"
                    mask="(99)99999-9999"
                    value={funtelefoneMask}
                    onChange={(e) => {
                      setFuntelefoneMask(e.value);
                      props.setFuncionario({
                        ...props.funcionario,
                        funtelefone: e.value,
                      });
                    }}
                  />
                  {errors.funtelefone && (
                    <span style={{ color: "red" }}>
                      {errors.funtelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funendereco">Endereco</label>
                <InputText
                  name="funendereco"
                  {...register("funendereco", {
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
                  defaultValue={props.funcionario.funendereco}
                  onChange={handleInputChange}
                />
                {errors.funendereco && (
                  <span style={{ color: "red" }}>
                    {errors.funendereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="funsexo">Sexo</label>

                <Dropdown
                  options={sexoSelect}
                  name="funsexo"
                  value={props.funcionario.funsexo}
                  onChange={(handleInputChange) =>
                    props.setFuncionario((funcionario) => ({
                      ...funcionario,
                      funsexo: handleInputChange.value,
                    }))
                  }
                  placeholder="Selecione"
                  required
                />
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
export default FuncionarioForm;
