'use strict';

/* global exports, require, dump */

var r = require('r-wrapper');
var utils = require('utils');
var sh = new utils.Commander('sh');

exports.execute = function(options) {
  sh.initPath(utils.getEnvPath());
  sh.run(['-c', 'cd ' + options.APP_DIR + ' && bower install']);
  var stageAppDir = utils.getFile(options.STAGE_APP_DIR);
  var configFile = utils.getFile(options.APP_DIR, 'build',
    'require_config.jslike');

  utils.ensureFolderExists(stageAppDir);
  var requirejs = r.get(options.GAIA_DIR);
  requirejs.optimize([configFile.path], function() {
    dump('require.js optimize ok\n');
  }, function(err) {
    dump('require.js optmize failed:\n');
    dump(err + '\n');
  });
};
