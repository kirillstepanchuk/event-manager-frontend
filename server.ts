const express = require('express');
const enforce = require('express-sslify');
const path = require('path');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.join(__dirname, 'dist')));

// @ts-ignore
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8081);
