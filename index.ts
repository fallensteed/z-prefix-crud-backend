// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
"use strict";
require = require("esm")(module /* , options */);
module.exports = require("./src/server.js");
