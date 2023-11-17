const { authJwt } = require("../middleware");
const controller = require("../controllers/artist.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/artists", controller.get);

  app.post(
    "/api/artists",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.insert
  );

  app.put(
    "/api/artists/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/artists/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
