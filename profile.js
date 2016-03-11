/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
'use strict';

var http         = require('http'),
    https        = require('https'),
    request,
    profile;

const EventEmitter = require('events').EventEmitter,
      util         = require('util');

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {
    this.username = username;

    EventEmitter.call(this);
    var profileEmitter = this;

    request = https.get('https://teamtreehouse.com/' + username + '.json', function (res) {
        var responseBody = '';

        if (res.statusCode !== 200) {
            request.abort();

            profileEmitter.emit('error', new Error('There was a problem while trying to get the profile. [' + http.STATUS_CODES[res.statusCode] + ']'));
        }

        res.on('data', function (chunk) {
            responseBody += chunk;
            profileEmitter.emit('data', chunk);
        });

        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    profile = JSON.parse(responseBody);

                    profileEmitter.emit('end', profile);
                } catch (e) {
                    profileEmitter.emit('error', e)
                }
            }
        }).on('error', function (error) {
            profileEmitter.emit('error', error)
        })
    });
}

util.inherits(Profile, EventEmitter);

module.exports = Profile;