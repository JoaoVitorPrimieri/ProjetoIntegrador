import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import funcionariosPDF from "../../Relatorios/Funcionarios/funcionarios";
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

const FuncionarioList = (props) => {
  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={() => props.editar(rowData.funid)}
          className="btn btn-warning"
        >
          Editar
        </button>
        <button
          onClick={() => props.excluir(rowData.funid)}
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
          <h4>Listagem de Funcionários</h4>

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
            onClick={(e) => funcionariosPDF(props.funcionarios)}
          >
            Gerar PDF
          </button>
        </div>
        <div className="card">
          <DataTable
            value={props.funcionarios}
            responsiveLayout="scroll"
            selectionMode="single"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
          >
            <Column field="funnome" header="Nome" sortable filter></Column>
            <Column field="funemail" header="E-mail" sortable filter></Column>
            <Column
              field="funtelefone"
              header="Telefone"
              sortable
              filter
            ></Column>
            <Column
              field="funendereco"
              header="Endereço"
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
export default FuncionarioList;
