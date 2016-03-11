/**
 * @module
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     All rights reserved
 */
'use strict';

var fs = require('fs');

function mergeValues(values, content) {
    for (var key in values) {
        content = content.replace('{{' + key + '}}', values[key]);
    }

    return content;
}

function view(templateName, values, res) {
    var fileContent = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});

    fileContent = mergeValues(values, fileContent);

    res.write(fileContent);
}

module.exports.view = view;