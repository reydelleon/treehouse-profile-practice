/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
var profile = require("./profile"),
    renderer = require("./renderer");

/**
 * Handles HTTP route GET /
 *
 * @param req
 * @param res
 */
function home(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    renderer.view("partials/header", {}, res);
    res.end("Hello Worlds");
}

/**
 * Handles HTTP route GET /:username i.e /theusername
 *
 * @param req
 * @param res
 */
function user(req, res) {
    var username = req.url.replace("/", "");

    if (username.length > 0) {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        var userProfile = new Profile(username);

        res.end(username);
    }
}

module.exports.home = home;
module.exports.user = user;