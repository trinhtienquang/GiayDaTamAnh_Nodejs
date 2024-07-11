
const siteRouter = require('./siteRoute')

function route(app) {
  app.use('/', siteRouter);
}

module.exports = route;