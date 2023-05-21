const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5443';

//const target = 'http://localhost:5443'

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/images",
      "/api/containers",
      "/api/stacks",
      "/api/stack",
      "/api/volumes",
      "/api/volume",
      "/api/networks",
      "/api/environments"

   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
