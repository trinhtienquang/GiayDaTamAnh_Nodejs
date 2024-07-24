
const siteRouter = require('./siteRoute')
const categoryRoute = require('./categoryRoute')
const productDetailRoute = require('./productDetailRoute')
const authRoute = require('./authRoute')

function route(app) {
  app.use('/user',authRoute)
  app.use('/danh-muc', categoryRoute);
  app.use('/chi-tiet-san-pham', productDetailRoute);
  app.use('/', siteRouter);
}

module.exports = route;