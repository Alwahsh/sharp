// Original file here:
// https://github.com/langateam/sails-auth/blob/master/api/controllers/UserController.js
/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * @override
   */
  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  update: function (req, res, next) {
    sails.services.passport.protocols.local.update(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  confirm: function(req, res, next) {
    User.findOne({
      id: req.param('id')
    }).exec(function(err, user) {
      if (user.confirm(req.param('key'))) {
        res.ok(user);
      } else {
        res.redirect('/');
      }
    });
  },

  me: function (req, res, next) {
    if (req.user) {
      res.view({
        user: req.user
      });
    } else {
      res.redirect('/');
    }
  }
};
