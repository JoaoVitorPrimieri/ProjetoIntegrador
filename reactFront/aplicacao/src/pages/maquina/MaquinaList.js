import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import maquinasPDF from "../../Relatorios/Maquinas/maquinas";

const dateFormater = (rowData) => {
  return new Intl.DateTimeFormat("pt-BR" , {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(rowData.maqanofabricacao));
};
const template2 = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    'RowsPerPageDropdown': (options) => {
        const dropdownOptions = [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 15, value: 15 }
        ];

        return (
            <React.Fragment>
                <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none'}}>Itens por página: </span>
                <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
            </React.Fragment>
        );
    },
    'CurrentPageReport': (options) => {
        return (
            <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                {options.first} - {options.last} of {options.totalRecords}
            </span>
        )
    }
};

const MaquinaList = (props) => {
  const countryBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
           <button onClick={() => props.editar(rowData.maqId)}  className="btn btn-danger">Editar</button>
            <button onClick={() => props.excluir(rowData.maqid)} className="btn btn-danger">Excluir</button> 
        </React.Fragment>
    );
}
  return(
  <div>   
    <div>
      <h4>Listagem de Maquinas</h4>
      <button
        button
        type="button"
        className="btn btn-light btn-sm"
        onClick={props.onClickAtualizar}
      >
        Atualizar
      </button>
      <button
        type="button"
        className="btn btn-light btn-sm"
        onClick={props.inserir}
      >
        Inserir
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => maquinasPDF(props.maquinas)}
      >
        Gerar PDF
      </button>
      <div className="card">
        <DataTable value={props.maquinas} responsiveLayout="scroll" selectionMode="single" paginator paginatorTemplate={template2} rows={9} 
                    paginatorClassName="justify-content-center" className="mt-6">
          <Column field="maqmodelo" header="Modelo" sortable filter></Column>
          <Column field="maqmarca" header="Marca" sortable filter></Column>
          <Column field="maqtipocombustivel" header="Tipo Combustivel"  sortable filter ></Column>
          <Column body={dateFormater} header="Data Fabricação" sortable filter></Column>
          <Column field="maqnmrchassi" header="Número do Chassi" sortable filter></Column>
          <Column header="Operações" body={countryBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>  
  </div>
);
  }
export default MaquinaList;