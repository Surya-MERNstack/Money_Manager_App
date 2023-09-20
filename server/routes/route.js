const routes = require("express").Router();
const controller = require("../controller/controller");

routes
  .route("/api/categories")
  .post(controller.create_Categories)
  .get(controller.get_Categories);

routes
  .route("/api/transaction")
  .post(controller.create_Transaction)
  .get(controller.get_Transaction);

routes.route("/api/transaction/:_id").delete(controller.delete_Transaction);

routes.route("/api/labels").get(controller.get_Labels);

routes.route("/api/register").post(controller.Register);

routes.route("/api/login").post(controller.Login);

module.exports = routes;
