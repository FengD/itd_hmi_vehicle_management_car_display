'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _dvaAst = require('dva-ast');

var _simpleUppercamelcase = require('simple-uppercamelcase');

var _simpleUppercamelcase2 = _interopRequireDefault(_simpleUppercamelcase);

var _path = require('path');

var _fs = require('fs');

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _leftPad = require('left-pad');

var _leftPad2 = _interopRequireDefault(_leftPad);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function info(type, message) {
  console.log(_chalk2.default.green.bold((0, _leftPad2.default)(type, 12)) + '  ' + message);
}

function error(message) {
  console.error(_chalk2.default.red(message));
}

function getBabelRc(cwd) {
  var rcPath = (0, _path.join)(cwd, '.dvarc');
  if (_pathExists2.default.sync(rcPath)) {
    return JSON.parse((0, _fs.readFileSync)(rcPath, 'utf-8'));
  } else {
    return {};
  }
}

function generate(program, _ref) {
  var cwd = _ref.cwd;

  var defaultBase = 'src';
  var rc = getBabelRc(cwd);
  var base = program.base || rc.base || defaultBase;
  var defaultEntry = base + '/index.js';
  var defaultRouter = base + '/router.js';

  var _program$args = (0, _slicedToArray3.default)(program.args, 2),
      type = _program$args[0],
      name = _program$args[1];

  try {
    switch (type) {
      case 'model':
        (function () {
          var modelPath = './models/' + name;
          var filePath = base + '/models/' + name + '.js';
          var entry = program.entry || defaultEntry;
          info('create', 'model ' + name);
          info('register', 'to entry ' + entry);
          (0, _dvaAst.api)('models.create', {
            namespace: name,
            sourcePath: cwd,
            filePath: filePath,
            entry: entry,
            modelPath: modelPath
          });
        })();
        break;
      case 'route':
        (function () {
          var componentName = (0, _simpleUppercamelcase2.default)(name);
          var componentPath = base + '/routes/' + componentName + '.js';
          var componentCSSPath = base + '/routes/' + componentName + '.css';
          var withCSS = program.css ? ', ' + componentCSSPath : '';
          info('create', 'routeComponent ' + componentPath + withCSS);
          (0, _dvaAst.api)('routeComponents.create', {
            sourcePath: cwd,
            filePath: componentPath,
            componentName: componentName,
            css: program.css
          });
          info('create', 'route ' + name + ' with ' + componentPath);
          (0, _dvaAst.api)('router.createRoute', {
            filePath: program.router || defaultRouter,
            sourcePath: cwd,
            path: '/' + name,
            component: {
              componentName: componentName,
              filePath: componentPath
            }
          });
        })();
        break;
      case 'component':
        (function () {
          var fileName = (0, _path.basename)(name);
          var fileDir = (0, _path.dirname)(name);
          var componentName = (0, _simpleUppercamelcase2.default)(fileName);
          var filePath = (0, _path.join)(base + '/components', fileDir, componentName + '.js');
          var componentCSSPath = (0, _path.join)(base + '/components', fileDir, componentName + '.css');
          var withCSS = program.css ? ', ' + componentCSSPath : '';
          info('create', 'component ' + filePath + withCSS);
          (0, _dvaAst.api)('components.create', {
            sourcePath: cwd,
            filePath: filePath,
            componentName: componentName,
            css: program.css
          });
        })();
        break;
      default:
        error('ERROR: uncaught type ' + type);
        break;
    }
  } catch (e) {
    error(e.stack);
  }
}

exports.default = generate;
module.exports = exports['default'];