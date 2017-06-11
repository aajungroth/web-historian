var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // console.log('paths.list', paths.list);
  fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    var found = false;

    for (var i = 0; i < sites.length; i++) {
      if (sites[i] === url) {
        found = true;
      }
    }
    callback(found);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      console.log('File may not exist:' + err);
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  console.log('exports.paths.archivedSites', exports.paths.archivedSites);
  fs.access(exports.paths.archivedSites + '/' + url, function(err) {
    var exists;
    if (err) {
      exists = false;
    } else {
      exists = true;
    }
    callback(exists);
  });
};

exports.downloadUrls = function(urls) {
};
