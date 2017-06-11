var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers');
// var headers = require('http-helpers');
var fs = require('fs');
var url = require('url');

exports.handleRequest = function (req, res) {
  // console.log('req.url', req.url);
  // if req type is 'GET'
  var parsedUrl = url.parse(req.url);

  var pathName = parsedUrl.pathname;
  var fsArchive = archive.paths.archivedSites;
  if (req.url === '/' && req.method === 'GET') {
     // serve up static file (index.html or loading.html)
     // parse url of req object
    // var requestedurl = url.parse(req.url); // expects '/'
    pathName = pathName + 'public/index.html';
    fs.readFile(__dirname + pathName, function(err, data) {
      if (err) {
        res.statusCode = 404;
        res.writeHead(res.statusCode, serveAssets.headers);
        res.end();
      } else {
        // res.setHeader('Content-Type', 'text/plain');
        // res.statusCode = 200;
        res.writeHead(200);
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === 'GET') {
    // console.log('__dirname', __dirname);
    // console.log('pathName', pathName);
    fs.readFile(fsArchive + '/' + pathName, function(err, data) {
      if (err) {
        console.log('error in GET');
        res.statusCode = 404;
        res.writeHead(res.statusCode, serveAssets.headers);
        res.end();
      } else {
        // res.setHeader('Content-Type', 'text/plain');
        // res.statusCode = 200;
        // console.log('data', data);
        res.writeHead(200);
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === 'POST') {
    // check using isUrlInList if req.url is in sites.text
    archive.isURlInList(req.url, function(found) {
      // if not in sites.text
      if (!found) {
        // add to sites.text using addUrlToList
        archive.addUrlToList(req.url, function() {

        });
      // if in sites.text
      } else {
        // check if in sites directory using isUrlArchived
        archive.isUrlArchived(req.url, function(exists) {
          // if not
          if (!exists) {
            // serve loading.html
          }
          // if is archivedSites
            // parse out the url from file path in file system
            // serve file?
        });
      }
    });
  }

  // res.end(archive.paths.list); // creates path for file in file system
};
