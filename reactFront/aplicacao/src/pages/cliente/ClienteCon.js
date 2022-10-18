import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClienteList from "./ClienteList";
import ClienteForm from "./ClienteForm";
import ClienteSrv from "./ClienteSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function ClienteCont() {
  const [clientes, setClientes] = useState([]);
  const toastRef = useRef();
  const initialState = {
    cliid: null,
    clinome: "",
    cliemail: "",
    clicpf: "",
    clitelefone: "",
    cliendereco: "",
    clisexo: "",
    clisenha: "",
  };
  const [cliente, setCliente] = useState(initialState);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    ClienteSrv.listar()
      .then((response) => {
        setClientes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Clientes atualizados",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const inserir = () => {
    setEditando(true);
  };

  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
    setCliente(initialState);
  };

  const salvar = () => {
    if (cliente.cliid == null) {
      // inclussão

      ClienteSrv.incluir(cliente)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          setCliente(initialState);

          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else {
      // alteração
      ClienteSrv.alterar(cliente)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          setCliente(initialState);

          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const editar = (id) => {
    setCliente(clientes.filter((cliente) => cliente.cliid === id)[0]);
    setEditando(true);
  };

  const excluir = (cliid) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(cliid),
    });
  };

  const excluirConfirm = (cliid) => {
    ClienteSrv.excluir(cliid)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  if (!editando) {
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <ConfirmDialog />
        <ClienteList
          clientes={clientes}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
          onClickAtualizar={onClickAtualizar}
        />

        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ClienteForm
          cliente={cliente}
          setCliente={setCliente}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default ClienteCont;
