import React, { useState } from "react";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import "../../components/css/formulario.css";

const AgendamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAgendamento({ ...props.agendamento, [name]: value });
  };

  const [agdDataMask, setagdDataMask] = useState(props.agendamento.agddata);

  const [agdHorasMask, setagdHorasMask] = useState(props.agendamento.agdhoras);

  const {
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
          <h5>Cadastro de Agendamentos</h5>
          <div className="centralizar">
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agddata">Data Agendamento</label>
                <div>
                  <InputMask
                    name="agddata"
                    mask="99/99/9999"
                    value={agdDataMask}
                    onChange={(e) => {
                      setagdDataMask(e.value);
                      props.setAgendamento({
                        ...props.agendamento,
                        agddata: e.value,
                      });
                    }}
                  />
                  {errors.agddata && (
                    <span style={{ color: "red" }}>
                      {errors.agddata.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdfuncionario">Funcionário:</label>
                <Dropdown
                  name="agdfuncionario"
                  value={props.agendamento.agdfuncionario}
                  options={props.funcionarios}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdfuncionario: handleInputChange.value,
                    }))
                  }
                  optionLabel="funnome"
                  optionValue="funid"
                  placeholder="Selecione um funcionário"
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdservico">Serviço:</label>
                <Dropdown
                  name="agdservico"
                  value={props.agendamento.agdservico}
                  options={props.servicos}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdservico: handleInputChange.value,
                    }))
                  }
                  optionLabel="sernome"
                  optionValue="serid"
                  placeholder="Selecione um serviço"
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdusuario">Usuario:</label>
                <Dropdown
                  name="agdusuario"
                  value={props.agendamento.agdusuario}
                  options={props.usuarios}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdusuario: handleInputChange.value,
                    }))
                  }
                  optionLabel="usunome"
                  optionValue="usuid"
                  placeholder="Selecione um usuário"
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdcliente">Cliente:</label>
                <Dropdown
                  name="agdcliente"
                  value={props.agendamento.agdcliente}
                  options={props.clientes}
                  onChange={(handleInputChange) =>
                    props.setAgendamento((agendamento) => ({
                      ...agendamento,
                      agdcliente: handleInputChange.value,
                    }))
                  }
                  optionLabel="clinome"
                  optionValue="cliid"
                  placeholder="Selecione um cliente"
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="agdqtdhoras">Horas Agendamento</label>
                <div>
                  <InputMask
                    name="agdqtdhoras"
                    mask="99:99"
                    value={agdHorasMask}
                    onChange={(e) => {
                      setagdHorasMask(e.value);
                      props.setAgendamento({
                        ...props.agendamento,
                        agdqtdhoras: e.value,
                      });
                    }}
                  />
                  {errors.agdqtdhoras && (
                    <span style={{ color: "red" }}>
                      {errors.agdqtdhoras.message}
                    </span>
                  )}
                </div>
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
export default AgendamentoForm;
