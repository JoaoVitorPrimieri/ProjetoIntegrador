const request = require('supertest')
const app = require('../app')

//     describe("Criar um usuário", () => {
//         it("Deve criar um usuário", async () => {
//         const response = await request(app)
//         .post("/api/usuarios")
//         .send({
//             usuId: 666,
//             usuNome:"bernardo radin",
//             usuEmail:"Paludo@teste.com",
//             usuCpf:"030.925.980-08",
//             usuTelefone:"(54)99962-8219",
//             usuEndereco:"parai",
//             usuSexo:"Feminino",
//             usuSenha:"123456"
//         });

//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty("message", "Usuario adicionado com sucesso!");
//     });
// });
        


describe('Teste excluir um usuário', () => {
    it('Deve excluir um usuário', async () => {
        const response = await request(app)
        .delete("/api/usuarios/76")
        .send({});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Usuario deletado com sucesso!");
    
});
});
