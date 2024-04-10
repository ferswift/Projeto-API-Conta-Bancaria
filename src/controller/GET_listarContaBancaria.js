const bancodedados = require("../bancodedados");

function listarContasBancarias(req, res) {
  return res.json(bancodedados.contas);
}

module.exports = listarContasBancarias;
