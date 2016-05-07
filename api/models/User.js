// Original file here:
// https://github.com/langateam/sails-auth/blob/master/api/models/User.js
var _ = require('lodash');
var crypto = require('crypto');
var randomstring = require("randomstring");

/** @module User */
module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      index: true,
      notNull: true
    },
    email: {
      type: 'email',
      unique: true,
      index: true
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    confirmed_at: {
      type: 'datetime'
    },
    confirmation_token: {
      type: 'string'
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      return user;
    },

    /**
     * Require confirmation of email
     */
    require_confirmation: function() {
     this.confirmation_token = randomstring.generate(); // Should better save a hashed version.
     this.confirmed_at = null;
     this.send_confirmation_email();
     this.save(function() {});
   },

   send_confirmation_email: function() {
     sails.hooks.email.send(
       "confirmationEmail", {
         recipientName: this.first_name,
         id: this.id,
         key: this.confirmation_token
       }, {
         to: this.email,
         from: "noreply@sharp_example.com",
         subject: "Please confirm your email"
       },
       function() {}
     );
   },

   confirm: function(key) {
     if (!this.confirmed_at && key == this.confirmation_token) {
       this.confirmed_at = Date();
       this.save(function() {});
       return true;
     } else {
       return false;
     }
   }

  },

  afterCreate: function (attr, next) {
    User.findOne({
      id: attr.id
    }).exec(function(err, user) {
      user.require_confirmation();
    });
    next();
  },

  /**
   * Register a new User with a passport
   */
  register: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        resolve(created);
      });
    });
  }
};
