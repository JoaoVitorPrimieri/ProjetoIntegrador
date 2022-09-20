import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";

const MaquinaForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setMaquina({ ...props.maquina, [name]: value });
  };

  const [contraSenha, setContraSenha] = useState();

  const combustivelSelect = [
    { label: "Diesel", value: "Diesel" },
    { label: "Álcool", value: "Álcool" },
    { label: "Gasolina", value: "Gasolina" },
  ];

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
                <label htmlFor="maqModelo">Modelo</label>
                <InputText
                  name="maqModelo"
                  {...register("maqModelo", {
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
                  defaultValue={props.maquina.maqModelo}
                  onChange={handleInputChange}
                />
                {errors.maqModelo && (
                  <span style={{ color: "red" }}>{errors.maqModelo.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqMarca">Marca</label>
                <InputText
                  name="maqMarca"
                  {...register("maqMarca", {
                    required: {
                      value: true,
                      message: "A marca é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "A marca pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 10,
                      message: "A marca deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.maquina.maqMarca}
                  onChange={handleInputChange}
                />
                {errors.maqMarca && (
                  <span style={{ color: "red" }}>
                    {errors.maqMarca.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqTipoCombustivel">Tipo do Combustivel</label>

                <Dropdown
                  options={combustivelSelect}
                  name="maqTipoCombustivel"
                  value={props.maquina.maqTipoCombustivel}
                  onChange={(handleInputChange) =>
                    props.setMaquina((maquina) => ({
                      ...maquina,
                      maqTipoCombustivel: handleInputChange.value,
                    }))
                  }
                  placeholder="Selecione"
                  required
                />
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqAnoFabricacao">Ano Fabricação</label>
                <div>
                  <InputMask
                    name="maqAnoFabricacao"
                    mask="99/99/9999"
                    defaultValue={props.maquina.maqAnoFabricacao}
                    onChange={handleInputChange}
                  />
                  {errors.maqAnoFabricacao && (
                    <span style={{ color: "red" }}>
                      {errors.maqAnoFabricacao.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-fluid gridF formgrid">
              <div className="field col-12 md:col-4">
                <label htmlFor="maqnmrChassi">Número do Chassi</label>
                <div>
                  <InputMask
                    name="maqnmrChassi"
                    mask="999-999999-99-999999"
                    defaultValue={props.maquina.maqnmrChassi}
                    onChange={handleInputChange}
                  />
                  {errors.maqnmrChassi && (
                    <span style={{ color: "red" }}>
                      {errors.maqnmrChassi.message}
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
export default MaquinaForm;
