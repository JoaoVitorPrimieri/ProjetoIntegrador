import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AgendamentoList from "./AgendamentoList";
import AgendamentoForm from "./AgendamentoForm";
import AgendamentoSrv from "./AgendamentoSrv";
import UsuarioSrv from "../usuario/UsuarioSrv";
import ServicoSrv from "../servico/ServicoSrv";
import ClienteSrv from "../cliente/ClienteSrv";
import FuncionarioSrv from "../funcionario/FuncionarioSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function AgendamentoCon() {
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const toastRef = useRef();
  const initialState = {
    agdid: null,
    agddata: "",
    agdfuncionario: "",
    agdservico: "",
    agdusuario: "",
    agdcliente: "",
    agdqtdhoras: "",
    agdvalortotal: "",
  };
  const [agendamento, setAgendamento] = useState(initialState);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
    UsuarioSrv.listar()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
    onClickAtualizar(); // ao inicializar execula método para atualizar
    ServicoSrv.listar()
      .then((response) => {
        setServicos(response.data);
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
    onClickAtualizar(); // ao inicializar execula método para atualizar
    ClienteSrv.listar()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
    onClickAtualizar(); // ao inicializar execula método para atualizar
    FuncionarioSrv.listar()
      .then((response) => {
        setFuncionarios(response.data);
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  }, []);

  const onClickAtualizar = () => {
    AgendamentoSrv.listar()
      .then((response) => {
        setAgendamentos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Agendamentos atualizados",
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
    setAgendamento(initialState);
    setEditando(true);
  };
  const cancelar = () => {
    setEditando(false);
  };
  const salvar = () => {
    if (agendamento.agdid == null) {
      // inclussão
      AgendamentoSrv.incluir(agendamento)
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
      AgendamentoSrv.alterar(agendamento)
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

  const editar = (id) => {
    setAgendamento(
      agendamentos.filter((agendamento) => agendamento.agdid === id)[0]
    );
    setEditando(true);
  };

  const excluir = (agdid) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(agdid),
    });
  };

  const excluirConfirm = (agdid) => {
    ServicoSrv.excluir(agdid)
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
        <AgendamentoList
          agendamentos={agendamentos}
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
        <AgendamentoForm
          agendamento={agendamento}
          servicos={servicos}
          clientes={clientes}
          funcionarios={funcionarios}
          usuarios={usuarios}
          setAgendamento={setAgendamento}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}

export default AgendamentoCon;
