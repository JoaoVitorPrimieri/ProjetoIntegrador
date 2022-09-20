import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";

const FuncionarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setFuncionario({ ...props.funcionario, [name]: value });
  };

  const sexoSelect = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
    { label: "Outro", value: "Outro" },
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.salvar();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5>Cadastro de Funcionarios</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funNome">Nome</label>
                <InputText
                  name="funNome"
                  {...register("funNome", {
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
                  defaultValue={props.funcionario.funNome}
                  onChange={handleInputChange}
                />
                {errors.funNome && (
                  <span style={{ color: "red" }}>{errors.funNome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funEmail">Email</label>
                <InputText
                  name="funEmail"
                  {...register("funEmail", {
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
                  defaultValue={props.funcionario.funEmail}
                  onChange={handleInputChange}
                />
                {errors.funEmail && (
                  <span style={{ color: "red"}}>
                    {errors.funEmail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funCpf">CPF</label>
                <InputMask
                  name="funCpf"
                  mask="999.999.999-99"
                  defaultValue={props.funcionario.funCpf}
                  onChange={handleInputChange}
                />
                {errors.funCpf && (
                  <span style={{ color: "red" }}>{errors.funCpf.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funTelefone">Telefone</label>
                <div>
                  <InputMask
                    name="funTelefone"
                    mask="(99)99999-9999"
                    defaultValue={props.funcionario.funTelefone}
                    onChange={handleInputChange}
                  />
                  {errors.funTelefone && (
                    <span style={{ color: "red" }}>
                      {errors.funTelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funEndereco">Endereco</label>
                <InputText
                  name="funEndereco"
                  {...register("funEndereco", {
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
                  defaultValue={props.funcionario.funEndereco}
                  onChange={handleInputChange}
                />
                {errors.funEndereco && (
                  <span style={{ color: "red" }}>
                    {errors.funEndereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="funSexo">Sexo</label>

                <Dropdown
                  options={sexoSelect}
                  name="funSexo"
                  value={props.funcionario.funSexo}
                  onChange={(handleInputChange) =>
                    props.setFuncionario((funcionario) => ({
                      ...funcionario,
                      funSexo: handleInputChange.value,
                    }))
                  }
                  placeholder="Selecione"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              icon="pi pi-pencil"
              className="p-button-rounded p-button-text "
              label="Salvar"
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
export default FuncionarioForm;
