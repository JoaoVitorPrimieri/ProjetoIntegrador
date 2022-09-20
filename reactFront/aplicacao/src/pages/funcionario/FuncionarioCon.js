import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FuncionarioList from "./FuncionarioList";
import FuncionarioForm from "./FuncionarioForm";
import FuncionarioSrv from "./FuncionarioSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function FuncionarioCont() {
    const [funcionarios, setFuncionarios] = useState([]);
    const toastRef = useRef();
    const initialState = {
        funId: null,
        funNome: "",
        funEmail: "",
        funCpf: "",
        funTelefone: "",
        funEndereco: "",
        funSexo: "",
    };
    const [funcionario, setFuncionario] = useState(initialState);
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        FuncionarioSrv.listar()
            .then((response) => {
                setFuncionarios(response.data);
                toastRef.current.show({
                    severity: "success",
                    summary: "Funcionarios atualizados",
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
        setFuncionario(initialState);
    };

    const salvar = () => {
        if (funcionario. funId == null) {
            // inclussão

            FuncionarioSrv.incluir(funcionario)
                .then((response) => {
                    setEditando(false);
                    onClickAtualizar();
                    setFuncionario(initialState);

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
            FuncionarioSrv.alterar(funcionario)
                .then((response) => {
                    setEditando(false);
                    onClickAtualizar();
                    setFuncionario(initialState);

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
        setFuncionario(funcionarios.filter((funcionario) => funcionario. funId === id)[0]);
        setEditando(true);
    };

    const excluir = ( funId) => {
        confirmDialog({
            message: "Confirma a exclusão?",
            header: "Confirmação",
            icon: "pi pi-question",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            acceptClassName: "p-button-danger",
            accept: () => excluirConfirm( funId),
        });
    };

    const excluirConfirm = ( funId) => {
        FuncionarioSrv.excluir( funId)
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
                <FuncionarioList
                    funcionarios={funcionarios}
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
                <FuncionarioForm
                    funcionario={funcionario}
                    setFuncionario={setFuncionario}
                    salvar={salvar}
                    cancelar={cancelar}
                />
                <Toast ref={toastRef} />
            </div>
        );
    }
}

export default FuncionarioCont;
