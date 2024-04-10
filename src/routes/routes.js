const express = require("express");

const listarContasBancarias = require("../controller/GET_listarContaBancaria");
const atualizarUsuarioDaContaBancaria = require("../controller/PUT_atualizarConta");
const criarContaBancaria = require("../controller/POST_criarConta");
const excluirContaBancaria = require("../controller/DELETE_deletarConta");
const depositoBancario = require("../controller/POST_DepositoBancario");
const saqueBancario = require("../controller/POST_Sacar");
const saldoBancario = require("../controller/GET_saldo");
const transferenciaBancaria = require("../controller/POST_transferenciaBancaria");
const extratoBancario = require("../controller/GET_extrato");

const {
  validarSenha,
  verificarCamposObrigatoriosNoCadastroEAtualizacaoDeContas,
  validarNumeroDaContaDeParametro,
  validarDadosDoBodyDeposito,
  verficarDadosDeTransferencia,
  verificarParametrosNumeroDaContaESenha,
} = require("../middleware/middleware");

const rotas = express();

rotas.get("/contas", validarSenha, listarContasBancarias);

rotas.post(
  "/contas",
  verificarCamposObrigatoriosNoCadastroEAtualizacaoDeContas,
  criarContaBancaria
);

rotas.put(
  "/contas/:numeroConta/usuario",
  validarNumeroDaContaDeParametro,
  verificarCamposObrigatoriosNoCadastroEAtualizacaoDeContas,
  atualizarUsuarioDaContaBancaria
);

rotas.delete(
  "/contas/:numeroConta",
  validarNumeroDaContaDeParametro,
  excluirContaBancaria
);

rotas.post(
  "/transacoes/depositar",
  validarDadosDoBodyDeposito,
  depositoBancario
);

rotas.get(
  "/contas/saldo",
  verificarParametrosNumeroDaContaESenha,
  saldoBancario
);

rotas.post("/transacoes/sacar", validarDadosDoBodyDeposito, saqueBancario);

rotas.post(
  "/transacoes/transferir",
  verficarDadosDeTransferencia,
  transferenciaBancaria
);

rotas.get(
  "/contas/extrato",
  verificarParametrosNumeroDaContaESenha,
  extratoBancario
);

module.exports = rotas;
