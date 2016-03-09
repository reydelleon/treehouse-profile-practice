/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
"use strict";

var fs = require("fs");

function view(templateName, values, res) {
    fs.readFile("./views/" + templateName + ".html", function (error, data) {
        if (error) {
            throw error;
        }

        res.write(data);
    })
}

module.exports.view = view;