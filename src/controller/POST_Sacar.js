const bancodedados = require("../bancodedados");

function saqueBancario(req, res) {
  const { numero_conta, valor, senha } = req.body;

  if (!senha) {
    return res.status(400).json({ mensagem: "Senha bancária obrigatória" });
  }
  const verificarContaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );

  if (!verificarContaExistente) {
    return res.status(404).json({ mensagem: "Conta Bancária não encontrada." });
  }

  if (verificarContaExistente.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "Senha inválida." });
  }

  if (verificarContaExistente.saldo < Number(valor)) {
    return res.status(400).json({ mensagem: "Saldo Insuficiente." });
  }

  verificarContaExistente.saldo -= Number(valor);

  const comprovante = {
    data: new Date(),
    numero_conta: Number(numero_conta),
    valor,
  };

  bancodedados.saques.push(comprovante);

  return res.status(204).send();
}

module.exports = saqueBancario;
