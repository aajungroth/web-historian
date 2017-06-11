var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

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
  // console.log('exports.paths.archivedSites', exports.paths.archivedSites);
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
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });  

  // // iterate over each url in urls
  //   // check if isUrlArchived is falsy
  // urls.forEach(function(url, index) {
  //   console.log('urls[index]', urls[index]);
  //   exports.isUrlArchived(urls[index], function(exists) {
  //     // console.log('exports.isUrlArchived');
  //     if (!exists) {
  //       // make GET request for that url
  //       // console.log('if (!exists)');
  //       console.log('index', index);
  //       console.log('urls[index]', urls[index]);
  //       request('https://' + urls[index], function(err, response) {
  //         if (err) {
  //           console.log('Line 90 Err: ', err);
  //         } else {
  //           console.log('data event');
  //           var data = '';
  //           response.on('data', function(chunk) {
  //             data += chunk;
  //             console.log('chunk', chunk);
  //           });
  //           response.on('end', function() {
  //             console.log('end');
  //             fs.write(exports.paths.archivedSites + '/' + urls[index], data, function(err) {
  //               if (err) {
  //                 console.log('Line 100 Error: ', err);
  //               }
  //             });
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

      // listen for a data event (concatenate the chunks)
      // fs.write to create file in exports.paths.archivedSites


};
