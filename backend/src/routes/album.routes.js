const { authJwt } = require("../middleware");
const controller = require("../controllers/album.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/albums", controller.get);

  app.post(
    "/api/albums",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.insert
  );

  app.put(
    "/api/albums/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/albums/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
