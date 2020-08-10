const log = console.log;
const fs = require('fs');
const SimilarityScorer = require('./src/SimilarityScorer');

const primary = process.argv[2];
const secondary = process.argv[3];

if (!fs.existsSync(primary) || !fs.existsSync(secondary)) {
  return log('Invalid arguments.');
}

const check = new SimilarityScorer(primary, secondary);

log(`---------- Similarity Score ----------`);
log(`                 ${check.getResult()}`);
log(`--------------------------------------`);
