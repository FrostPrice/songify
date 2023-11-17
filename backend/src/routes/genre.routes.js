const { authJwt } = require("../middleware");
const controller = require("../controllers/genre.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/genres", controller.get);

  app.post(
    "/api/genres",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.insert
  );

  app.put(
    "/api/genres/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/genres/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
