
const siteRouter = require('./siteRoute')
const categoryRoute = require('./categoryRoute')
const productDetailRoute = require('./productDetailRoute')
const authRoute = require('./authRoute')
const cartRoute = require('./cartRoute')
const checkoutRoute = require('./checkoutRoute')
function route(app) {
  app.use('/thanh-toan',checkoutRoute)
  app.use('/api', cartRoute)
  app.use('/user',authRoute)
  app.use('/danh-muc', categoryRoute);
  app.use('/chi-tiet-san-pham', productDetailRoute);
  app.use('/', siteRouter);
}

module.exports = route;