import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import agendamentosPDF from "../../Relatorios/Agendamentos/agendamentos";
import "../../components/css/button.css";

const dateFormater = (rowData) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(rowData.agddata));
};
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

const AgendamentoList = (props) => {
  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={() => props.editar(rowData.agdid)}
          className="btn btn-warning"
        >
          Editar
        </button>
        <button
          onClick={() => props.excluir(rowData.agdid)}
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
          <h4>Listagem de Agendamentos</h4>

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
            onClick={(e) => agendamentosPDF(props.agendamentos)}
          >
            Gerar PDF
          </button>
        </div>
        <div className="card">
          <DataTable
            value={props.agendamentos}
            responsiveLayout="scroll"
            selectionMode="single"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
          >
            <Column header="Data" body={dateFormater} sortable filter></Column>
            <Column
              field="agdfun"
              header="Funcionarios"
              sortable
              filter
            ></Column>
            <Column field="agdser" header="Serviços" sortable filter></Column>
            <Column field="agdusu" header="Usuarios" sortable filter></Column>
            <Column field="agdcli" header="Clientes" sortable filter></Column>
            <Column
              body={(rowData) => {
                return rowData.agdqtdhoras + " horas";
              }}
              field="agdqtdhoras"
              header="Quantidade de Horas"
              sortable
              filter
            ></Column>
            <Column
              body={(rowData) => {
                return rowData.agdvalortotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
              }}
              field="agdvalortotal"
              header="Valor Total"
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
export default AgendamentoList;
