const { authJwt } = require("../middleware");
const controller = require("../controllers/music.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/musics", controller.get);

  app.post(
    "/api/musics",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.insert
  );

  app.put(
    "/api/musics/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/musics/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
