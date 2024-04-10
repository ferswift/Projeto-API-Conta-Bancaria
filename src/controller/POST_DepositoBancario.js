const bancodedados = require("../bancodedados");

function depositoBancario(req, res) {
  const { numero_conta, valor } = req.body;

  const verificarContaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );

  if (!verificarContaExistente) {
    return res.status(404).json({ mensagem: "Conta Bancária não encontrada." });
  }

  verificarContaExistente.saldo += Number(valor);

  const comprovante = {
    data: new Date(),
    numero_conta: Number(numero_conta),
    valor,
  };

  bancodedados.depositos.push(comprovante);

  return res.status(204).send();
}

module.exports = depositoBancario;
