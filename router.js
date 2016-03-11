/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
var Profile     = require('./profile'),
    renderer    = require('./renderer'),
    queryString = require('querystring');

/**
 * Handles HTTP route GET /
 *
 * @param req
 * @param res
 */
function home(req, res) {
    if (req.method.toLowerCase() === 'get') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        renderer.view('partials/header', {}, res);
        renderer.view('partials/search', {}, res);
        renderer.view('partials/footer', {}, res);
        res.end();
    }

    if (req.method.toLowerCase() === 'post') {
        req.on('data', function (postData) {
            var query = queryString.parse(postData.toString());

            res.writeHead(303, { location: '/' + query.username });
            res.end();
        });
    }
}

/**
 * Handles HTTP route GET /:username i.e /reydelleonmachado
 *
 * @param req
 * @param res
 */
function user(req, res) {
    var username = req.url.replace('/', '');

    if (username.length > 0 && username !== 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        renderer.view('partials/header', {}, res);

        var userProfile = new Profile(username);

        userProfile.on('end', function (profileJSON) {
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };

            renderer.view('profile', values, res);
            renderer.view('partials/footer', {}, res);
            res.end();
        });

        //on 'error'
        userProfile.on('error', function (error) {
            renderer.view('error', { errorMessage: error.message }, res);
            renderer.view('partials/search', {}, res);
            renderer.view('partials/footer', {}, res);
            res.end();
        });
    } else {
    }
}

module.exports.home = home;
module.exports.user = user;