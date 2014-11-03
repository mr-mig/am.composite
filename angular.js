'use strict';
var angular = require('angular-cjs');
var createState = require('am.state/angular');
var createComposite = require('./index')(createState);

// register composite using angular DI container
module.exports = function (definition) {
  var result = createComposite(definition);

  // try to get the module first
  try {
    angular.module(result.moduleName);
  } catch (e) {
    angular.module(result.moduleName, result.moduleDependencies);
  }

  return angular.module(result.moduleName)
    .directive(result.elementName, result.elementFactoryFn);
};
