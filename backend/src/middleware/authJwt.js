const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(403).send({ message: "User not found" });

    user.getPermissoes().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isArtist = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(403).send({ message: "User not found" });

    user.getPermissoes().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "artist") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Artist Role!",
      });
    });
  });
};

isArtistOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (!user) return res.status(403).send({ message: "User not found" });

    user.getPermissoes().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "artist") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Artist or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isArtist: isArtist,
  isArtistOrAdmin: isArtistOrAdmin,
};
module.exports = authJwt;
