import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import "../../components/css/formulario.css";

const MaquinaForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setMaquina({ ...props.maquina, [name]: value });
  };

  const [maqAnoFabricacaoMask, setMaqAnoFabricacaoMask] = useState(
    props.maquina.maqanofabricacao
  );
  const [maqnmrChassiMask, setMaqnmrChassiMask] = useState(
    props.maquina.maqnmrchassi
  );

  const combustivelSelect = [
    { label: "Diesel", value: "Diesel" },
    { label: "Álcool", value: "Álcool" },
    { label: "Gasolina", value: "Gasolina" },
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
          <h5>Cadastro de Maquinas</h5>
          <div className="centralizar">
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqmodelo">Modelo</label>
                <InputText
                  name="maqmodelo"
                  {...register("maqmodelo", {
                    required: {
                      value: true,
                      message: "O modelo é obrigatório!",
                    },
                    maxLength: {
                      value: 50,
                      message: "O modelo pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O modelo pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.maquina.maqmodelo}
                  onChange={handleInputChange}
                />
                {errors.maqmodelo && (
                  <span style={{ color: "red" }}>
                    {errors.maqmodelo.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqmarca">Marca</label>
                <InputText
                  name="maqmarca"
                  {...register("maqmarca", {
                    required: {
                      value: true,
                      message: "A marca é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "A marca pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 3,
                      message: "A marca deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.maquina.maqmarca}
                  onChange={handleInputChange}
                />
                {errors.maqmarca && (
                  <span style={{ color: "red" }}>
                    {errors.maqmarca.message}
                  </span>
                )}
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqtipocombustivel">Tipo do Combustivel</label>

                <Dropdown
                  options={combustivelSelect}
                  name="maqtipocombustivel"
                  value={props.maquina.maqtipocombustivel}
                  onChange={(handleInputChange) =>
                    props.setMaquina((maquina) => ({
                      ...maquina,
                      maqtipocombustivel: handleInputChange.value,
                    }))
                  }
                  placeholder="Selecione"
                  required
                />
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqanofabricacao">Data Fabricação</label>
                <div>
                  <InputMask
                    name="maqanofabricacao"
                    mask="99/99/9999"
                    value={maqAnoFabricacaoMask}
                    onChange={(e) => {
                      setMaqAnoFabricacaoMask(e.value);
                      props.setMaquina({
                        ...props.maquina,
                        maqanofabricacao: e.value,
                      });
                    }}
                  />
                  {errors.maqanofabricacao && (
                    <span style={{ color: "red" }}>
                      {errors.maqanofabricacao.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="label_campos">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqnmrchassi">Número do Chassi</label>
                <div>
                  <InputMask
                    name="maqnmrchassi"
                    mask="999-999999-99-999999"
                    value={maqnmrChassiMask}
                    onChange={(e) => {
                      setMaqnmrChassiMask(e.value);
                      props.setMaquina({
                        ...props.maquina,
                        maqnmrchassi: e.value,
                      });
                    }}
                  />
                  {errors.maqnmrchassi && (
                    <span style={{ color: "red" }}>
                      {errors.maqnmrchassi.message}
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
export default MaquinaForm;
