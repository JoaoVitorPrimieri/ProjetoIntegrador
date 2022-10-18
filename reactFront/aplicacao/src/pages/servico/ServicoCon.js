import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ServicoList from "./ServicoList";
import ServicoForm from "./ServicoForm";
import ServicoSrv from "./ServicoSrv";
import MaquinaSrv from "../maquina/MaquinaSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function ServicoCont() {
  const toastRef = useRef();

  const [maquinas, setMaquinas] = useState([]);
  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
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
  }, []);
  const [servicos, setServicos] = useState([]);
  const onClickAtualizar = () => {
    ServicoSrv.listar()
      .then((response) => {
        setServicos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Serviço atualizado",
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
    serid: null,
    sernome: "",
    servalorservicobase: "",
    sermaquinaid: "",
  };
  const [servico, setServico] = useState(initialState);
  const [editando, setEditando] = useState(false);

  const inserir = () => {
    setServico(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (servico.serid == null) {
      // inclussão
      ServicoSrv.incluir(servico)
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
      ServicoSrv.alterar(servico)
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
    setServico(servicos.filter((servico) => servico.serid === id)[0]);
    setEditando(true);
  };

  const excluir = (serid) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(serid),
    });
  };

  const excluirConfirm = (serid) => {
    ServicoSrv.excluir(serid)
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
        <ServicoList
          servicos={servicos}
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
        <ServicoForm
          servico={servico}
          maquinas={maquinas}
          setServico={setServico}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default ServicoCont;
