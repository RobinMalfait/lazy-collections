let fc = require('fast-check')

fc.configureGlobal({
  numRuns: Number(process.env.FAST_CHECK_RUNS),
})
