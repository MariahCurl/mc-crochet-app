var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 13)
    })
    .then (
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, 'Super secret',
                {expiresIn: 60*60*24}) //time could also be '1d' instead of 60*60*24
                user => [res.status(200).json(user)]
                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                })
               },
               createError = err => res.send(500, err)
    )
})

router.post('/login', function (req, res) {
    User.findOne({ where: { username: req.body.user.username } }).then(
      function (user) {
        if (user) {
          bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
              res.json({
                user: user,
                message: "successfully authenticated",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "Login failed" });
            }
          });
        } else {
          res.status(500).send({ error: "failed to authenticate" });
        }
      },
      function (err) {
        res.status(501).send({ error: "Login failed" });
      }
    );
  });

module.exports = router;