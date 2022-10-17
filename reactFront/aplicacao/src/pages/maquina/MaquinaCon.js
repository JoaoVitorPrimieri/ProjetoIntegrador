import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MaquinaList from "./MaquinaList";
import MaquinaForm from "./MaquinaForm";
import MaquinaSrv from "./MaquinaSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function MaquinaCont() {
  const toastRef = useRef();

  const [maquinas, setMaquinas] = useState([]);
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    MaquinaSrv.listar()
      .then((response) => {
        setMaquinas(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Maquinas atualizadas",
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

  const initialState = {
    maqid: null,
    maqmodelo: "",
    maqmarca: "",
    maqtipocombustivel: "",
    maqanofabricacao: "",
    maqnmrchassi: "",
  };

  const [maquina, setMaquina] = useState(initialState);
  const [editando, setEditando] = useState(false);

  const inserir = () => {
    setMaquina(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (maquina.maqid == null) {
      // inclussão
      MaquinaSrv.incluir(maquina)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
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
      MaquinaSrv.alterar(maquina)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
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
  const cancelar = () => {
    setEditando(false);
  };

  const editar = (id) => {
    setMaquina(maquinas.filter((maquina) => maquina.maqid === id)[0]);
    setEditando(true);
  };

  const excluir = (maqid) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(maqid),
    });
  };

  const excluirConfirm = (maqid) => {
    MaquinaSrv.excluir(maqid)
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
        <MaquinaList
          maquinas={maquinas}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />

        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <MaquinaForm
          maquina={maquina}
          setMaquina={setMaquina}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default MaquinaCont;
