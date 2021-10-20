#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const prompt = require("prompt-sync")({ sigint: true });

// Utility functions
const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    (error) => {
      console.log(error);
    };
  }
}

async function hasYarn() {
  try {
    await execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

//If no target directory specified, Ask for one
var folderName;
if (process.argv.length < 3) {
  folderName = prompt("What name would you like to give your app? ");
  folderName = scrubFolderName(folderName);
  console.log(`Creating ${folderName}`);
} else {
  folderName = process.argv[2];
}

//Scrub the Folder name given by users to avoid special characters and spaces
function scrubFolderName(name) {
  name = name.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '');
  name = name.replace(/\s/g, '');
  name = name.substring(0,25);
  return name;
}

// Define constants
const ownPath = process.cwd();
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/hagopj13/node-express-boilerplate.git';

// Check if directory already exists
try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('Directory already exists. Please choose another name for the project.');
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function setup() {
  try {
    // Clone repo
    console.log(`Downloading files from repo ${repo}`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Cloned successfully.');
    console.log('');

    // Change directory
    process.chdir(appPath);

    // Install dependencies
    const useYarn = await hasYarn();
    console.log('Installing dependencies...');
    if (useYarn) {
      await runCmd('yarn install');
    } else {
      await runCmd('npm install');
    }
    console.log('Dependencies installed successfully.');
    console.log();

    // Copy envornment variables
    fs.copyFileSync(path.join(appPath, '.env.example'), path.join(appPath, '.env'));
    console.log('Environment files copied.');

    // Delete .git folder
    await runCmd('npx rimraf ./.git');

    // Remove extra files
    fs.unlinkSync(path.join(appPath, 'CHANGELOG.md'));
    fs.unlinkSync(path.join(appPath, 'CODE_OF_CONDUCT.md'));
    fs.unlinkSync(path.join(appPath, 'CONTRIBUTING.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'createNodejsApp.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));
    if (!useYarn) {
      fs.unlinkSync(path.join(appPath, 'yarn.lock'));
    }

    console.log('Installation is now complete!');
    console.log();

    console.log('We suggest that you start by typing:');
    console.log(`    cd ${folderName}`);
    console.log(useYarn ? '    yarn dev' : '    npm run dev');
    console.log();
    console.log('Enjoy your production-ready Node.js app, which already supports a large number of ready-made features!');
    console.log('Check README.md for more info.');
  } catch (error) {
    console.log(error);
  }
}

setup();
