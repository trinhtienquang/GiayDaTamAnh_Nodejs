
const siteRouter = require('./siteRoute')
const categoryRoute = require('./categoryRoute')
const productDetailRoute = require('./productDetailRoute')

function route(app) {
  app.use('/', siteRouter);
  app.use('/danh-muc', categoryRoute);
  app.use('/chi-tiet-san-pham', productDetailRoute);
}

module.exports = route;