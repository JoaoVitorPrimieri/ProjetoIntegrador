// import React from "react";
// import authService from "../../services/auth.service";

// import {Navigate} from "react-router-dom";
// import {withRouter} from "react-router-dom";

// class LoginPage extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             usuEmail: "",
//             usuSenha: "",
//             usuEndereco: "a",
//             usuTelefone: "a",
//             usuCpf: "a",
//             usuNome: "a",
//             usuSexo: "a",
//             redirectTo: null
//         }
//     }

//     sendLogin = async (event) => {
//         event.preventDefault();
//         let data = {
//             usuEmail: this.state.usuEmail,
//             usuSenha: this.state.usuSenha,
//             usuNome: this.state.usuNome,
//             usuCpf: this.state.usuCpf,
//             usuTelefone: this.state.usuTelefone,
//             usuEndereco: this.state.usuEndereco,
//             usuSexo: this.state.usuSexo
//         }
//         try{
//             let res = await authService.authenticate(data);
//             console.log("res", res.data);
//             authService.setLoggedUser(res.data.data);
//             this.setState({redirectTo: "/agendamentos"});
//         }catch(error){
//             console.log(error);
//         }
//     }
   
//     render() {
//         if(this.state.redirectTo){
//             return (
//                 <Navigate to={this.state.redirectTo}/>
//             )
//             }

//         return (
//             <div className="container d-flex justify-content-center">
//                 <div className="card mt-5 w-50">
//                     <div className="card-body">
//                         <form onSubmit={this.sendLogin}>
//                             <div className="form-group">
//                                 <label htmlFor="usuEmail">Usuário</label>
//                                 <input 
//                                     type="text" 
//                                     className="form-control"
//                                     value={this.state.usuEmail}
//                                     onChange={e => this.setState({usuEmail: e.target.value})}
//                                     id="usuEmail" 
//                                     placeholder="Usuário" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="usuSenha">Senha</label>
//                                 <input 
//                                     type="usuSenha" 
//                                     className="form-control" 
//                                     value={this.state.usuSenha}
//                                     onChange={e => this.setState({usuSenha: e.target.value})}
//                                     id="usuSenha" 
//                                     placeholder="Senha"/>
//                             </div>
//                             <button type="submit" className="btn btn-primary">Entrar</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default LoginPage;