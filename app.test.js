
const request = require("supertest");
const app = require("./app");

describe("Testes da API TaskFlow", () => {

  test("GET / deve retornar status 200", async () => {
    const resposta = await request(app).get("/");

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.mensagem).toBe(
      "API TaskFlow funcionando!"
    );
  });

  test("GET /tarefas deve retornar uma lista", async () => {
    const resposta = await request(app).get("/tarefas");

    expect(resposta.statusCode).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test("POST /tarefas deve cadastrar uma tarefa", async () => {
    const resposta = await request(app)
      .post("/tarefas")
      .send({
        titulo: "Estudar DevOps",
        descricao: "Criar testes automatizados"
      });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.titulo).toBe("Estudar DevOps");
    expect(resposta.body.concluida).toBe(false);
  });

  test("POST /tarefas sem título deve retornar erro 400", async () => {
    const resposta = await request(app)
      .post("/tarefas")
      .send({
        descricao: "Tarefa sem título"
      });

    expect(resposta.statusCode).toBe(400);
  });

  test("PUT /tarefas/:id deve atualizar uma tarefa", async () => {
    const criacao = await request(app)
      .post("/tarefas")
      .send({ titulo: "Tarefa original" });

    const resposta = await request(app)
      .put(`/tarefas/${criacao.body.id}`)
      .send({
        titulo: "Tarefa atualizada",
        concluida: true
      });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.titulo).toBe("Tarefa atualizada");
    expect(resposta.body.concluida).toBe(true);
  });

  test("DELETE /tarefas/:id deve excluir uma tarefa", async () => {
    const criacao = await request(app)
      .post("/tarefas")
      .send({ titulo: "Tarefa para excluir" });

    const resposta = await request(app)
      .delete(`/tarefas/${criacao.body.id}`);

    expect(resposta.statusCode).toBe(204);

    const consulta = await request(app).get("/tarefas");

    expect(
      consulta.body.some(t => t.id === criacao.body.id)
    ).toBe(false);
  });

  test("PUT em tarefa inexistente deve retornar 404", async () => {
    const resposta = await request(app)
      .put("/tarefas/999999")
      .send({ titulo: "Teste" });

    expect(resposta.statusCode).toBe(404);
  });

  test("DELETE em tarefa inexistente deve retornar 404", async () => {
    const resposta = await request(app)
      .delete("/tarefas/999999");

    expect(resposta.statusCode).toBe(404);
  });

});
