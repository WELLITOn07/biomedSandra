const express = require('express');
const path = require('path');
const app = express();

// Serve o conteúdo da pasta 'dist/biomed-sandra/browser'
app.use(express.static(path.join(__dirname, 'dist/biomed-sandra/browser')));

// Redireciona todas as rotas para o index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/biomed-sandra/browser/index.html'));
});

// Configura a porta do servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
