/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
var writeFile = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
  .then(function (user) {return getGitHubProfileAsync(user)})
  .then(function (body) {return writeFile(writeFilePath, JSON.stringify(body))})
  .catch(function (err) {console.log(err)});

  // 1) pluckFirstLineFromFileAsync from promiseConstructor file. 
    //input is a filepath
    //returns first line of the file which is the username
  // 2) getGitHubProfileAsync from promisification file
    //input is a user
    //returns body
  // 3) write body to the file at writeFilePath
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
