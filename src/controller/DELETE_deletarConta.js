const bancodedados = require("../bancodedados");

function excluirContaBancaria(req, res) {
  const { numeroConta } = req.params;

  const verificarContaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(numeroConta)
  );

  if (!verificarContaExistente) {
    return res.status(404).json({ mensagem: "Conta Bancária não encontrada." });
  }

  if (verificarContaExistente.saldo !== 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  const contaIndex = bancodedados.contas.findIndex(
    (conta) => conta.numero === Number(numeroConta)
  );

  bancodedados.contas.splice(contaIndex, 1);
  return res.status(204).json();
}

module.exports = excluirContaBancaria;
