let fc = require('fast-check');

fc.configureGlobal({
  numRuns: parseInt(process.env.FAST_CHECK_RUNS || 10),
});
