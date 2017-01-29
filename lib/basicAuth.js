"use strict";

const basicAuth = require('basic-auth');

module.exports = function(userName, password) {
  return function(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== userName || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.send(401);
      return;
    }
    next();
  }
};