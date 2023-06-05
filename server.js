const express = require('express');

const app = express();

app.get('/confirmacao/:idcliente', function (req, res) {
  res.sendFile(__dirname + '/index.html', req.hostname);
});

if (false) {
  const fs = require('fs');
  const path = require('path');
  const server = require('https').createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app,
  );
  server.listen(8443, () => {
    console.log(
      `Server Konsist confirmacao rodando producao com Https na porta ${8443}`,
    );
  });
} else {
  const server = require('http').createServer(app);
  server.listen(8443, () => {
    console.log(`ServerK rodando producao com Http na porta ${8443}`);
  });
  //app.listen(, () => {console.log(`Server Konsist confirmacao rodando na porta 80`)});
}
