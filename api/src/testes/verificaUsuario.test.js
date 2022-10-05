const request = require('supertest')
const app = require('../app')

    describe("Criar um usuário", () => {
        it("Deve criar um usuário", async () => {
        const response = await request(app)
        .post("/api/usuarios")
        .send({
            usuNome:"bernardo radin",
            usuEmail:"Paludo@teste.com",
            usuCpf:"030.925.980-08",
            usuTelefone:"(54)99962-8219",
            usuEndereco:"parai",
            usuSexo:null,
            usuSenha:"123456"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuario adicionado com sucesso!");
    });
});
        


// describe('Teste excluir um usuário', () => {
//     it('Deve excluir um usuário', async () => {
//         const response = await request(app)
//         .delete("/api/usuarios/81")
//         .send({});
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("message", "Usuario deletado com sucesso!");
    
// });
// });
