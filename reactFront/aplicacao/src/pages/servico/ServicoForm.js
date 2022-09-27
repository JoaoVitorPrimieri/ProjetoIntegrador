import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const ServicoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setServico({ ...props.servico, [name]: value });
  };

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
          <h5>Cadastro de Serviços</h5>
          <div style={{ marginLeft: "33em" }}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="serNome">Nome</label>
                <InputText
                  name="serNome"
                  {...register("serNome", {
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
                  defaultValue={props.servico.serNome}
                  onChange={handleInputChange}
                />
                {errors.serNome && (
                  <span style={{ color: "red" }}>{errors.serNome.message}</span>
                )}
              </div>
            </div>
           
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="serValorServicoBase">Valor Base</label>
                <InputNumber
                  name="serValorServicoBase"
                  {...register("serValorServicoBase", {
                   valueAsNumber: true,
                  })}
                  inputMode="decimal"
                  value={props.servico.serValorServicoBase}
                  onChange={(handleInputChange) =>
                    props.setServico((servico) => ({
                      ...servico,
                      serValorServicoBase: handleInputChange.value,
                    }))
                  }
                />
                {errors.serValorServicoBase && (
                  <span style={{ color: "red" }}>
                    {errors.serValorServicoBase.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="serMaquinaId">Maquina:</label>
                <Dropdown
                  name="serMaquinaId"
                  value={props.servico.serMaquinaId}
                  options={props.maquinas}
                  onChange={(handleInputChange) =>
                    props.setServico((servico) => ({
                      ...servico,
                      serMaquinaId: handleInputChange.value,
                    }))
                  }
                  optionLabel="maqmodelo"
                  optionValue="maqid"
                  placeholder="Selecione uma máquina"

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
export default ServicoForm;
