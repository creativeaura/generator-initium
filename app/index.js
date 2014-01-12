'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var InitiumGenerator = module.exports = function InitiumGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(InitiumGenerator, yeoman.generators.Base);

InitiumGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    // type: 'confirm',
    name: 'projectName',
    message: 'What do you want to call your project ?'
    // default: true
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

InitiumGenerator.prototype.app = function app() {
  this.mkdir('app');

  this.template('app/_index.html', 'app/index.html');
  this.template('app/404.html', 'app/404.html');
  this.template('app/crossdomain.xml', 'app/crossdomain.xml');
  this.template('app/favicon.ico', 'app/favicon.ico');
  this.template('app/humans.txt', 'app/humans.txt');
  this.template('app/robots.txt', 'app/robots.txt');

  this.directory('app/css', 'app/css');
  this.directory('app/fonts', 'app/fonts');
  this.directory('app/img', 'app/img');
  this.directory('app/js', 'app/js');
  this.directory('app/resources', 'app/resources');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

InitiumGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile', 'Gruntfile.js');
  this.copy('karma.conf', 'karma.conf.js');
};
