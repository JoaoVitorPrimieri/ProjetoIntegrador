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
  const [maquinas, setMaquinas] = useState([]);
  const toastRef = useRef();
  const initialState = {
    maqId: null,
    maqModelo: "",
    maqMarca: "",
    maqTipoCombustivel: "",
    maqAnoFabricacao: "",
    maqnmrChassi: "",
  };
  const [maquina, setMaquina] = useState(initialState);
  const [editando, setEditando] = useState(false);

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


  const inserir = () => {
    setEditando(true);
  };

  const cancelar = () => {
    console.log("Cancelou ...");
    setEditando(false);
    setMaquina(initialState);
  };

  const salvar = () => {
    if (maquina.maqId == null) {
      // inclussão
      MaquinaSrv.incluir(maquina)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          console.log("Incluiu ...");
          setMaquina(initialState);

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
          console.log("Alterou ...");
          setMaquina(initialState);

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
    setMaquina(maquinas.filter((maquina) => maquina.maqId === id)[0]);
    console.log(maquinas.filter((maquina) => maquina.maqId === id)[0]);
    setEditando(true);
  };

  const excluir = (maqId) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(maqId),
    });
  };

  const excluirConfirm = (maqId) => {
    MaquinaSrv.excluir(maqId)
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
