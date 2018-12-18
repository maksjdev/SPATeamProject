require('module-alias/register');

const http = require('http');
const app = require('./app');
const chalk = require('chalk');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,() => {
  console.log(chalk.yellow(`Server running at http://localhost:${port}! My congratulations! Respect++`))
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
});
