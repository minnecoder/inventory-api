import App from "./index"
import CustomerRoute from "./routes/customer.route"
import IndexRoute from './routes/index.route'
import OrderRoute from "./routes/order.route"
import OrderProductRoute from "./routes/orderProduct.route"
import ProductRoute from "./routes/product.route"
import ProductReviewRoute from "./routes/productReview.route"
import ProductSupplierRoute from "./routes/productSupplier.route"
import SessionRoute from "./routes/session.route"
import SupplierRoute from "./routes/supplier.route"
import UserRoute from "./routes/user.route"

const app = new App([
    new IndexRoute(),
    new CustomerRoute(),
    new OrderRoute(),
    new OrderProductRoute(),
    new ProductRoute(),
    new ProductReviewRoute(),
    new ProductSupplierRoute(),
    new SessionRoute(),
    new SupplierRoute(),
    new UserRoute()
])

app.listen()