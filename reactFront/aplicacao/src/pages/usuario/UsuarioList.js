import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import usuariosPDF from "../../Relatorios/Usuarios/usuarios";

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

const UsuarioList = (props) => {
  const countryBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
           <button onClick={() => props.editar(rowData.usuId)}  className="btn btn-danger">Editar</button>
            <button onClick={() => props.excluir(rowData.usuid)} className="btn btn-danger">Excluir</button> 
        </React.Fragment>
    );
}
  return(
  <div>   
    <div>
      <h4>Listagem de Usuários</h4>
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
        onClick={(e) => usuariosPDF(props.usuarios)}
      >
        Gerar PDF
      </button>
      
      <div className="card">
        <DataTable value={props.usuarios} responsiveLayout="scroll" selectionMode="single" paginator paginatorTemplate={template2} rows={5} 
                    paginatorClassName="justify-content-center" className="mt-6">
          <Column field="usunome" header="Nome" sortable filter></Column>
          <Column field="usuemail" header="E-mail" sortable filter></Column>
          <Column field="usutelefone" header="Telefone"  sortable filter ></Column>
          <Column field="usuendereco" header="Endereço" sortable filter></Column>
          <Column header="Operações" body={countryBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>  
  </div>
);
  }
export default UsuarioList;