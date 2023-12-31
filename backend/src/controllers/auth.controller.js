const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// * SQL Script: INSERT
// INSERT INTO users (username, age, musical_preference, email, password) VALUES ('username_value', age_value, 'musical_preference_value', 'email_value', 'hashed_password_value');
// INSERT INTO roles (nam VALUES ('role1'), ('role2'), ...;
// UPDATE users SET role_id = 1 WHERE username = 'username_value' AND email = 'email_value';
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    age: req.body.age,
    musical_preference: req.body.musical_preference,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setPermissoes(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setPermissoes([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// * SQL Script: SELECT
// SELECT "Users"."id", "Users"."username", "Users"."age", "Users"."musical_preference", "Users"."email", "Users"."password", "Users"."createdAt", "Users"."updatedAt", "Permissoes"."id" AS "Permissoes.id", "Permissoes"."name" AS "Permissoes.name", "Permissoes"."createdAt" AS "Permissoes.createdAt", "Permissoes"."updatedAt" AS "Permissoes.updatedAt", "Permissoes->UserPermissoes"."UserId" AS "Permissoes.UserPermissoes.UserId", "Permissoes->UserPermissoes"."PermissaoId" AS "Permissoes.UserPermissoes.PermissaoId" FROM "Users" AS "Users" LEFT OUTER JOIN ("user_permissoes" AS "Permissoes->UserPermissoes" INNER JOIN "Permissoes" AS "Permissoes" ON "Permissoes->UserPermissoes"."PermissaoId" = "Permissoes"."id") ON "Users"."id" = "Permissoes->UserPermissoes"."UserId";
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getPermissoes().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
