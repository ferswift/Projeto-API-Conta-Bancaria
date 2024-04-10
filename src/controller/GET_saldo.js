const bancodedados = require("../bancodedados");

function saldoBancario(req, res) {
  const { numero_conta, senha } = req.query;

  const verificarContaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );

  if (!verificarContaExistente) {
    return res.status(404).json({ mensagem: "Conta Bancária não encontrada." });
  }

  if (verificarContaExistente.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "Senha inválida." });
  }

  return res.status(200).json({ saldo: verificarContaExistente.saldo });
}

module.exports = saldoBancario;
