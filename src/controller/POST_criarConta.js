const bancodedados = require("../bancodedados");

let numero = 1;

function criarContaBancaria(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const validarDuplicidadeDoCPFeEmail = bancodedados.contas.find(
    (conta) => conta.usuario.cpf === cpf || conta.usuario.email === email
  );

  if (validarDuplicidadeDoCPFeEmail) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o cpf ou Email informado!" });
  }

  const conta = {
    numero: numero++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  bancodedados.contas.push(conta);
  return res.status(201).json();
}

module.exports = criarContaBancaria;
