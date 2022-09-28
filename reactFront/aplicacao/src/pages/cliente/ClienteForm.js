import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";

const ClienteForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setCliente({ ...props.cliente, [name]: value });
  };

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
        <div className="card">
          <h5>Cadastro de Clientes</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliNome">Nome</label>
                <InputText
                  name="cliNome"
                  {...register("cliNome", {
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
                  defaultValue={props.cliente.cliNome}
                  onChange={handleInputChange}
                />
                {errors.cliNome && (
                  <span style={{ color: "red" }}>{errors.cliNome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliEmail">Email</label>
                <InputText
                  name="cliEmail"
                  {...register("cliEmail", {
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
                  defaultValue={props.cliente.cliEmail}
                  onChange={handleInputChange}
                />
                {errors.cliEmail && (
                  <span style={{ color: "red" }}>
                    {errors.cliEmail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliCpf">CPF</label>
                <InputMask
                  name="cliCpf"
                  mask="999.999.999-99"
                  defaultValue={props.cliente.cliCpf}
                  onChange={handleInputChange}
                />
                {errors.cliCpf && (
                  <span style={{ color: "red" }}>{errors.cliCpf.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliTelefone">Telefone</label>
                <div>
                  <InputMask
                    name="cliTelefone"
                    mask="(99)99999-9999"
                    defaultValue={props.cliente.cliTelefone}
                    onChange={handleInputChange}
                  />
                  {errors.cliTelefone && (
                    <span style={{ color: "red" }}>
                      {errors.cliTelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliEndereco">Endereco</label>
                <InputText
                  name="cliEndereco"
                  {...register("cliEndereco", {
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
                  defaultValue={props.cliente.cliEndereco}
                  onChange={handleInputChange}
                />
                {errors.cliEndereco && (
                  <span style={{ color: "red" }}>
                    {errors.cliEndereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliSexo">Sexo</label>

                <Dropdown
                  options={sexoSelect}
                  name="cliSexo"
                  value={props.cliente.cliSexo}
                  onChange={(handleInputChange) =>
                    props.setCliente((cliente) => ({
                      ...cliente,
                      cliSexo: handleInputChange.value,
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
export default ClienteForm;
