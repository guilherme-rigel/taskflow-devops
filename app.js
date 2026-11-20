
const express = require("express");

const app = express();
app.use(express.json());

let tarefas = [];
let proximoId = 1;

// Rota inicial
app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API TaskFlow funcionando!"
  });
});

// GET - Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

// POST - Criar uma tarefa
app.post("/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;

  if (typeof titulo !== "string" || !titulo.trim()) {
    return res.status(400).json({
      erro: "O título da tarefa é obrigatório."
    });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    descricao: descricao || "",
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

// PUT - Atualizar uma tarefa
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  const { titulo, descricao, concluida } = req.body;

  if (titulo !== undefined) {
    if (typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({
        erro: "O título deve ser válido."
      });
    }
    tarefa.titulo = titulo.trim();
  }

  if (descricao !== undefined) {
    tarefa.descricao = descricao;
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  res.status(200).json(tarefa);
});

// DELETE - Excluir uma tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  tarefas.splice(indice, 1);

  res.status(204).send();
});

module.exports = app;
