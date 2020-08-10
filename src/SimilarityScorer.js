const fs = require('fs');
const log = console.log;

class SimilarityScorer {
  constructor(primary, secondary) {
    this.primary = JSON.parse(fs.readFileSync(primary, 'utf8'));
    this.secondary = JSON.parse(fs.readFileSync(secondary, 'utf8'));
    this.similar = 0;
    this.total = 0;
  }

  process(a, b) {
    if (b) {
      if (typeof b === 'object') {
        if (Array.isArray(b)) {
          b.forEach((value, index) => this.process(value, a[index]));
        } else {
          this.totalize(JSON.stringify(a), JSON.stringify(b));
        }
      } else {
        this.totalize(a, b);
      }
    } else {
      this.total += 1;
    }
  }

  totalize(firstVal, secondVal) {
    if (firstVal === secondVal) this.similar += 1;
    this.total += 1;
  }

  score(a, b) {
    if (typeof a !== typeof b) {
      return 0;
    } else if (JSON.stringify(a) === JSON.stringify(b)) {
      return 1;
    } else {
      Object.keys(a).map((k) => this.process(a[k], b[k]));
    }
    return (this.similar / this.total).toFixed(2);
  }

  getResult() {
    return this.score(this.primary, this.secondary);
  }
}

module.exports = SimilarityScorer;
