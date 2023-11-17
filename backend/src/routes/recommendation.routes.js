const { authJwt } = require("../middleware");
const controller = require("../controllers/recommendation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/recommendations", controller.get);

  app.post(
    "/api/recommendations",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.insert
  );

  app.put(
    "/api/recommendations/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/recommendations/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
