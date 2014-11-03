'use strict';
var conv = require('am.convention');
module.exports = createCompositeWithState;

var definitionSchema = {
  name: 'element name',
  ngDeps: ['array', 'of', 'angular', 'module names'],
  replace: false,
  require: 'someComposite',
  state: {
    // element's state object
  },
  controller: function (some, injectable, services) {
  },
  postlink: function (state, el, scope, attrs) {
  }
};

function createCompositeWithState(stateCreationFunction) {
  return function createElement(definition) {

    var deps = definition.ngDeps || [];
    definition.postlink = definition.postlink || function () {
    };

    if (!definition.name) {
      throw new Error('You tried to create the composite without name specified!');
    }

    if (!definition.template){
      throw new Error('You tried to create the composite without template specified!');
    }

    var stateName = conv.names.state(definition.name);
    var moduleName = conv.names.ngModule(conv.structureComponents.composite, definition.name);

    var state = stateCreationFunction(
      conv.structureComponents.composite,
      definition, definition.state);
    var directive = makeDirectiveFactory(definition, stateName);

    return {
      moduleName: moduleName,
      elementFactoryFn: directive,
      elementName: definition.name,
      moduleDependencies: deps
    };
  };
}


// use angular directive syntax to define composite
function makeDirectiveFactory(definition, stateName) {
  function directiveFactory(CompositeState, Channels) {
    return {
      restrict: 'E',
      require: definition.require,
      replace: definition.replace,
      template: definition.template,
      controller: definition.controller,
      link: function (scope, el, attrs) {
        if (!scope.state) {
          scope.state = new CompositeState();
        }
        if (scope.channel) {
          Channels[scope.channel].listen(scope, scope.state);
        }

        definition.postlink(scope.state, el, scope, attrs);
      },
      scope: {
        state: '=',
        channel: '@'
      }
    };
  }

  directiveFactory.$inject = [stateName, 'Channels'];

  return directiveFactory;
}
