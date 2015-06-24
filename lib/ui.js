'use strict';

var EmberUI = require('ember-cli/lib/ui');
var EOL     = require('os').EOL;

class UI extends EmberUI {
  constructor(options) {
    super(options);
  }

  /**
    Unified mechanism to write a string to the console.
    Optionally include a writeLevel, this is used to decide if the specific
    logging mechanism should or should not be printed.
    @method write
    @param {String} data
    @param {Number} writeLevel
  */
  write(/* data, writeLevel */) {
    var args = Array.prototype.slice.call(arguments);
    var data;
    var writeLevel;

    switch(args.slice(-1).join('')) {
      case 'DEBUG':
      case 'ERROR':
      case 'INFO':
      case 'WARNING':
        data = args.slice(0, -1).join(' ');
        writeLevel = args.slice(-1).join('');
        break;
      default:
        data = args.join(' ');
        writeLevel = 'INFO';
    }

    if (this.writeLevelVisible(writeLevel)) {
      this.outputStream.write(data);
    }
  }

  /**
    Unified mechanism to write a string and new line to the console.
    Optionally include a writeLevel, this is used to decide if the specific

    logging mechanism should or should not be printed.
    @method writeLine
    @param {String} data
    @param {Number} writeLevel
  */
  writeLine(/* data, writeLevel */) {
    this.write.apply(this, arguments);
    this.write(EOL);
  }
}

module.exports = UI;
