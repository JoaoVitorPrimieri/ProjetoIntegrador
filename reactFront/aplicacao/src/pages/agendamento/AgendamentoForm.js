import React from "react";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";

const AgendamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAgendamento({ ...props.agendamento, [name]: value });
  };

  const {
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
          <h5>Cadastro de Agendamentos</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdData">Data Agendamento</label>
                <div>
                  <InputMask
                    name="agdData"
                    mask="99/99/9999"
                    defaultValue={props.agendamento.agdData}
                    onChange={handleInputChange}
                  />
                  {errors.agdData && (
                    <span style={{ color: "red" }}>
                      {errors.agdData.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdFuncionario">Funcionário:</label>
                <Dropdown
                  name="agdFuncionario"
                  value={props.agendamento.agdFuncionario}
                  options={props.funcionarios}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdFuncionario: handleInputChange.value,
                    }))
                  }
                  optionLabel="funnome"
                  optionValue="funid"
                  placeholder="Selecione um funcionário"
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdServico">Serviço:</label>
                <Dropdown
                  name="agdServico"
                  value={props.agendamento.agdServico}
                  options={props.servicos}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdServico: handleInputChange.value,
                    }))
                  }
                  optionLabel="sernome"
                  optionValue="serid"
                  placeholder="Selecione um serviço"
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdUsuario">Usuario:</label>
                <Dropdown
                  name="agdUsuario"
                  value={props.agendamento.agdUsuario}
                  options={props.usuarios}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdUsuario: handleInputChange.value,
                    }))
                  }
                  optionLabel="usunome"
                  optionValue="usuid"
                  placeholder="Selecione um usuário"
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdCliente">Cliente:</label>
                <Dropdown
                  name="agdCliente"
                  value={props.agendamento.agdCliente}
                  options={props.clientes}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdCliente: handleInputChange.value,
                    }))
                  }
                  optionLabel="clinome"
                  optionValue="cliid"
                  placeholder="Selecione um cliente"
                />
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdqtdHoras">Horas Agendamento</label>
                <div>
                  <InputMask
                    name="agdqtdHoras"
                    mask="99:99"
                    defaultValue={props.agendamento.agdqtdHoras}
                    onChange={handleInputChange}
                  />
                  {errors.agdqtdHoras && (
                    <span style={{ color: "red" }}>
                      {errors.agdqtdHoras.message}
                    </span>
                  )}
                </div>
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
export default AgendamentoForm;
