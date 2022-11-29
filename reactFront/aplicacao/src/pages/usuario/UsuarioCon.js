import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UsuarioList from "./UsuarioList";
import UsuarioForm from "./UsuarioForm";
import UsuarioSrv from "./UsuarioSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function UsuarioCont() {
  const [usuarios, setUsuarios] = useState([]);
  const toastRef = useRef();
  const initialState = {
    usuid: null,
    usunome: "",
    usuemail: "",
    usucpf: "",
    usutelefone: "",
    usuendereco: "",
    ususexo: "",
    ususenha: "",
  };
  const [usuario, setUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    UsuarioSrv.listar()
      .then((response) => {
        setUsuarios(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Usuarios atualizados",
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
    setUsuario(initialState);
    setEditando(true);
  };

  const cancelar = () => {
    setEditando(false);
    setUsuario(initialState);
  };

  const salvar = () => {
    if (usuario.usuid == null) {
      // inclussão

      UsuarioSrv.incluir(usuario)
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
      UsuarioSrv.alterar(usuario)
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
    setUsuario(usuarios.filter((usuario) => usuario.usuid === id)[0]);
    setEditando(true);
  };

  const excluir = (usuid) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(usuid),
    });
  };

  const excluirConfirm = (usuid) => {
    UsuarioSrv.excluir(usuid)
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
        <UsuarioList
          usuarios={usuarios}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
          onClickAtualizar={onClickAtualizar}
        />
        {/* <Login usuarios={usuarios} /> */}

        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <UsuarioForm
          usuario={usuario}
          setUsuario={setUsuario}
          salvar={salvar}
          cancelar={cancelar}
        />
        {/* <Login usuario={usuario}
          setUsuario={setUsuario}
          salvar={salvar}
          cancelar={cancelar} />
        <Toast ref={toastRef} /> */}
      </div>
    );
  }
}

export default UsuarioCont;
