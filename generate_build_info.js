const { execSync } = require('child_process');
const fs = require('fs');
const config = require('./src/config.json');

config.build_date = new Date().toUTCString();
config.commit_hash = execSync('git rev-parse HEAD').toString().trim();

fs.writeFileSync('./src/config.json', JSON.stringify(config, null, '	'));