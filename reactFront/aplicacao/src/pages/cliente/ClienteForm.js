import React, { useState } from "react";
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

  const [cliCpfMask, setcliCpfMask] = useState(props.cliente.clicpf);

  const [cliTelefoneMask, setcliTelefoneMask] = useState(
    props.cliente.clitelefone
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
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5>Cadastro de Clientes</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="clinome">Nome</label>
                <InputText
                  name="clinome"
                  {...register("clinome", {
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
                  defaultValue={props.cliente.clinome}
                  onChange={handleInputChange}
                />
                {errors.clinome && (
                  <span style={{ color: "red" }}>{errors.clinome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliemail">Email</label>
                <InputText
                  name="cliemail"
                  {...register("cliemail", {
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
                  defaultValue={props.cliente.cliemail}
                  onChange={handleInputChange}
                />
                {errors.cliemail && (
                  <span style={{ color: "red" }}>
                    {errors.cliemail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="clicpf">CPF</label>
                <InputMask
                  name="clicpf"
                  mask="999.999.999-99"
                  value={cliCpfMask}
                  onChange={(e) => {
                    setcliCpfMask(e.value);
                    props.setCliente({ ...props.cliente, clicpf: e.value });
                  }}
                />

                {errors.clicpf && (
                  <span style={{ color: "red" }}>{errors.clicpf.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="clitelefone">Telefone</label>
                <div>
                  <InputMask
                    name="clitelefone"
                    mask="(99)99999-9999"
                    value={cliTelefoneMask}
                    onChange={(e) => {
                      setcliTelefoneMask(e.value);
                      props.setCliente({
                        ...props.cliente,
                        clitelefone: e.value,
                      });
                    }}
                  />
                  {errors.clitelefone && (
                    <span style={{ color: "red" }}>
                      {errors.clitelefone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="cliendereco">Endereco</label>
                <InputText
                  name="cliendereco"
                  {...register("cliendereco", {
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
                  defaultValue={props.cliente.cliendereco}
                  onChange={handleInputChange}
                />
                {errors.cliendereco && (
                  <span style={{ color: "red" }}>
                    {errors.cliendereco.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="clisexo">Sexo</label>

                <Dropdown
                  options={sexoSelect}
                  name="clisexo"
                  value={props.cliente.clisexo}
                  onChange={(handleInputChange) =>
                    props.setCliente((cliente) => ({
                      ...cliente,
                      clisexo: handleInputChange.value,
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
