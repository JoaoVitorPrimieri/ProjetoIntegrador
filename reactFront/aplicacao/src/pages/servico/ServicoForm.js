import React from "react";
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
                <label htmlFor="sernome">Nome</label>
                <InputText
                  name="sernome"
                  {...register("sernome", {
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
                  defaultValue={props.servico.sernome}
                  onChange={handleInputChange}
                />
                {errors.sernome && (
                  <span style={{ color: "red" }}>{errors.sernome.message}</span>
                )}
              </div>
            </div>

            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="servalorservicobase">Valor Base</label>
                <InputNumber
                  name="servalorservicobase"
                  {...register("servalorservicobase", {
                    valueAsNumber: true,
                  })}
                  inputMode="decimal"
                  value={props.servico.servalorservicobase}
                  onChange={(handleInputChange) =>
                    props.setServico((servico) => ({
                      ...servico,
                      servalorservicobase: handleInputChange.value,
                    }))
                  }
                />
                {errors.servalorservicobase && (
                  <span style={{ color: "red" }}>
                    {errors.servalorservicobase.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="sermaquinaid">Maquina:</label>
                <Dropdown
                  name="sermaquinaid"
                  value={props.servico.sermaquinaid}
                  options={props.maquinas}
                  onChange={(handleInputChange) =>
                    props.setServico((servico) => ({
                      ...servico,
                      sermaquinaid: handleInputChange.value,
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
