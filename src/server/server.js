const http = require('http');
const chalk = require('chalk');
// npm-windows-upgrade -p -v latest

const hostname = 'back.com';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n')
});

server.listen(port, hostname, () => {
  console.log(chalk.yellow(`Server running at http://${hostname}:${port}/`))
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
});

//process.kill(process.pid, 'SIGTERM');
