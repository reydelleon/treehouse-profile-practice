/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
"use strict";

var http         = require("http"),
    https        = require("https"),
    eventEmmiter = require("events").EventEmmiter,
    util         = require("util");

function Profile(username) {
    this.username = username;

    var rawJSONData,
        request,
        responseBody = "";

    request = http.get("https://teamtreehouse.com/reydelleonmachado", function (res) {
        res.on("data", function (chunk) {
            responseBody += chunk;
        });

        res.on("end", function () {
            try {
                rawJSONData = JSON.parse(responseBody);

                console.log(rawJSONData.name)
            } catch (e) {
                console.error(e.message);
            }
        })
    });
}

module.exports.Profile = Profile;