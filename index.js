#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const imageConverter = require('./src/imgconvert');

program
  .version(require('./package').version)
  .name('imgconvert')
  .usage('-i <input> -o <output> [-H | -B]')
  .option('-i, --input <input>', 'Input file')
  .option('-o, --output <output>', 'Output file')
  .option('-H, --hex', 'Convert the image to a .c file stored in hexadecimal format.')
  .option('-B, --binary', 'Convert images to .bin files stored in binary format.')
  .action((options) => {
    const { input, output, hex, binary } = options;

    if (!input || !output) {
      console.error(chalk.red('Please provide input and output files through the -i and -o options.'));
      return;
    }

    if (!isValidInputExtension(input)) {
      console.error(chalk.red('Invalid input file extension. Please provide files with valid extensions in [.png, .bmp, .jpeg]'));
      return;
    }

    if (!isValidOutputExtension(output, hex, binary)) {
      console.error(chalk.red('Invalid output file extension. Please provide files with valid extensions.'));
      return;
    }

    if (hex) {
      imageConverter.convertImageHex(input, output);
    } else if (binary) {
      imageConverter.convertImageBinary(input, output);
    } else {
      console.error(chalk.red('Invalid option. Please use -H or -B.'));
    }
  });

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ imgconvert -i input.png -o output.c -H');
  console.log('  $ imgconvert -i input.bmp -o output.bin -B');
});

program.parse(process.argv);

if (process.argv.length <= 2) {
  program.help();
}

function isValidInputExtension(filename) {
  const validExtensions = ['.png', '.bmp', '.jpeg'];
  const fileExtension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return validExtensions.includes(fileExtension);
}

function isValidOutputExtension(filename, hex, binary) {
  const fileExtension = filename.substring(filename.lastIndexOf('.')).toLowerCase();

  if (hex) {
    return fileExtension === '.c';
  }

  if (binary) {
    return fileExtension === '.bin';
  }

  return false;
}
