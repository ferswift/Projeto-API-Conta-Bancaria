const bancodedados = require("../bancodedados");

function transferenciaBancaria(req, res) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  const contaDestino = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta_destino)
  );
  const contaOrigem = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta_origem)
  );

  if (!contaDestino || !contaOrigem) {
    return res.status(404).json({
      mensagem: "Conta de destino ou conta de origem não foram encontrados.",
    });
  }

  if (contaOrigem.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: "Senha inválida" });
  }

  if (contaOrigem.saldo < valor) {
    return res.status(400).json({ mensagem: "Saldo insuficiente." });
  }

  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const comprovante = {
    data: new Date(),
    numero_conta_origem: Number(numero_conta_origem),
    numero_conta_destino: Number(numero_conta_destino),
    valor,
  };

  bancodedados.transferencias.push(comprovante);

  return res.status(204).send();
}

module.exports = transferenciaBancaria;
