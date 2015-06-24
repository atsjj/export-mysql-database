var c       = require('clor');
var command = require('commander');
var exec    = require('child_process').exec;
var package = require('./package.json');

var UI      = require('./lib/ui');

var ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout,
  writeLevel: 'INFO',
  ci: false
});

command
  .version(package['version'])
  .description(package['description'])
  .usage('[options] <file.gz>')
  .option('-h, --host <host>', 'MySQL Host')
  .option('-u, --user <user>', 'MySQL Database User')
  .option('-p, --pass <pass>', 'MySQL Database Password')
  .option('-d, --db <database>', 'MySQL Database')
  .action(ExportDatabase)
  .parse(process.argv);

function ExportDatabase(file, options) {
  ui.writeLine('export-mysql-database:', c.yellow(file));

  var mysqldump = exec(`mysqldump --verbose --quick --routines -h ${options.host} -u ${options.user} -p${options.pass} ${options.db} | gzip -9 > ${file}`);
  mysqldump.on('data', function(data) {
    ui.writeLine(c.green('exporting:', data));
  });
  mysqldump.on('close', function() {
    ui.writeLine(c.green('finished!'));
  });
}
