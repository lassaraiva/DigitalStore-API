const serverCheck = (req, res) => {
  res.status(200).send('O servidor está funcionando!');
};

module.exports = serverCheck;