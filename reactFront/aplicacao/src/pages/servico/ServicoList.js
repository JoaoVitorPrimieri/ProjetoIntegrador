import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import servicosPDF from "../../Relatorios/Servicos/servicos";
import "../../components/css/button.css";

const template2 = {
  layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
    ];

    return (
      <React.Fragment>
        <span
          className="mx-1"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Itens por página:{" "}
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
  CurrentPageReport: (options) => {
    return (
      <span
        style={{
          color: "var(--text-color)",
          userSelect: "none",
          width: "120px",
          textAlign: "center",
        }}
      >
        {options.first} - {options.last} of {options.totalRecords}
      </span>
    );
  },
};

const ServicoList = (props) => {
  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={() => props.editar(rowData.serid)}
          className="btn btn-warning"
        >
          Editar
        </button>
        <button
          onClick={() => props.excluir(rowData.serid)}
          className="btn btn-danger"
        >
          Excluir
        </button>
      </React.Fragment>
    );
  };
  return (
    <div>
      <div>
        <div className="div_botoes">
          <h4>Listagem de Serviços</h4>

          <button
            button
            type="button"
            className="botoes"
            onClick={props.onClickAtualizar}
          >
            Atualizar
          </button>
          <button type="button" className="botoes" onClick={props.inserir}>
            Inserir
          </button>
          <button
            type="button"
            className="botoes"
            onClick={(e) => servicosPDF(props.servicos)}
          >
            Gerar PDF
          </button>
        </div>
        <div className="card">
          <DataTable
            value={props.servicos}
            responsiveLayout="scroll"
            selectionMode="single"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
          >
            <Column field="sernome" header="Nome" sortable filter></Column>
            <Column
              body={(rowData) => {
                return rowData.servalorservicobase.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
              }}
              field="servalorservicobase"
              header="Valor Base"
              sortable
              filter
            ></Column>
            <Column
              field="sermaquina"
              header="Maquina Alocada"
              sortable
              filter
            ></Column>
            <Column header="Operações" body={countryBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default ServicoList;
