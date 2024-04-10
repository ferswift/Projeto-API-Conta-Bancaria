const bancodedados = require("../bancodedados");

function atualizarUsuarioDaContaBancaria(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  const validarDuplicidadeDoCPFeEmail = bancodedados.contas.find(
    (conta) => conta.usuario.cpf === cpf || conta.usuario.email === email
  );

  if (
    validarDuplicidadeDoCPFeEmail &&
    validarDuplicidadeDoCPFeEmail.numero !== Number(numeroConta)
  ) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o cpf ou Email informado!" });
  }

  const validarContaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(numeroConta)
  );

  if (!validarContaExistente) {
    return res.status(404).json({ mensagem: "Conta Bancária não encontrada." });
  }

  const conta = {
    numero: Number(numeroConta),
    saldo: validarContaExistente.saldo,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  const contaIndex = bancodedados.contas.findIndex(
    (conta) => conta.numero === Number(numeroConta)
  );

  bancodedados.contas.splice(contaIndex, 1, conta);
  return res.status(204).json();
}

module.exports = atualizarUsuarioDaContaBancaria;
