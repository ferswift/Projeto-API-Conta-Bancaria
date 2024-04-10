const bancodedados = require("../bancodedados");

function validarSenha(req, res, next) {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(400).json({
      mensagem: "A senha do banco é obrigatória !",
    });
  }

  if (senha_banco !== bancodedados.banco.senha) {
    return res.status(401).json({ mensagem: "Senha do Banco Inválida." });
  }

  next();
}

function verificarCamposObrigatoriosNoCadastroEAtualizacaoDeContas(
  req,
  res,
  next
) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (
    !nome?.trim() ||
    !cpf?.trim() ||
    !data_nascimento?.trim() ||
    !telefone?.trim() ||
    !email?.trim() ||
    !senha?.trim()
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }
  next();
}

function validarNumeroDaContaDeParametro(req, res, next) {
  const { numeroConta } = req.params;

  if (!Number(numeroConta) || Number(numeroConta) < 1) {
    res.status(400).json({ mensagem: "Número da conta Inválido." });
  }

  next();
}

function validarDadosDoBodyDeposito(req, res, next) {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }

  if (!Number(numero_conta)) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta deve ser um número válido." });
  }

  if (!Number(valor)) {
    return res.status(400).json({
      mensagem: "O valor a ser depositado deve ser um número válido.",
    });
  }

  if (valor < 1) {
    return res.status(400).json({
      mensagem: "O valor a ser depositado deve ser maior do que zero.",
    });
  }

  next();
}

function verificarParametrosNumeroDaContaESenha(req, res, next) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e a senha são obrigatórios!" });
  }

  if (!Number(numero_conta)) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta deve ser um número válido." });
  }

  next();
}

function verficarDadosDeTransferencia(req, res, next) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  if (!Number(numero_conta_destino) || !Number(numero_conta_origem)) {
    return res
      .status(400)
      .json({ mensagem: "O número da contas devem ser um número válido." });
  }

  if (!Number(valor)) {
    return res.status(400).json({
      mensagem: "O valor a ser depositado deve ser um número válido.",
    });
  }

  if (valor < 1) {
    return res.status(400).json({
      mensagem: "O valor a ser depositado deve ser maior do que zero.",
    });
  }

  next();
}

module.exports = {
  validarSenha,
  verificarCamposObrigatoriosNoCadastroEAtualizacaoDeContas,
  validarNumeroDaContaDeParametro,
  validarDadosDoBodyDeposito,
  verificarParametrosNumeroDaContaESenha,
  verficarDadosDeTransferencia,
};
