const bancodedados = require("../bancodedados");

function extratoBancario(req, res) {
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

  const depositos = bancodedados.depositos.filter(
    (deposito) => deposito.numero_conta === Number(numero_conta)
  );

  const saques = bancodedados.saques.filter(
    (saque) => saque.numero_conta === Number(numero_conta)
  );

  const transferenciasEnviadas = bancodedados.transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_origem === Number(numero_conta)
  );

  const transferenciasRecebidas = bancodedados.transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_destino === Number(numero_conta)
  );

  return res
    .status(200)
    .json({
      depositos,
      saques,
      transferenciasEnviadas,
      transferenciasRecebidas,
    });
}

module.exports = extratoBancario;
